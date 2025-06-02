import { defineEventHandler, readMultipartFormData } from 'h3';
import sharp from 'sharp';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile } from 'fs/promises';

export default defineEventHandler(async (event) => {
    try {
        // 读取表单数据
        const parts = await readMultipartFormData(event);
        if (!parts) {
            return { error: '未收到表单数据' };
        }

        let selfieFile: any = null;
        let clothingFile: any = null;

        // 查找人物自拍和衣服图片文件
        for (const part of parts) {
            if (part.name === 'selfie') {
                selfieFile = part;
            } else if (part.name === 'clothing') {
                clothingFile = part;
            }
        }

        if (!selfieFile || !clothingFile) {
            return { error: '缺少必要的图片文件' };
        }

        // 保存临时文件
        const selfiePath = join(tmpdir(), `selfie_${Date.now()}.${selfieFile.filename?.split('.').pop()}`);
        const clothingPath = join(tmpdir(), `clothing_${Date.now()}.${clothingFile.filename?.split('.').pop()}`);

        await writeFile(selfiePath, selfieFile.data);
        await writeFile(clothingPath, clothingFile.data);

        // 获取自拍图片的尺寸
        const selfieMetadata = await sharp(selfiePath).metadata();
        const selfieWidth = selfieMetadata.width || 0;
        const selfieHeight = selfieMetadata.height || 0;

        // 调整衣服图片的尺寸
        const resizedClothingBuffer = await sharp(clothingPath)
           .resize({
                width: selfieWidth,
                height: selfieHeight,
                fit: 'inside' // 确保衣服图片适应自拍图片的尺寸
            })
           .toBuffer();

        // 使用 sharp 处理图片
        const compositeImage = await sharp(selfiePath)
           .composite([{
                input: resizedClothingBuffer,
                // 这里需要根据实际情况调整衣服的位置和大小
                top: 0,
                left: 0
            }])
           .toBuffer();

        // 返回合成后的图片
        event.node.res.setHeader('Content-Type', 'image/png');
        event.node.res.end(compositeImage);

    } catch (error) {
        console.error('处理图片时出错:', error);
        return { error: '处理图片时出错，请稍后重试' };
    }
});