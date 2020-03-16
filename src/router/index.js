import Vue from "vue";
import Router from "vue-router";
/** activity start （2019.06.19整理activity文件夹包含的所有路由路径） */


const index = r =>
  require.ensure([], () => r(require("../views/index.vue")), "index");
const home = r =>
  require.ensure([], () => r(require("../views/home/home.vue")), "home");

const Login = r =>
  require.ensure([], () => r(require("../views/login.vue")), "Login");

const LoginAoRun = r =>
  require.ensure([], () => r(require("../views/login-aorun.vue")), "LoginAoRun");

const LoginOther = r =>
  require.ensure([], () => r(require("../views/login-other.vue")), "LoginOther");
const Index = r =>
  require.ensure([], () => r(require("../views/index.vue")), "Index");
const page_404 = r =>
  require.ensure([], () => r(require("../views/404.vue")), "page_404");



//一级车型管理
const oneRankCarManage = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/brand/one-rank-car-type-manage")),
    "oneRankCarManage"
  );
//保护油管理
const olisManage = r =>
  require.ensure(
    [],
    () => require("../views/olis/olis-manage"),
    "olisManage"
  );
//图片基础数
const picBase = r =>
  require.ensure(
    [],
    () => require("../views/olis/pic-base"),
    "picBase"
  );
//机器人管理
const robotManage = r =>
  require.ensure(
    [],
    () => require("../views/olis/robot/robot-manage"),
    "robotManage"
  );

const account = r =>
  require.ensure(
    [],
    () => r(require("../views/user/account/index.vue")),
    "account"
  );
const rolePermission = r =>
  require.ensure(
    [],
    () => r(require("../views/user/role/index.vue")),
    "rolePermission"
  );

//发动机管理
const engineManage = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/engine/engine-manage")),
    "engineManage"
  );

//二级车型
const twoRankCarManage = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/brand/two-rank-car-type-manage")),
    "twoRankCarManage"
  );
//三级车型
const threeRankCarManage = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/brand/three-rank-car-type-manage")),
    "threeRankCarManage"
  );
//年限管理
const yearManage = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/year/year-manage")),
    "yearManage"
  );

//地区管理
const areaManage = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/regionManage/area-manage")),
    "areaManage"
  );

//品牌管理
const brandManage = r =>
  require.ensure([], () => r(require("../views/olis/brand/brand-manage")), "brandManage");

//地区价格管理
const areaPriceManage = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/regionManage/area-price-manage")),
    "areaPriceManage"
  );
//发动机类型
const engineType = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/engine/engine-type")),
    "engineType"
  );


// 新增：我的用户
const systemLog = r =>
  require.ensure(
    [],
    () => require("../views/user/system_log/index.vue"),
    "systemLog"
  );


//菜单管理
const menu = r =>
  require.ensure([], () => r(require("../views/user/menu/index.vue")), "menu");

//油品价格管理
const olisPrizeManage = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/olis_prize_manage")),
    "olisPrizeManage"
  );

const olisList = r =>
  require.ensure(
    [],
    () => r(require("../views/olis/olis-list")),
    "olisList"
  );


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
Vue.use(Router);

export default new Router({
  //mode:'history',
  routes: [
    {
      path: "/",
      redirect: "/login-aorun",
    },
    {
      path: "/login-aorun",
      name: "LoginAoRun",
      component: LoginAoRun,
    },
    {
      path:"/login-other",
      name:"LoginOther",
      component:LoginOther
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
      path: "/index",
      name: "Index",
      component: Index,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: home,
          meta: {title: "欢迎页"},
        },

        {
          path: "/brand-manage",
          name: "brandManage",
          component: brandManage,
          meta: {title: "品牌管理"},
        },
        {
          path: "/one-rank-car-manage",
          name: "oneRankCarManage",
          component: oneRankCarManage,
          meta: {title: "一级车型管理"},
        },
        {
          path: "/two-rank-car-manage",
          name: "twoRankCarManage",
          component: twoRankCarManage,
          meta: {title: "二级车型管理"},
        },
        {
          path: "/three-rank-car-manage",
          name: "threeRankCarManage",
          component: threeRankCarManage,
          meta: {title: "三级车型管理"},
        },
        {
          path: "/year-manage",
          name: "yearManage",
          component: yearManage,
          meta: {title: "年限管理"},
        },
        {
          path: "/account-management",
          name: "account",
          component: account,
          meta: {title: "管理员列表"},
        },
        {
          path: "/role-permission",
          name: "rolePermission",
          component: rolePermission,
          meta: {title: "角色权限"},
        },
        {
          path: "/engine-type",
          name: "engineType",
          component: engineType,
          meta: {title: "发动机类型"},
        },
        {
          path: "/engine-manage",
          name: "engineManage",
          component: engineManage,
          meta: {title: "发动机管理"},
        },
        {
          path: "/olis-manage",
          name: "olisManage",
          component: olisManage,
          meta: {title: "保护油管理"},
        },
        {
          path: "/olis-pic-base",
          name: "picBase",
          component: picBase,
          meta: {title: "图片基础数"},
        },
        {
          path: "/robot-manage",
          name: "robotManage",
          component: robotManage,
          meta: {title: "机器人管理"},
        },
        {
          path: "/area-manage",
          name: "areaManage",
          component: areaManage,
          meta: {title: "地区管理"},
        },
        //以下是新增开始(20181031)
        {
          path: "/area-price-manage",
          name: "areaPriceManage",
          component: areaPriceManage,
          meta: {title: "地区价格管理"},
        },


        {
          path: "/system-log",
          name: "systemLog",
          component: systemLog,
          meta: {title: "系统日志"},
        },

        {
          path: "/menu",
          name: "menu",
          component: menu,
          meta: {title: "菜单管理"},
        },
        {
          path: "/olis-prize-manage",
          name: "olisPrizeManage",
          component: olisPrizeManage,
          meta: {title: "油品价格管理"},
        },

      ],
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

// export const initMenu = (router, store)=> {
//   if (store.state.menus.length > 0) {
//     return;
//   }
//
//   ajax.get("/user/menus", params, (res) => {
//     console.log("menus === "+res);
//     var fmtRoutes = formatRoutes(resp.data);
//     router.addRoutes(fmtRoutes);
//     store.commit("initMenu", fmtRoutes);
//
//     resolve(res)
//   })
//
// }
// export const formatRoutes = (routes)=> {
//   let fmRoutes = [];
//   routes.forEach(router=> {
//     let {
//       path,
//       component,
//       name,
//       meta,
//       iconCls,
//       children
//     } = router;
//     if (children && children instanceof Array) {
//       children = formatRoutes(children);
//     }
//     let fmRouter = {
//       path: path,
//       component(resolve){
//           require(["../views/" + component + ".vue"], resolve)
//       },
//       name: name,
//       iconCls: iconCls,
//       meta: meta,
//       children: children
//     };
//     fmRoutes.push(fmRouter);
//   })
//   return fmRoutes;
// }
