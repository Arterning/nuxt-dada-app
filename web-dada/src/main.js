import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'


import HomeView from './pages/index.vue'
import MattingView from './pages/image-matting.vue'
import VirtualTryOn from './pages/virtual-try-on.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/matting', component: MattingView },
  { path: '/virtual', component: VirtualTryOn}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
