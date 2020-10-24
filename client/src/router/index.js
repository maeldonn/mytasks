import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Administration from '../views/Administration.vue';

Vue.use(VueRouter);

function loggedInRedirectDashboard(to, from, next) {
  if (localStorage.token) {
    next('/dashboard');
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/login');
  }
}

function isAdmin(to, from, next) {
  // TODO: IF ADMIN
  if (localStorage.token) {
    next();
  } else {
    next('/dashboard');
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'MyTasks - Home' },
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'MyTasks - Register' },
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'MyTasks - Login' },
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: 'MyTasks - Dashboard' },
    beforeEnter: isLoggedIn,
  },
  {
    path: '/administration',
    name: 'Administration',
    component: Administration,
    meta: { title: 'MyTasks - Admin' },
    beforeEnter: isAdmin,
  },
  {
    path: '*',
    name: '404',
    component: Home,
    beforeEnter: loggedInRedirectDashboard,
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
