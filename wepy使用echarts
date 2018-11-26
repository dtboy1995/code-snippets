### 总体步骤
- 下载https://github.com/ecomfe/echarts-for-weixin
- data: { ec: {lazyLoad = true } } 
- 新建一个wpy组件

```vue
<template>
    <view class="chart">
        <ec-canvas id="ec-canvas-bar-id" canvas-id="ec-canvas-bar" ec="{{ ec }}" bind:init="initChart"></ec-canvas>
    </view>
</template>

<script>
import wepy from "wepy";
import echarts from "./echarts.js";

export default class Chart extends wepy.component {
  data = {
    ec: {
      lazyLoad: true
    }
  };

  _chart = null;

  methods = {
    initChart({ detail }) {
      let { canvas, width, height } = detail;
      let chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      this._chart = chart;
      return chart;
    }
  };

  option(opt) {
    this._chart.setOption(opt);
  }

  instance() {
    return this._chart;
  }

  onLoad() {}
}
</script>

<style lang='less'>
.chart {
  width: 750rpx;
  height: 600rpx;
  margin: 0 auto;
}
</style>
```
