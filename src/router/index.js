import { createRouter, createWebHistory } from 'vue-router'
import HomeFinderView from '@/views/HomeFinderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/woningzoeker',
      alias: ['/'],
      name: 'woningzoeker',
      component: HomeFinderView
    }
  ]
})

export default router
