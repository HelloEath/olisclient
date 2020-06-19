import Vue from "vue";
import Router from "vue-router";
/** activity start （2019.06.19整理activity文件夹包含的所有路由路径） */

//以下为移动端路由
const mobileLoginAoRun = r =>
  require.ensure(
    [],
    () => r(require("../views/mobileView/mobile-login-aorun")),
    "mobileLoginAoRun"
  );

const mobileBrandList = r =>
  require.ensure(
    [],
    () => r(require("../views/mobileView/brand-list")),
    "mobileBrandList"
  );

const mobileCarTypeDetails = r =>
  require.ensure(
    [],
    () => r(require("../views/mobileView/car-type-detail")),
    "mobileCarTypeDetails"
  );
const mobileYearDetails = r =>
  require.ensure(
    [],
    () => r(require("../views/mobileView/year-engine-detail")),
    "mobileYearDetails"
  );
const mobileOlisDetails = r =>
  require.ensure(
    [],
    () => r(require("../views/mobileView/olis-detail")),
    "mobileOlisDetails"
  );
const mobileSaeDetails = r =>
  require.ensure(
    [],
    () => r(require("../views/mobileView/sae-detail")),
    "mobileSaeDetails"
  );
const page_404 = r =>
  require.ensure([], () => r(require("../views/404.vue")), "page_404");


const mobileOlisDesc=r=>require.ensure([],()=>r(require("../views/mobileView/olis-desc")),'mobileOlisDesc');
Vue.use(Router);

export default new Router({
  //mode:'history',
  routes: [
    {
      path: "/",
      redirect: "/mobile-login-aorun",
    },
    {
      path:"/mobile-login-aorun",
      name:"mobileLoginAoRun",
      component:mobileLoginAoRun
    },

    {
      path:"/mobile-brands",
      name:"mobileBrandList",
      component:mobileBrandList
    },

    {
      path:"/mobile-car-type-details",
      name:"mobileCarTypeDetails",
      component:mobileCarTypeDetails
    },
    {
      path:"/mobile-year-details",
      name:"mobileYearDetails",
      component:mobileYearDetails,

    },
    {
      path:"/mobile-olis-details",
      name:"mobileOlisDetails",
      component:mobileOlisDetails
    },
    {
      path:"/mobile-sae-details",
      name:"mobileSaeDetails",
      component:mobileSaeDetails
    },
    {
      path:"/mobile-olis-desc",
      name:"mobileOlisDesc",
      component:mobileOlisDesc
    },

    {
      path: "/404",
      name: "404",
      component: page_404,
    },
    {
      path: "*",
      redirect: "/404",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      window.scrollTo(0, 0);
      return {x: 0, y: 0};
    }
  },
});
