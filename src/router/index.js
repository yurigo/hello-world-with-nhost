import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticuloView from '../views/ArticuloView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/authors',
      name: 'authors',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AutoresView.vue')
    },
    {
        path: '/articles',
        name: 'articles',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/ArticulosView.vue'),

        // children: [
        //     {
        //         path: ':id',
        //         name: 'article',
        //         component: ArticuloView
        //     }
        // ]
      },
      {
        path: '/articles/:id',
        name: 'article',
        component: ArticuloView
      },
  ]
})

export default router
