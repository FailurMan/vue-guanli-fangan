<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-crad
          class="project-crad"
          :features="featureData"
        ></project-crad>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData"></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProjectCrad from "./components/ProjectCart";
import Author from "./components/Author";
import Chapter from "./components/Chapter";
import Feature from "./components/Featrue";
import { getFeature } from "@/api/user";
import { watchSwitchLang } from "@/utils/i18n";
import store from "@/store";
const activeName = ref("feature");
const featureData = ref([]);
const getFeatureData = async () => {
  featureData.value = await getFeature();
};
getFeatureData();
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch("user/getUserInfo");
  }
});
</script>

<style lang="scss" scoped>
.project-crad {
  margin-right: 20px;
}
</style>
