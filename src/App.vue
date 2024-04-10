<!--
 * @Author: lwk
 * @Date: 2024-01-17 10:20:09
 * @LastEditors: lwk
 * @LastEditTime: 2024-03-24 09:54:34
 * @Description: 请填写简介
-->
<script setup lang="ts">
import * as echarts from "echarts";
import "echarts-gl";
import { onMounted } from "vue";

onMounted(() => {
  var chartDom = document.getElementById("main");
  console.log(chartDom, "看到发生了");

  var myChart = echarts.init(chartDom);
  var option;

  option = {
    backgroundColor: "#000",
    globe: {
      baseTexture: "../public/earth.png",
      shading: "lambert",
      atmosphere: {
        show: true,
      },
      light: {
        ambient: {
          intensity: 1,
        },
        main: {
          intensity: 0,
        },
      },
    },
    // 标记点数据
    data: [
      { name: "北京", value: [116.46, 39.92] },
      { name: "上海", value: [121.48, 31.22] },
      // ... 添加更多标记点
    ],
    // 标记点样式
    itemStyle: {
      areaColor: "#ffde33",
      opacity: 1,
      borderWidth: 1,
      borderColor: "#ffde33",
    },
    series: [{
      type: 'scatter',
      coordinateSystem: 'globe',
      data: [
      { name: "北京", value: [116.46, 39.92] },
      { name: "上海", value: [121.48, 31.22] },
      // ... 添加更多标记点
    ],
    }]
  };


  option && myChart.setOption(option);
});
</script>

<template>
  <div id="main" ref="main"></div>
</template>

<style>
#main {
  /* position: absolute; */
  width: 500px;
  height: 500px;
}
</style>
