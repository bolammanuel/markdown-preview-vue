import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/saved',
      name: 'saved',
      component: () => import('@/views/SavedDocsView.vue'),
    },
    {
      path: '/error-test',
      name: 'error-test',
      component: () => import('@/views/ErrorTestView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/components/NotFound.vue'),
    },
  ],
})

export default router
