import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/login.vue';
import Signin from '../components/Signin.vue';
import HomeView from '../views/HomeView';
import Home from '../components/Home.vue';
import Profile from '../components/Profile.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  
 
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router