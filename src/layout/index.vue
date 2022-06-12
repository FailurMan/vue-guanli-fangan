<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    ></sidebar>
    <!-- 右侧 -->
    <div class="main-container">
      <!-- 顶部 -->
      <div class="fixed-header">
        <navbar></navbar>

        <!-- tags -->
        <tags-view id="guide-tags"></tags-view>
      </div>
      <!-- 内容区 -->
      <appmain-vue></appmain-vue>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import AppmainVue from "./components/Appmain.vue";
import Sidebar from "./components/Sidebar/index";
import TagsView from "@/components/TagsView/index.vue";
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - $sideBarWidth);
  transition: width $SideBarDuration;
}

.hideSidebar .fixed-header {
  width: calc(100% - $hideSideBarWidth) !important;
}
</style>
