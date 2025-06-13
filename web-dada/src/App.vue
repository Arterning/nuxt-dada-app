<script setup>
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'

</script>

<template>
  <!-- <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p> -->
  <nav class="flex gap-2 shadow-lg p-2">
    <RouterLink to="/" class="text-white hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-white text-xl font-bold': $route.path === '/' }">首页</RouterLink>
    <RouterLink to="/matting" class="text-white hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-white text-xl font-bold': $route.path === '/matting' }">抠图</RouterLink>
    <RouterLink to="/virtual" class="text-white hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-white text-xl font-bold': $route.path === '/virtual' }">换装</RouterLink>
    <RouterLink to="/clothes" class="text-white hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300"
            :class="{ 'bg-white text-xl font-bold': $route.path === '/clothes' }">我的服装</RouterLink>
  
            <div class="ml-auto">
                <SignedOut>
                  <SignInButton class="p-2 cursor-pointer rounded-md">
                     <button>注册</button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
            </div>
      
    </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
