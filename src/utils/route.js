import path from "path";
/* 
 获取子集路由
*/
const getChildrenRoutes = (routes) => {
  const result = [];
  routes.forEach((route) => {
    if (route.children && route.children.length) {
      result.push(...route.children);
    }
  });
  return result;
};
/* 
  处理脱离层级的路由
*/
export const filterRoutes = (routes) => {
  //所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes);
  const result = [];
  for (let key of routes) {
    let routesPath = key.path;
    const ishaveChildrenRoute = childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === routesPath;
    });
    if (!ishaveChildrenRoute) {
      result.push(key);
    }
  }
  return result;
  //根据子集进行查重
  // return routes.filter((route) => {
  //   //根据子集进行查重
  //   return !childrenRoutes.find((childrenRoute) => {
  //     return childrenRoute.path === route.path;
  //   });
  // });
};

function isNull(data) {
  if (!data) return true;
  if (JSON.stringify(data) === "{}") return true;
  if (JSON.stringify(data) === "[]") return true;
}

/* 
  根据routes数据,返回对应的 menu 数据规则
*/
export function generateMenus(routes, basePath = "") {
  const result = [];
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return;
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children));
      return;
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path);
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath);

    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      };

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route);
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path));
    }
  });
  return result;
}
