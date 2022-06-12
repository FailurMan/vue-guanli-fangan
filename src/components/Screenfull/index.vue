<template>
  <div @click="onToggle">
    <svg-icon
      id="guide-full"
      :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
      @change="change"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import screenfull from "screenfull";
//是否全屏
const isFullScreen = ref(false);

//触发事件
const onToggle = () => {
  screenfull.toggle();
};

// 监听变化
const change = () => {
  isFullScreen.value = screenfull.isFullscreen;
};
onMounted(() => {
  screenfull.on("change", change);
});
onUnmounted(() => {
  screenfull.off("change", change);
});
</script>

<style scoped lang="scss"></style>
