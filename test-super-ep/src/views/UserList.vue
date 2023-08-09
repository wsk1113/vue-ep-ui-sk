<template>
	<div class="wrapper">
		<h3 class="title">UserList</h3>
		<!-- 批量操作 -->
		<!-- <BtnGroup
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
		</BtnGroup> -->

		<!-- 表格+分页器 -->
		<EpTable
			:tableData="tableData"
			:page-size="10"
      :cols="cols"
			:fixedCol="{ prop: `username`, lable: `用户名` }"></EpTable>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUsers } from "@api/userApi";
import EpTable from "@components/EpTable.vue";

getUsers;

const tableData = ref([]);

onMounted(async () => {
	const users = await getUsers();
	console.log("users=", users);

	tableData.value = users;
});

const cols = [
  {
    prop:"username",
    label:"用户名",
    fixed:true,
    width:300,
  },
  {
    prop:"password",
    label:"密码",
    width:300,
  },
  {
    prop:"admin",
    label:"管理员",
    width:300,
  },
]
</script>

<style lang="scss" scoped></style>
