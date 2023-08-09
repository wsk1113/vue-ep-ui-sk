<template>
  <div>
    <!-- <DynamicBarChart></DynamicBarChart> -->
    <!-- <DynamicLineChart></DynamicLineChart> -->

    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="statistics" shadow="always">
          <template #header>
            <h4 class="title">实时票房排行</h4>
          </template>
          <DynamicBarChart></DynamicBarChart>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover" class="statistics">
          <template #header>
            <h4 class="title">实时在线用户数</h4>
          </template>
          <DynamicLineChart></DynamicLineChart>
        </el-card>
      </el-col>
    </el-row>

    <div style="height:15px;"></div>

    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="always" class="statistics">
          <template #header>
            <h4 class="title">实时观影人数</h4>
          </template>
          <DynamicLineChart></DynamicLineChart>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover" class="statistics">
          <template #header>
            <h4 class="title">城市票房排行</h4>
          </template>
          <DynamicBarChart></DynamicBarChart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import DynamicBarChart from "@/components/dashboard/DynamicBarChart.vue";
import DynamicLineChart from "@/components/dashboard/DynamicLineChart.vue";
</script>

<style lang="scss" scoped>
.statistics {
  // height: 400px;
  .title {
    background-color: white;
    padding: 0;
  }
}
</style>
