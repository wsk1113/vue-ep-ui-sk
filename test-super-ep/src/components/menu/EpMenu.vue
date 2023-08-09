<template>

	<el-menu
		:default-active="activeIndex"
		class="el-menu-vertical-demo"
		background-color="#3a4149"
		text-color="#fff"
		active-text-color="#99ffff"
		>

		<EpMenuUnit
			:menu="menu"
			parentIndex="" />

	</el-menu>

</template>

<script setup>
import EpMenuUnit from "./EpMenuUnit.vue"

const { activeIndex } = defineProps({
	activeIndex: String,
	menu: Array,
});

</script>

<style lang="scss" scoped></style>
