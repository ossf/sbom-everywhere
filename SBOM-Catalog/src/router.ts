import {createRouter, createWebHashHistory, RouterRecordRaw } from "vue-router";
import App from "./App.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/Circle/Normalize/HowTo'
    },
    {
        path: '/:view/:aggregation/:selection',
        name: 'SBOM Catalog',
        component: App
    }
]

const router = createRouter ({
    history: createWebHashHistory(),
    routes
})

export default router