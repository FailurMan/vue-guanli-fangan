<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span class="no-redirect" v-if="index === breadcrumData.length - 1">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 可点击项 -->
        <span class="redirect" v-else @click="onLinkClick(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { generateTitle } from "@/utils/i18n";
const route = useRoute();
const router = useRouter();
//生成数组数据
const breadcrumData = ref([]);
const getBreadcrumData = () => {
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
};
//路由跳转
const onLinkClick = (item) => {
  router.push(item.path);
};

watch(
  route,
  () => {
    getBreadcrumData();
  },
  {
    immediate: true,
  }
);

//将来需要颜色替换,所以hover颜色设置为项目的主色
const store = useStore();
const linkHoverColor = ref(store.getters.cssVar.menuBg);
</script>

<style lang="scss" scoped>
.breadcrumb {
  position: relative;
  left: 8px;
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
  }
  .redirect:hover {
    color: v-bind(linkHoverColor);
  }
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
