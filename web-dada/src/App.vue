<script setup>
</script>

<template>
  <!-- <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p> -->
  <nav class="flex gap-2 shadow-lg">
    <RouterLink to="/" class="text-white hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-indigo-500': $route.path === '/' }">首页</RouterLink>
    <RouterLink to="/matting" class="text-white hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-indigo-500': $route.path === '/matting' }">抠图</RouterLink>
    <RouterLink to="/virtual" class="text-white hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-indigo-500': $route.path === '/virtual' }">换装</RouterLink>
    <RouterLink to="/clothes" class="text-white hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-indigo-500': $route.path === '/clothes' }">我的服装</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
