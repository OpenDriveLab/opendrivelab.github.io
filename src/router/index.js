import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/AD_Dataset.vue'),
    meta: {
      title: 'OpenDriveLab'
    }
  },
  // {
  //   path: '/DriveLM',
  //   component: () => import('@/views/DriveLM/DriveLM.vue'),
  //   meta: {
  //     title: 'DriveLM'
  //   }
  // },
]

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
