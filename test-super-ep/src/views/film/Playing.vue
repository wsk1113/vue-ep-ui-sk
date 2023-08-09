<template>
  <div class="wrapper">
    <!-- <p>currentPage: {{ currentPage }}</p> -->

    <!-- 批量操作 -->
    <div class="card top">
      <el-button class="opBtn" type="danger" @click="patchDelete">
        <el-icon><Close /></el-icon>&nbsp;删除
      </el-button>

      <el-button class="opBtn" type="success"
        ><el-icon><DocumentCopy /></el-icon>&nbsp; 导出</el-button
      >

      <el-button class="opBtn" type="primary" @click="addPlaying">
        <el-icon><Plus /> </el-icon>
        &nbsp; 添加
      </el-button>
    </div>

    <!-- 
      :data="computedData" // 表格数据
      stripe //隔行变色
      style="width: 100%" //额外样式，会透传到组件的布局中为根元素所接收
      :default-sort="{ prop: 'date', order: 'ascending' }" //默认根据数据项的date字段升序排列
      @selection-change="handleSelectionChange" //多选变化时的处理函数，载荷为勾选上的数据集
     -->
    <el-table
      :data="computedData"
      stripe
      class="middle"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'ascending' }"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选显示栏 -->
      <el-table-column type="selection" width="40" />

      <!-- fixed固定 sortable字段可排序 label=当前列标题 width当前列像素宽度 -->
      <el-table-column sortable fixed prop="filmId" label="id" width="100" />

      <!-- 片名 -->
      <el-table-column sortable prop="name" label="片名" width="180" />

      <!-- 海报 -->
      <el-table-column prop="poster" label="海报" width="60">
        <!-- <template #default="scope"> -->
        <template #default="{ row: { poster } }">
          <div style="display: flex; align-items: center">
            <!-- 这里我们通过一个简单的测试发现scope.row.poster即要显示的海报数据 -->
            <!-- <el-image :src="showScope(scope)" /> -->
            <el-image :src="poster" />
          </div>
        </template>
      </el-table-column>

      <!-- 主演 -->
      <el-table-column
        sortable
        prop="actors"
        label="主演"
        :formatter="formatActors"
        width="200"
      />

      <!-- 国家 -->
      <el-table-column sortable prop="nation" label="国家" width="150" />

      <!-- 类型 -->
      <el-table-column sortable prop="category" label="类型" width="150" />

      <!-- 片长 -->
      <el-table-column sortable prop="runtime" label="片长" width="100" />

      <!-- 评分 -->
      <el-table-column sortable prop="grade" label="评分" width="100" />

      <!-- 首映日期 -->
      <el-table-column
        sortable
        prop="premiereAt"
        label="首映日期"
        :formatter="formatPremierAt"
        width="150"
      />

      <!-- 右侧固定的操作按钮区 -->
      <el-table-column fixed="right" label="操作" width="90">
        <!-- action按钮区作用域插槽提供的数据中含有当前行信息row -->
        <!-- <template #default="scope"> -->

        <!-- 可以通过简单的测试查看一下作用域插槽中携带的数据 -->
        <!-- <el-button @click="showScope(scrope)"/> -->

        <!-- 从作用域插槽数据中解构出当前行id -->
        <template #default="{ row: { _id } }">
          <!-- 点击Edit按钮 携带id跳转详情页 -->
          <el-button
            @click="$router.push(`/film/${_id}`)"
            type="primary"
            :icon="Edit"
            circle
            size="small"
          />

          <!-- 触发单个影片删除 -->
          <el-button
            @click="deleteItem(_id)"
            type="danger"
            :icon="Delete"
            circle
            size="small"
          />

        </template>
      </el-table-column>
    </el-table>

    <!-- 翻页侦听的两种玩法 -->
    <!-- @current-change="onCurrentChange" 分页器分页侦听的事件回调版（低级玩法/废弃） -->
    <!-- v-model:current-page="currentPage" 双向绑定分页器的当前页码（高级玩法/推荐） -->
    <!-- 
      :page-size="5"一页5条 
      :total="tableData.length"总数据量取决于数据总条数
      v-model:current-page="currentPage" 双向绑定分页器的当前页码
      -->
    <div class="card bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="tableData.length"
        v-model:current-page="currentPage"
      />
    </div>

    <!-- 默认隐藏的对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="操作确认"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 显示【当前模式的提示信息】 -->
      <span>{{ dialogMode.msg }}</span>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>

          <!-- 用户点击确认时执行【当前模式对应的回调】 -->
          <el-button type="primary" @click="dialogMode.callback">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from 'vue-router'

