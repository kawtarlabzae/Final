import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/login.vue';
import Signin from '../components/Signin.vue';
import HomeView from '../views/HomeView';
import Home from '../components/Home.vue';
import Profile from '../components/Profile.vue';
import signout from '../components/signout.vue';
import EditCategory from '@/components/EditCategory.vue';
import Recipe from '@/components/Recipe.vue';

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
  {
    path: '/signout',
    name: 'signout',
    component: signout
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: Recipe,
    props: true
  },

  {
    path: '/edit-category/:id/:catid',
    name: 'EditCategory',
    component: EditCategory,
    props: true
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router