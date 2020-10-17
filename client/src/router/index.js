import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Administration from '../views/Administration.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'MyTasks - Home' },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'MyTasks - Register' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'MyTasks - Login' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: 'MyTasks - Dashboard' },
  },
  {
    path: '/administration',
    name: 'Administration',
    component: Administration,
    meta: { title: 'MyTasks - Admin' },
  },
  {
    path: '*',
    name: '404',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
