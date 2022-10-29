import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import PostImageViewVue from '../views/PostImageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/viewpost',
      name: 'viewpost',
      component: PostView
    },
    {
      path: '/post_image',
      name: 'postimage',
      component: PostImageViewVue
    }
  ]
})

export default router
