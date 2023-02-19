import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/Login'
// import Notebooks from '@/components/NotebookList'
// import Note from '@/components/NoteDetail'
// import Trash from '@/components/TrashDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias:'/notebooks',
      // component: Notebooks
      component: () => import('@/components/NotebookList.vue')
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue')
    },
    // {
    //   path: '/notebooks',
    //   component: Notebooks
    // },
    {
      path: '/note',
      component: () => import('@/components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: () => import('@/components/TrashDetail.vue')
    }
  ]
})
