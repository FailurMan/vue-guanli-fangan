module.exports = {
  //继承的规则
  extends: ["@commitlint/config-conventional"],
  //定义规则
  roles: {
    //type的类型定义:表示git提交的type必须在以下类型当中
    "type-enum": [
      //当前验证的错误级别
      2,
      //在什么情况下进行验证
      "always",
      //泛型内容
      [
        { value: "feat", name: "feat:     新功能" },
        { value: "fix", name: "fix:      修复" },
        { value: "docs", name: "docs:     文档变更" },
        { value: "style", name: "style:    代码格式(不影响代码运行的变动)" },
        {
          value: "refactor",
          name: "refactor: 重构(既不是增加feature，也不是修复bug)",
        },
        { value: "perf", name: "perf:     性能优化" },
        { value: "test", name: "test:     增加测试" },
        { value: "chore", name: "chore:    构建过程或辅助工具的变动" },
        { value: "revert", name: "revert:   回退" },
        { value: "build", name: "build:    打包" },
      ],
    ],
    //subject 大小写不做校验
    "subject-case": [0],
  },
};
