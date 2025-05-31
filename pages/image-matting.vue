<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">AI 智能抠图</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 左侧图片区域 -->
        <div class="bg-gray-800 rounded-lg p-4 min-h-[500px] flex items-center justify-center">
          <div v-if="!selectedImage" class="text-center">
            <label class="cursor-pointer block">
              <input 
                type="file" 
                accept="image/*" 
                class="hidden" 
                @change="handleImageSelect"
              >
              <div class="border-2 border-dashed border-blue-500 rounded-lg p-8 hover:border-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-gray-400">点击或拖拽图片到此处上传</p>
              </div>
            </label>
          </div>
          <img 
            v-else 
            :src="selectedImage" 
            class="max-w-full max-h-[500px] object-contain" 
            alt="Selected image"
          >
        </div>

        <!-- 右侧操作区域 -->
        <div class="flex flex-col gap-6">
          <button 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            :disabled="!selectedImage"
            @click="handleMatting"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            一键抠图
          </button>

          <button 
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            :disabled="!selectedImage"
            @click="handleAddBackground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            添加背景
          </button>

          <button 
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            :disabled="!selectedImage"
            @click="handleDownload"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            下载图片
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedImage = ref(null)

const handleImageSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleMatting = () => {
  // TODO: 实现抠图逻辑
  console.log('抠图处理')
}

const handleAddBackground = () => {
  // TODO: 实现添加背景逻辑
  console.log('添加背景')
}

const handleDownload = () => {
  // TODO: 实现下载逻辑
  console.log('下载图片')
}
</script>