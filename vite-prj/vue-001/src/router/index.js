import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/", 
        name : "Home", 
        props: true,
        component: () => import ('../views/Home.vue')
    }, 
    {
        path: "/sample01", 
        name : "Sample01", 
        props: true,
        component: () => import ('../views/Sample01.vue')
    }, 
    {
        path: "/sample02", 
        name : "Sample02", 
        props: true,
        component: () => import ('../views/Sample02.vue')
    }, 
    {
        path: "/about", 
        name : "About", 
        props: true, 
        component: () => import ('../views/About.vue')
    }, 

];

const router = createRouter({
    history: createWebHistory(), 
    routes
});

export default router;