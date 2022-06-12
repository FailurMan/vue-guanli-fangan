<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
  >
    <sidebar-item
      v-for="route in routes"
      :key="route.path"
      :route="route"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { filterRoutes, generateMenus } from "@/utils/route";
import SidebarItem from "./SidebarItem";
const router = useRouter();
const routes = computed(() => {
  //过滤
  const filterRoute = filterRoutes(router.getRoutes());
  //构造
  return generateMenus(filterRoute);
});
//默认激活
const route = useRoute();
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="scss" scoped></style>
