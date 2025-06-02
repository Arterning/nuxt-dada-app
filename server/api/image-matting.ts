import axios from 'axios';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, readFile } from 'fs/promises';

// 请替换为你自己的 remove.bg API 密钥
const REMOVE_BG_API_KEY = 'your_api_key';

export default defineEventHandler(async (event) => {
    try {
        // 读取表单数据
        const parts = await readMultipartFormData(event);
        if (!parts) {
            return { error: '未收到表单数据' };
        }

        let imageFile: any = null;
        // 查找上传的图片文件
        for (const part of parts) {
            if (part.name === 'image') {
                imageFile = part;
                break;
            }
        }

        if (!imageFile) {
            return { error: '缺少图片文件' };
        }

        // 保存临时文件
        const imagePath = join(tmpdir(), `uploaded_${Date.now()}.${imageFile.filename?.split('.').pop()}`);
        await writeFile(imagePath, imageFile.data);

        // 调用 remove.bg API 进行抠图
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', {
            image_file: await readFile(imagePath),
            size: 'auto'
        }, {
            headers: {
                'X-Api-Key': REMOVE_BG_API_KEY,
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'arraybuffer'
        });

        // 返回抠图后的图片
        event.node.res.setHeader('Content-Type', 'image/png');
        event.node.res.end(response.data);

    } catch (error) {
        console.error('处理图片时出错:', error);
        return { error: '处理图片时出错，请稍后重试' };
    }
});