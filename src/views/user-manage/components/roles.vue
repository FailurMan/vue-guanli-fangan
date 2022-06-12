<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <!-- 内容 -->
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button @click="closed">{{ $t("msg.universal.cancel") }}</el-button>
      <el-button type="primary" @click="onComfirm">{{
        $t("msg.universal.confirm")
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { roleList } from "@/api/role";
import { watchSwitchLang } from "@/utils/i18n";
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);

const onComfirm = () => {
  closed();
};
const closed = () => {
  emits("update:modelValue", false);
};

// 所有角色
const allRoleList = ref([]);
// 获取所有角色数据的方法
const getListData = async () => {
  allRoleList.value = await roleList();
};
getListData();
watchSwitchLang(getListData);

// 当前用户角色
const userRoleTitleList = ref([]);
</script>

<style scoped lang="scss"></style>
