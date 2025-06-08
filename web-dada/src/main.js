import { createApp } from 'vue'
import { createWebHistory , createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'


import HomeView from './pages/index.vue'
import MattingView from './pages/image-matting.vue'
import VirtualTryOn from './pages/virtual-try-on.vue'
import ClothesList from './pages/clothe-list.vue'

import { clerkPlugin } from '@clerk/vue'


const routes = [
  { path: '/', component: HomeView },
  { path: '/matting', component: MattingView },
  { path: '/virtual', component: VirtualTryOn},
  { path: '/clothes', component: ClothesList}
]

const router = createRouter({
  history: createWebHistory (),
  routes,
})

const app = createApp(App)

app.use(router)

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })

app.mount('#app')
