module.exports = {
  //表示当前目录即为根目录，ESLint将被限制到该目录下
  root: true,
  //env表示启用ESlint检测环境
  env: {
    //在node环境下启动ESlint检测
    node: true,
  },
  //ESlint中配置需要继承的配置
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  //解析器
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  //需要修改的启用规则及其各自的错误级别
  /* 
   错误级别分为三种
   1、off或0  关闭规则
   2、warn或1 开启规则,使用警告级别的错误:warn(不会导致程序退出)
   3、error或2 开启规则,使用错误级别的错误:error(当被触发的时候,程序会退出)
  
  */
  rules: {
    "no-dupe-keys": 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-dupe-args": 2, // 函数参数不能重复
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: "warn",
    "vue/multi-word-component-names": 0,
    semi: 0,
    "no-unused-vars": 0,
    "vue/no-unused-vars": 0,
  },
};
