<template>
	<div class="wrapper">
		<!-- <p>currentPage: {{ currentPage }}</p> -->

		<!-- 批量操作 -->
		<BtnGroup
			ref="bgRef"
			:groupBtns="groupBtns"
			@group-btn-click="onGroupBtnClick">
			<template #delete>
				<el-icon><Delete /></el-icon>
			</template>

			<template #export>
				<el-icon><DocumentCopy /></el-icon>
			</template>

			<template #add>
				<el-icon><Plus /></el-icon>
			</template>
		</BtnGroup>

		<!-- 表格+分页器 -->
		<!-- @page-change="onEpPageChange" -->
		<EpTable
			ref="refEpTable"
			:tableData="tableData"
			:page-size="10"
			:cols="cols"
			:avgColWidth="100"
			@delete-item="deleteItem">
			<!-- 这里的东东覆盖名为poster的插槽 row为poster插槽暴露出来的数据 -->
			<template #poster="{ row }">
				<div style="display: flex; align-items: center">
					<el-image :src="row.poster" />
				</div>
			</template>

			<!-- 这里的东东覆盖名为poster的插槽 row为poster插槽暴露出来的数据 -->
			<template #actors="{ row }">
				<div style="display: flex; align-items: center">
					<el-image :src="row.actors[0].avatarAddress" />
				</div>
			</template>
		</EpTable>

		<!-- 默认隐藏的对话框 -->
		<EpDialog
			ref="refEpDialog"
			:dialogMode="dialogMode"></EpDialog>
	</div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { ElMessage } from "element-plus";
import { Plus, Close, DocumentCopy, Delete, Edit } from "@element-plus/icons-vue";
import BtnGroup from "@components/BtnGroup.vue";
import EpTable from "@components/EpTable.vue";
import EpDialog from "@components/EpDialog.vue";

import { getComings, deleteComing } from "@api/movieApi";

const router = useRouter();

/* 获取子组件实例，以调用子组件暴露出来的API */
const bgRef = ref(null);
const refEpTable = ref(null);
const refEpDialog = ref(null);

/* 完整电影列表 */
const tableData = ref([]);

/* 组件挂载完毕后发起AJAX请求 */
onMounted(async () => {
	const films = await getComings();
	console.log("films=", films);

	setTimeout(() => {
		tableData.value = films;
	}, 500);
});

/* 定义BtnGroup需要的数据 */
const groupBtns = [
	{
		name: "删除",
		type: "danger",
		slotName: "delete",
		callback: "patchDelete",
	},
	{
		name: "导出",
		type: "success",
		slotName: "export",
		callback: "patchExport",
	},
	{
		name: "添加",
		type: "primary",
		slotName: "add",
		callback: "addComing",
	},
];

/* 定义事件处理逻辑 */
const onGroupBtnClick = callback => {
	console.log("onGroupBtnClick", callback);
	groupBtnCallbacks[callback]();
};

const patchExport = () => {
	console.log("正在批量导出...");
};

/* 添加影片 */
const addComing = () => {
	console.log("正在addComing...");
};

/* 批量删除 */
const patchDelete = () => {
	// 确认删除对话框显示粗来
	dialogMode.value = dialogModes.patchDelete;
	refEpDialog.value.setDialogVisible(true);
};

/* 定义按钮组回调功能 */
let groupBtnCallbacks = {
	patchDelete,
	patchExport,
	addComing,
};

/* 表格列定义 */
const cols = [
	{
		prop: "filmId",
		label: "id",
		fixed: true,
		width: 100,
	},
	{
		prop: "poster",
		label: "海报",
		width: 60,
		nosort: true,
		hasSlot: true,
	},
	{
		prop: "actors",
		label: "导演",
		width: 60,
		hasSlot: true,
		nosort: true,
	},
	{
		prop: "name",
		label: "片名",
		width: 300,
	},
	{
		prop: "actors",
		label: "主演",
		formatter: row =>
			row.actors
				.map(a => a.name)
				.slice(0, 3)
				.join(",") + "等",
		width: 300,
	},
	{
		prop: "category",
		label: "影片类型",
		width: 200,
	},
	{
		prop: "filmType.name",
		label: "视觉",
	},
	{
		prop: "premiereAt",
		label: "首映",
		width: 150,
		formatter: (row, column, cellValue) => new Date(cellValue * 1000).toLocaleDateString().replaceAll("/", "-"),
	},
	{
		prop: "nation",
		label: "国家",
	},
	{
		prop: "grade",
		label: "评分",
	},
	{
		prop: "runtime",
		label: "时长",
	},
];

/* 执行单个删除 */
const deleteId = ref(0);
const deleteItem = id => {
	deleteId.value = id;
	dialogMode.value = dialogModes.deleteItem;

	console.log("refEpDialog.value", refEpDialog.value);
	refEpDialog.value.setDialogVisible(true);
};
const doDeleteItem = async () => {
	// 先读入要删除的id
	console.log("Coming:doDeleteItem", deleteId.value);

	// 将对话框隐藏
	refEpDialog.value.setDialogVisible(false);

	// 调用服务端API执行删除
	const { msg, deletedCount } = await deleteComing(deleteId.value);
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
	const rows = refEpTable.value.getSelectedItems();
	console.log("Coming:doPatchDelete", rows);
	refEpDialog.value.setDialogVisible(false);

	Promise.all(
		/* 将选中的【电影数组】映射为【执行删除的Promise数组】 */
		rows.map(row => deleteComing(row._id))
	)
		.then(results => {
			ElMessage({
				message: "批量删除成功",
				type: "success",
			});

			// 依然应该使用数据驱动视图 这里做了简单处理
			window.location.reload();
		})
		.catch(err => {
			ElMessage({
				message: err,
				type: "error",
			});
		});
};

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
</script>

<style lang="scss" scoped>
.wrapper {
	width: calc(1000px - 1rem * 2);
	// height: 800px;
	// overflow: scroll;
}
</style>
