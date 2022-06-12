<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcel">{{
          $t("msg.excel.importExcel")
        }}</el-button>
        <el-button type="success" @click="onToExcelClick">
          {{ $t("msg.excel.exportExcel") }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column label="#" type="index" />
        <!-- 姓名 -->
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <!-- 电话 -->
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t("msg.excel.defaultRole") }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column prop="openTime" :label="$t('msg.excel.openTime')">
          <template #default="{ row }">{{
            $filters.dateFilter(row.openTime)
          }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              class="primary-button"
              @click="onShowClick(row._id)"
              >{{ $t("msg.excel.show") }}</el-button
            >
            <el-button type="info" size="mini" @click="onShowRoleClick">{{
              $t("msg.excel.showRole")
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t("msg.excel.remove")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <roles-dialog v-model="roleDialogVisibile"></roles-dialog>
  </div>
</template>

<script setup>
import { getUserManageList, deleteUser } from "@/api/user-manage";
import { watchSwitchLang } from "@/utils/i18n";
import { ref, onActivated } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import ExportToExcel from "./components/Export2Excel.vue";
import RolesDialog from "./components/roles.vue";
// 数据相关
const tableData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(2);
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value,
  });
  tableData.value = result.list;
  total.value = result.total;
};
getListData();
// 监听语言切换
watchSwitchLang(getListData);
//当组件被激活的时候,重新获取下数据
onActivated(getListData);
const handleSizeChange = (currentSize) => {
  size.value = currentSize;
  getListData();
};

const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};

//excel导入
const router = useRouter();
const onImportExcel = () => {
  router.push("/user/import");
};

//查看用户详情
const onShowClick = (id) => {
  router.push(`/user/info/${id}`);
};
//为员工分配角色
const roleDialogVisibile = ref(false);
const onShowRoleClick = () => {
  roleDialogVisibile.value = true;
};
//删除用户
const i18n = useI18n();
const onRemoveClick = (row) => {
  const removeText =
    i18n.t("msg.excel.dialogTitle1") +
    row.username +
    i18n.t("msg.excel.dialogTitle2");
  ElMessageBox.confirm(removeText, { type: "waring" }).then(async () => {
    await deleteUser(row._id);
    ElMessage.success(i18n.t("msg.excel.removeSuccess"));
    tableData.value = tableData.value.filter((item) => {
      return item._id !== row._id;
    });
  });
};

/* 
 excel导出事件
*/
const exportToExcelVisible = ref(false);
const onToExcelClick = () => {
  exportToExcelVisible.value = true;
};
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
