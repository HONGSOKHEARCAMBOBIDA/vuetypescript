import { createRouter, createWebHistory, type RouteLocationNormalized, } from 'vue-router'
import { useUserDataStore } from '../store/user_date.ts';
import { useAuthStore } from '../store/auth.ts';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
        meta: {
          title: "សង្ខែបទិន្ន័យ",
          icon: "Odometer",
          short: "ទិន្ន័យ",
          showInNav: true,
        },
      },      
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { public: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to:RouteLocationNormalized) => {
  const userDataStore = useUserDataStore();
  const auth = useAuthStore();
  if (!to.meta.public && !auth.isLoggedIn) {
    return { name: "Login" };
  }
  if (to.name === "Login" && auth.isLoggedIn) {
    return { name: "Dashboard" };
  }
  if (to.meta.permission) {
    const hasPermission = userDataStore.permissions.includes(
      to.meta.permission
    );

    if (!hasPermission) {
      return { name: 'Dashboard' };
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router