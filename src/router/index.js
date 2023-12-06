import { createRouter, createWebHistory } from 'vue-router'
import HomeFinderView from '@/views/HomeFinderView.vue'
import SpecificHomeView from '@/views/SpecificHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/woningzoeker',
      alias: ['/'],
      name: 'woningzoeker',
      component: HomeFinderView
    },
    {
      path: '/woningzoeker/:woningId',
      name: 'woning',
      component: SpecificHomeView
    },
  ]
})

export default router
