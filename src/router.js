import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Unified from './components/UnifiedMarkdown.vue'
import Markedjs from './components/MarkedjsMarkdown.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  {
    path: '/markedjs',
    name: 'Markedjs',
    component: Markedjs
  },
  {
    path: '/unified',
    name: 'Unified',
    component: Unified
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router