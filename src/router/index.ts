import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

export const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
    { path: '/setting', name: 'Setting', component: () => import('@/views/Setting.vue') },
]

export default createRouter({
    history: createWebHistory(),
    routes
})