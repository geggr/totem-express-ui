import { createRouter, createWebHistory } from "vue-router";

import IdentificationStep from "./pages/totem/IdentificationStep.vue";
import ProductSelectionStep from "./pages/totem/ProductSelectionStep.vue";
import ResumeStep from "./pages/totem/ResumeStep.vue";
import OrdersTracking from "./pages/admin/OrdersTracking.vue";
import ProductList from "./pages/admin/ProductList.vue";

const routes = [
    { name: 'totem-start', path: '/', component: IdentificationStep },
    { name: 'product-selectio', path: '/product', component: ProductSelectionStep },
    { name: 'order-resuem', path: '/resume', component: ResumeStep },
    { name: 'admin-products', path: '/admin/products', component: ProductList },
    { name: 'admin-orders', path: '/admin/orders', component: OrdersTracking }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})