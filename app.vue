<template>
  <div>
    <!-- 导航栏 -->
    <nav class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg">
      <ul class="flex gap-4">
        <li>
          <NuxtLink 
            to="/" 
            class="text-orange-500 hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-white text-indigo-500': $route.path === '/' }"
          >
            首页
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/image-matting" 
            class="text-orange-500 hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-white text-indigo-500': $route.path === '/image-matting' }"
          >
            抠图
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/virtual-try-on" 
            class="text-orange-500 hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-white text-indigo-500': $route.path === '/virtual-try-on' }"
          >
            换装
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <NuxtPage />
  </div>
</template>

<style scoped>
/* 这里可以添加全局样式，如果不需要 scoped 可以移除 */
</style>
