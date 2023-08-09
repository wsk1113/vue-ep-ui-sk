<template>

	<!-- 页头 -->
	<MyPageHeader
		title="欢迎光临卖座电影管理后台"
		@action-btn-click="onActionBtnClick">
		<!-- 覆盖action按钮插槽默认内容 -->
		<template #action>
			<el-icon
				size="24"
				class="content-elem pointer"
				v-change="{ color: 'cyan' }"
				><SwitchButton
			/></el-icon>
		</template>
	</MyPageHeader>

	<main>

		<!-- 左侧菜单区 -->
		<div class="left">
			<EpMenu
				:menu="adminMenu"
				:activeIndex="currentMenuIndex"></EpMenu>
		</div>

		<!-- 右侧内容区 -->
		<div class="right">
			<router-view v-slot="{ Component }">
				<transition
					name="slide-fade"
					mode="out-in">
					<!-- <keep-alive :exclude="[`Detail`]"> -->
					<component :is="Component" />
					<!-- </keep-alive> -->
				</transition>
			</router-view>
		</div>

	</main>

</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView,useRoute } from "vue-router";

// import EpMenu from "@components/menu/EpMenu.vue"
import { EpMenu } from "@steveouyang/super-ep"

import {
	Grid,
	PictureFilled,
	Star,
	LocationFilled,
	Film,
	VideoCameraFilled,
	Histogram,
	PieChart,
	ArrowLeftBold,
	SwitchButton,
	User,
} from "@element-plus/icons-vue";

import MyPageHeader from "@components/MyPageHeader.vue";

import adminMenu from "@api/menu.json";

const route = useRoute();

const currentMenuIndex = computed(() => {
	const result = route.meta.menuIndex;
	console.log("route=", route);
	console.log("currentMenuIndex=", result);
	return result;
});

const handleOpen = (key, keyPath) => {
	console.log(key, keyPath);
};

const handleClose = (key, keyPath) => {
	console.log(key, keyPath);
};

const onActionBtnClick = payload => {
	console.log("onActionBtnClick", payload);
};
</script>

<style lang="scss" scoped>
@import "@assets/variable.scss";
@import "@assets/mixin.scss";

.tab {
	margin: 5px;
}

main {
	display: flex;
	height: calc(100vh - 60px);
	border-top: 1px solid $gray4;

	.left {
		width: 200px;
		padding-right: 1px;
		// background-color: red;
		border-right: 1px solid $graya;

		.el-menu-vertical-demo a {
			color: $menuActiveColor;
		}
	}

	.right {
		flex-grow: 1;
		// width: 800px;
		// max-width: 800px;
		// background-color: green;
		padding: 1rem;
		width: calc(1200px - 200px - 1rem * 2);
	}
}
</style>