import { ElMessage } from "element-plus";
import {
  Plus,
  Close,
  DocumentCopy,
  Delete,
  Edit,
} from "@element-plus/icons-vue";

import { getPlayings, deletePlaying } from "@api/movieApi";

// $router.push('/film/add')
const router = useRouter()

/* 完整电影列表 */
const tableData = ref([]);

/* 要显示的分页数据 */
const currentPage = ref(1);
const computedData = computed(() =>
  tableData.value.slice((currentPage.value - 1) * 10, currentPage.value * 10)
);

/* 组件挂载完毕后发起AJAX请求 */
onMounted(async () => {
  const films = await getPlayings();
  console.log("films=", films);

  tableData.value = films;
});

/* 数据格式化函数 */
const formatPremierAt = (row, column, cellValue, index) => {
  // console.log("row", row);//当前行数据
  // console.log("column", column);//当前列信息
  // console.log("cellValue", cellValue);//当前要格式化的单元格数据
  // console.log("index", index);//当前行行号

  return new Date(cellValue * 1000).toLocaleDateString().replaceAll("/", "-");
};
const formatActors = (row, column, cellValue, index) => {
  return (
    cellValue
      .map((actor) => actor.name)
      .slice(0, 3)
      .join(",") + "等"
  );
};
const formatPoster = (scope) => console.log("formatPoster", scope);

/* 多选时此处能拿到选中的子数组 */
const selectedItems = ref([]);
const handleSelectionChange = (val) => {
  console.log("handleSelectionChange", val);
  selectedItems.value = val;
};

/* 执行单个删除 */
const doDeleteItem = async () => {
  // 先读入要删除的id
  console.log("doDeleteItem", deleteId.value);

  // 将对话框隐藏
  dialogVisible.value = false;

  // 调用服务端API执行删除
  const { msg, deletedCount } = await deletePlaying(deleteId.value);
  console.log("msg=", msg);

  /* 使用Message提示信息 */
  ElMessage({
    message: msg,
    type: deletedCount ? "success" : "error",
  });

  if (deletedCount) {
    // 暴力重绘整个页面（性能低下，体验垃圾,横批——你个渣渣）
    // window.location.reload();

    /* 修改响应式数据，让数据去驱动视图做【差量渲染】 */
    // 找出要删除的那条数据 arr.find(item=>item._id===xxid)
    tableData.value.find((item, index) => {
      if (item._id === deleteId.value) {
        /* 等find正常返回后 再执行真正的删除动作 */
        setTimeout(() => {
          tableData.value.splice(index, 1);
        });

        return item;
      }
    });
  }
};

/* 执行批量删除 */
const doPatchDelete = () => {
  dialogVisible.value = false;
  console.log("doPatchDelete");

  Promise.all(
    /* 将选中的【电影数组】映射为【执行删除的Promise数组】 */
    selectedItems.value.map((film) => deletePlaying(film._id))
  )
    .then((results) => {
      ElMessage({
        message: "批量删除成功",
        type: "success",
      });

      // 依然应该使用数据驱动视图 这里做了简单处理
      window.location.reload()
    })
    .catch((err) => {
      ElMessage({
        message: err,
        type: "error",
      });
    });
};

// 对话框显隐控制
const dialogVisible = ref(false);

/* 对话框模式 */
const dialogModes = {
  // 单个删除模式
  deleteItem: {
    msg: "确认删除影片吗?",
    callback: doDeleteItem,
  },

  // 批量删除模式
  patchDelete: {
    msg: "确认执行批量删除吗?",
    callback: doPatchDelete,
  },
};

// 默认使用单个删除模式
let dialogMode = ref(dialogModes.deleteItem);

/* 删除单个 */
const deleteId = ref(0);
const deleteItem = (id) => {
  // 先将要删除的id暂存起来
  deleteId.value = id;

  // 确认删除对话框显示粗来
  dialogMode.value = dialogModes.deleteItem;
  dialogVisible.value = true;
};

/* 批量删除 */
const patchDelete = () => {
  // 确认删除对话框显示粗来
  dialogMode.value = dialogModes.patchDelete;
  dialogVisible.value = true;
};

/* 添加影片 */
const addPlaying = () => {
  router.push('/film/add')
}

</script>

<style lang="scss" scoped>
.wrapper {
  width: calc(1000px - 1rem * 2);
  // height: 800px;
  // overflow: scroll;

  .top {
    display: flex;
    justify-content: flex-end;
    .opBtn {
      width: 100px;
    }
  }

  .middle {
    margin: 10px 0;
  }

  .bottom {
    padding: 5px;
  }
}
</style>
