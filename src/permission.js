import router from "./router";
import store from "./store/index.js";
/* 
 路由前置守卫
 @parmas {*} to 要到哪里去
 @parmas {*} from 你从哪里来
 @parmas {*} next 是否要去
*/
//白名单
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  //1.用户已登录
  if (store.getters.token) {
    if (to.path === "/login") {
      next("/");
    } else {
      //判断当前用户信息是否存在
      if (!store.getters.hasUserInfo) {
        await store.dispatch("user/getUserInfo");
      }
      next();
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});
