<template>
  <div class="navbar">
    <!-- 折叠栏 -->
    <hamburger></hamburger>
    <breadcrumb id="guide-breadcrumb"></breadcrumb>
    <!-- 右侧头像区 -->
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />
      <header-search class="right-menu-item hover-effect"></header-search>
      <screen-full class="right-menu-item hover-effect"></screen-full>
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <lang-select class="right-menu-item hover-effect"></lang-select>
      <el-dropdown class="avatar-container" trigger="click"
        ><div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>

        <!-- 头像下拉栏 -->
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t("msg.navBar.home") }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="#">
              <el-dropdown-item>{{ $t("msg.navBar.course") }}</el-dropdown-item>
            </a>
            <router-link to="/">
              <el-dropdown-item @click="logout">
                {{ $t("msg.navBar.logout") }}</el-dropdown-item
              >
            </router-link>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Hamburger from "@/components/hamburger/index";
import Breadcrumb from "@/components/Breadcrumb/index";
import LangSelect from "@/components/LangSelect/index";
import ThemeSelect from "@/components/ThemeSelect/index";
import ScreenFull from "@/components/Screenfull/index";
import HeaderSearch from "@/components/HeaderSearch/index";
import Guide from "@/components/Guide/index";
const store = useStore();
const router = useRouter();
//退出登录
const logout = () => {
  store.dispatch("user/logout");
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.88);
  .hamburger-container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    //hover动画
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
      }
    }
    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
    .el-avatar {
      --el-avatar-background-color: none;
      --el-avatar-bg-color: none;
    }
  }
}
.el-dropdown-menu__item.el-dropdown-menu__item--divided {
  margin-top: 0;
}
</style>
