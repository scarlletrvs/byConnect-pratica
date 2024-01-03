// router.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from "../configuracao/index";


Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: () => import('../pages/HomePage.vue'),  meta: {requiresAuth: true, } },
    { path: '/perfil/:email', component: () => import('../pages/PerfilPage.vue'),  meta: {requiresAuth: true, }},
    { path: '/Config', component: () => import('../pages/ConfigPage.vue'),   meta: {requiresAuth: true, }},
    { path: '/login', component: () => import('../pages/LoginPage.vue'),  meta: {requiresAuth: false, }},
    { path: '/cadastro', component: () => import('../pages/CadastroPage.vue'),  meta: {requiresAuth: true, }},
    { path: '/usuarios', component: () => import('../pages/allUsers.vue'),  meta: {requiresAuth: true, }},

    { path: '*',component: () => import('../pages/NotFoundPage.vue')  },


  ],
  mode: 'history',
});
router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      
      if (to.path === "/login" || to.path === "/cadastro") {
        next("/");
      } else {
        next();
      }
    } else {
      if (to.path === "/login" || to.path === "/cadastro") {
        next();
      } else {
        next("/login");
      }
    }
  });
});

export default router;
