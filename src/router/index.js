import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentView from '../views/student/view.vue'
import StudentCreate from '../views/student/create.vue'
import StudentEdit from '../views/student/update.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView,
    },
    {
      path: '/student/create',
      name: 'studentcreate',
      component: StudentCreate,
    },
    {
      path: '/student/edit/:id',
      name: 'studentedit',
      component: StudentEdit,
    }
  ],
})

export default router
