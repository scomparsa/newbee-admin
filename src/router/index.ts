import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/views/Index.vue";
import AddGoods from "@/views/AddGoods.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
    },
    {
      path: "/add",
      name: "add",
      component: AddGoods,
    },
    {
      path: "/Login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
