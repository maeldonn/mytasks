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

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: isLoggedIn,
  },
  {
    path: '/administration',
    name: 'Administration',
    component: Administration,
    beforeEnter: isLoggedIn,
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
  document.title = 'MyTasks';
  next();
});

export default router;
