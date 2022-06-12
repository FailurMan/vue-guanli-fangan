<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t("msg.uploadExcel.upload") }}
      </el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx,.xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t("msg.uploadExcel.drop") }}</span>
    </div>
  </div>
</template>

<script setup>
import XLSX from "xlsx";
import { ref, defineProps } from "vue";
import { getHeaderRow, isExcel } from "./utils";
import { ElMessage } from "element-plus";
const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function,
});

//点击上传触发
const loading = ref(false);
const excelUploadInput = ref(null);
const handleUpload = () => {
  excelUploadInput.value.click();
};
const handleChange = (e) => {
  const files = e.target.files;
  const rawFile = files[0]; // only use files[0]
  if (!rawFile) return;
  upload(rawFile);
};
//拖拽上传
const handleDrop = (e) => {
  //上传中
  if (loading.value) return;
  const files = e.dataTransfer.files;
  //判断是否传入文件
  if (files.length !== 1) {
    ElMessage.error("必须要有一个文件");
    return;
  }
  const rawFile = files[0];
  //判断是否为excel文件
  if (!isExcel(rawFile)) {
    ElMessage.error("文件必须是 .xlsx, .xls .csv 格式");
    return;
  }
  upload(rawFile);
};
const handleDragover = (e) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = "copy";
};
/*
 触发上传事件
*/
const upload = (rawFile) => {
  excelUploadInput.value.value = null;
  //如果用户没有指定上传前回调
  if (!props.beforeUpload) {
    readerData(rawFile);
    return;
  }
  //如果用户指定了上传前回调,返回为true才会执行后续操作
  const before = props.beforeUpload(rawFile);
  if (before) {
    readerData(rawFile);
  }
};

/*
 读取数据
*/
const readerData = (rawFile) => {
  loading.value = true;
  return new Promise((resolve, reject) => {
    //FileReader可以用来读取文件
    const reader = new FileReader();
    //读取操作完成时触发
    reader.onload = (e) => {
      //1.获取到解析后的数据
      const data = e.target.result;
      //2.理由XLSX对数据进行解析
      const workbook = XLSX.read(data, { type: "array" });
      //3.获取第一章表格(工作簿)的名称
      const firstSheetName = workbook.SheetNames[0];
      //4.读取sheet1(第一张表格)的数据
      const workSheet = workbook.Sheets[firstSheetName];
      //5.解析数据表头
      const header = getHeaderRow(workSheet);
      //6.解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet);
      //7.传入解析之后的数据
      generateData({ header, results });
      //8.处理loading
      loading.value = false;
      //9.成功回调
      resolve();
    };
    //
    reader.readAsArrayBuffer(rawFile);
  });
};

//根据导入内容生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData);
};
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
