import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Unified from './components/UnifiedMarkdown.vue'
import Markedjs from './components/MarkedjsMarkdown.vue'
import ChatBox from './components/ChatBox.vue'
import StreamingMarkdown from './components/StreamingMarkdown.vue'
import StreamingMarkedjs from './components/StreamingMarkedjs.vue'
import ChatBoxOffical from './components/ChatBoxOffical.vue'
import MaskedImage from './components/MaskedImage.vue'
import DrawingCanvas from './components/DrawingCanvas.vue'

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
  },
  {
    path: '/chatbox',
    name: 'ChatBox',
    component: ChatBox
  },
  {
    path: '/streaming',
    name: 'StreamingMarkdown',
    component: StreamingMarkdown
  },
  {
    path: '/streaming-markedjs',
    name: 'StreamingMarkedjs',
    component: StreamingMarkedjs
  },
  {
    path: '/chatbox-offical',
    name: 'ChatBoxOffical',
    component: ChatBoxOffical
  },
  {
    path: '/masked-image',
    name: 'MaskedImage',
    component: MaskedImage
  },
  {
    path: '/drawing-canvas',
    name: 'DrawingCanvas',
    component: DrawingCanvas
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router