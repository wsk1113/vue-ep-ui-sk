import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },

    /* demos */
    {
      path: "/demos",
      name: "demos",
      meta: { menuIndex: "4" },
      component: () => import("@demos/Index.vue"),

      children: [
        {
          path: "element",
          name: "element",
          component: () => import("@demos/ElementDemo.vue"),
        },
        {
          path: "vuex",
          name: "vuex",
          component: () => import("@demos/VuexDemo.vue"),
        },
      ],
    },

    /* 数据看板 */
    {
      path: "/data",
      name: "data",
      meta: { menuIndex: "0" },
      component: () => import("../views/DashBoard.vue"),
    },

    /* 正在热映 */
    {
      path: "/film/playing",
      name: "playing",
      meta: { menuIndex: "1-0" },
      component: () => import("../views/film/Playing.vue"),
    },

    /* 即将上映 */
    {
      path: "/film/coming",
      name: "coming",
      meta: { menuIndex: "1-1" },
      component: () => import("../views/film/Coming.vue"),
    },

    /* 热门城市 */
    {
      path: "/cinema/hot",
      name: "hot",
      meta: { menuIndex: "2-0-0" },
      component: () => import("../views/cinema/HotCity.vue"),
    },

    /* 所有城市 */
    {
      path: "/cinema/all",
      name: "allcity",
      meta: { menuIndex: "2-1" },
      component: () => import("../views/cinema/AllCity.vue"),
    },

    /* 用户管理 */
    {
      path: "/user",
      name: "user",
      meta: { menuIndex: "3" },
      component: () => import("../views/UserList.vue"),
    },

    {
      path: "/film/:id([a-z\\d]{24})",
      name: "detail",
      component: () => import("../views/film/Detail.vue"),
    },

    {
      path:"/film/add",
      name:"filmadd",
      component: () => import("../views/film/DetailAdd.vue"),
    },

    /* 404 */
    {
      path: "/:pm(.*)*",
      name: "notfound",
      component: () => import("@views/NotFound.vue"),
    },
  ],
});

export default router;
