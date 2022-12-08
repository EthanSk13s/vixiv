import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import PostImageView from '../views/PostImageView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue';
import NotFoundView from '@/views/NotFound.vue'

import axios from 'axios'

import { toastStore } from '@/stores/toast'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/post_image',
      name: 'postimage',
      component: PostImageView,
      beforeEnter: (to, from) => {
        axios.get('/session')
          .catch((error) => {
            const store = toastStore()
            store.$patch({type: 'error'})
            store.$patch({message: 'You must be logged in to access that page'})

            router.push('login')
          })
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/post/:id',
      component: PostView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter: (to, from) => {
        axios.get('/session')
          .catch((error) => {
            const store = toastStore()
            store.$patch({type: 'error'})
            store.$patch({message: 'You must be logged in to access that page'})

            router.push('login');
          })
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

export default router
