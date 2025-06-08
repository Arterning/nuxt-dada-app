import { createApp } from 'vue'
import { createWebHistory , createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'


import HomeView from './pages/index.vue'
import MattingView from './pages/image-matting.vue'
import VirtualTryOn from './pages/virtual-try-on.vue'
import ClothesList from './pages/clothe-list.vue'

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

createApp(App).use(router).mount('#app')
