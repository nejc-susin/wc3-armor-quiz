import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Armor from '../views/Armor.vue'
import Attack from '../views/Attack.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  
  {
    path: '/',
    name: 'Home',
    redirect: 'Armor'
  },
  {
    path: '/armor',
    name: 'Armor',
    component: Armor
  },
  {
    path: '/attack',
    name: 'Attack',
    component: Attack
  }
]

const router = new VueRouter({
  routes
})

export default router
