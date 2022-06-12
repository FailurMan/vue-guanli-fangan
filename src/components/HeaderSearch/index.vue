<template>
  <div class="header-search" :class="{ show: isShow }">
    <svg-icon
      id="guide-search"
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { filterRoutes } from "@/utils/route";
import { useRouter } from "vue-router";
import { generateRoutes } from "./FuseData";
import { watchSwitchLang } from "@/utils/i18n";
import Fuse from "fuse.js";
const router = useRouter();
//search相关
const search = ref("");
const searchOptions = ref([]);
//控制输入框展示
const isShow = ref(false);

const headerSearchSelectRef = ref(null);
//数据源
let searchPool = computed(() => {
  const filterRoute = filterRoutes(router.getRoutes());
  return generateRoutes(filterRoute);
});

let fuse;
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "path",
        weight: 0.3,
      },
    ],
  });
};
initFuse(searchPool.value);
const onClosed = () => {
  headerSearchSelectRef.value.blur();
  isShow.value = false;
  searchOptions.value = [];
};
watch(isShow, (val) => {
  if (val) {
    headerSearchSelectRef.value.focus();
    document.body.addEventListener("click", onClosed);
  } else {
    document.body.removeEventListener("click", onClosed);
  }
});
const onShowClick = () => {
  isShow.value = !isShow.value;
};
//搜索方法
const querySearch = (query) => {
  if (query !== "") {
    searchOptions.value = fuse.search(query);
  }
};
//选中回调
const onSelectChange = (val) => {
  router.push(val.path);
};
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoute = filterRoutes(router.getRoutes());
    return generateRoutes(filterRoute);
  });
  initFuse(searchPool.value);
});
</script>

<style scoped lang="scss">
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
