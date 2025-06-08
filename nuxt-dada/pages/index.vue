<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-20">
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">AI 智能换装与抠图</h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-8">革命性的AI技术，为您打造完美视觉体验</p>
        <div class="flex justify-center gap-6">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            开始使用
          </button>
          <button class="border-2 border-blue-600 text-blue-400 hover:bg-blue-600/10 font-bold py-3 px-8 rounded-full transition-all duration-300">
            了解更多
          </button>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-2 gap-12 mt-20">
        <!-- AI 抠图 -->
        <div class="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer" @click="navigateTo('/image-matting')">
          <div class="h-16 w-16 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-4">AI 智能抠图</h3>
          <p class="text-gray-400">先进的AI算法，一键实现精准抠图。无论是复杂背景还是细节处理，都能完美应对，让您的图片处理更加高效。</p>
        </div>

        <!-- AI 换装 -->
        <div class="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer" @click="navigateTo('/virtual-try-on')">
          <div class="h-16 w-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-4">AI 智能换装</h3>
          <p class="text-gray-400">突破性的AI换装技术，让您轻松尝试不同服装搭配。智能算法确保换装效果自然逼真，为您的造型提供无限可能。</p>
        </div>
      </div>
    </div>
  </div>
</template>
  