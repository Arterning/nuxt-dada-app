<script setup>
</script>

<template>
  <!-- <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p> -->
  <nav class="flex gap-2">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/matting">抠图</RouterLink>
    <RouterLink to="/virtual">换装</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
