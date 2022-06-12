<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!-- 图标 -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon id="guide-theme" icon="change-theme"></svg-icon>
      </el-tooltip>
    </div>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t("msg.theme.themeColorChange") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <select-color v-model="selectColorVisibile"></select-color>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from "vue";
import { useStore } from "vuex";
import SelectColor from "./components/SelectColor.vue";

//dialog
const selectColorVisibile = ref(false);

const handleSetTheme = () => {
  selectColorVisibile.value = true;
};
</script>

<style scoped lang="scss"></style>
