import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/new-lens',
    name: 'NewLens',
    component: () => import(/* webpackChunkName: "new" */ '../views/NewLens.vue'),
  },
  {
    path: '/edit-lens/:id',
    name: 'EditLens',
    component: () => import(/* webpackChunkName: "edit" */ '../views/EditLens.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/register') {
    return next()
  }

  if (to.path !== '/' && !store.getters.isAuthenticated) {
    return next('/')
  }

  const now = Math.floor((new Date().getTime() / 1000))
  const isExp = (store.state.exp - now) < 0
  if (to.path !== '/' && store.getters.isAuthenticated && isExp) {
    return next('/')
  }

  if (to.path === '/' && store.getters.isAuthenticated && !isExp) {
    return next('/home')
  }

  return next()
})

export default router
