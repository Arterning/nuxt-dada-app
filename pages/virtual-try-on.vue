<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">AI 智能换装</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- 左侧自拍上传区域 -->
        <div class="bg-gray-800 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
          <div v-if="!selfieImage" class="text-center">
            <label class="cursor-pointer block">
              <input 
                type="file" 
                accept="image/*" 
                class="hidden" 
                @change="handleSelfieSelect"
              >
              <div class="border-2 border-dashed border-purple-500 rounded-lg p-8 hover:border-purple-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p class="text-gray-400">上传自拍照片</p>
              </div>
            </label>
          </div>
          <img 
            v-else 
            :src="selfieImage" 
            class="max-w-full max-h-[400px] object-contain" 
            alt="Selfie image"
          >
        </div>

        <!-- 右侧服装上传区域 -->
        <div class="bg-gray-800 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
          <div v-if="!clothingImage" class="text-center">
            <label class="cursor-pointer block">
              <input 
                type="file" 
                accept="image/*" 
                class="hidden" 
                @change="handleClothingSelect"
              >
              <div class="border-2 border-dashed border-pink-500 rounded-lg p-8 hover:border-pink-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-pink-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p class="text-gray-400">上传服装照片</p>
              </div>
            </label>
          </div>
          <img 
            v-else 
            :src="clothingImage" 
            class="max-w-full max-h-[400px] object-contain" 
            alt="Clothing image"
          >
        </div>
      </div>

      <!-- 底部按钮区域 -->
      <div class="flex justify-center gap-6">
        <button 
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!selfieImage || !clothingImage"
          @click="handleTryOn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          生成换装效果
        </button>

        <button 
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!resultImage"
          @click="handleDownload"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          下载图片
        </button>
      </div>

      <!-- 结果展示区域 -->
      <div v-if="resultImage" class="mt-8">
        <h2 class="text-2xl font-bold mb-4">换装效果</h2>
        <div class="bg-gray-800 rounded-lg p-4 flex items-center justify-center">
          <img 
            :src="resultImage" 
            class="max-w-full max-h-[600px] object-contain" 
            alt="Result image"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selfieImage = ref(null)
const clothingImage = ref(null)
const resultImage = ref(null)

const handleSelfieSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      selfieImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleClothingSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      clothingImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleTryOn = async () => {
  try {
    const formData = new FormData()
    // 从 data URL 转换为 Blob 对象
    const selfieBlob = await (await fetch(selfieImage.value)).blob()
    const clothingBlob = await (await fetch(clothingImage.value)).blob()

    formData.append('selfie', selfieBlob, 'selfie.jpg')
    formData.append('clothing', clothingBlob, 'clothing.jpg')

    const { data, error } = await useFetch('/api/virtual', {
      method: 'POST',
      body: formData,
      responseType: 'blob'
    })

    if (error.value) {
      console.error('调用 API 出错:', error.value)
      return
    }

    const blob = data.value
    const url = URL.createObjectURL(blob)
    resultImage.value = url
  } catch (err) {
    console.error('处理请求时出错:', err)
  }
}

const handleDownload = () => {
  // TODO: 实现下载逻辑
  console.log('下载图片')
}
</script>