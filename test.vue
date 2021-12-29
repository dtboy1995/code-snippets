<style lang="scss">
page {
  background-color: #f7f5f6;
}
</style>
<style lang="scss" scoped>
canvas {
  width: 750rpx;
  height: 310rpx;
}
.canvas-area {
  position: relative;
  .bg {
    top: 0;
    left: 0;
    position: absolute;
    width: 750rpx;
    height: 310rpx;
  }
}
.preview {
  width: 750rpx;
  height: 310rpx;
}
#canvas_out {
  width: 0rpx;
  height: 0rpx;
}
</style>
<template>
  <div class="container">
    <div class="canvas-area">
      <img class="bg" src="https://sinoocean.oss-cn-beijing.aliyuncs.com/static/get_coupon_top.png" alt="" />
      <canvas
        :disable-scroll="true"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        type="2d"
        id="canvas"
      ></canvas>
    </div>
    <button @click="changeMode">切换模式</button>
    <button @click="clearAll">清空画布</button>
    <button @click="compose">合成</button>

    <canvas :disable-scroll="true" type="2d" id="canvas_out"></canvas>
    <img class="preview" :src="preview" alt="" />
  </div>
</template>

<script>
import logger from "../utils/logger";
export default {
  data() {
    return {
      ctx: null,
      canvas: null,
      clear: false,
      lineWidth: 10,
      strokeStyle: "#409EFF",
      preview: "",
    };
  },
  onLoad() {
    uni
      .createSelectorQuery()
      .select("#canvas")
      .fields({ node: true, size: true })
      .exec((info) => {
        let [{ node, width, height }] = info;
        const canvas = node;
        const ctx = canvas.getContext("2d");
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        this.canvas = canvas;
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        this.ctx = ctx;
      });
  },
  methods: {
    touchstart(e) {
      let x = e.touches[0].x;
      let y = e.touches[0].y;
      if (this.clear) {
        this.ctx.clearRect(
          x - this.lineWidth / 2,
          y - this.lineWidth / 2,
          this.lineWidth,
          this.lineWidth
        );
      } else {
        this.ctx.moveTo(x, y);
      }
    },
    touchmove(e) {
      let x = e.touches[0].x;
      let y = e.touches[0].y;
      if (this.clear) {
        this.ctx.clearRect(
          x - this.lineWidth / 2,
          y - this.lineWidth / 2,
          this.lineWidth,
          this.lineWidth
        );
      } else {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.moveTo(x, y);
      }
    },
    touchend(e) {
      logger.error(e.touches[0]);
    },
    getImage(canvas, src) {
      return new Promise((resolve, reject) => {
        let img = canvas.createImage();
        img.src = src;
        img.onload = () => {
          resolve(img);
        };
        img.onerror = () => {
          reject(img);
        };
      });
    },
    compose() {
      uni
        .createSelectorQuery()
        .select("#canvas_out")
        .fields({ node: true, size: true })
        .exec(async (info) => {
          let [{ node, width, height }] = info;
          const canvas = node;
          const ctx = canvas.getContext("2d");
          let w = this.canvas.width;
          let h = this.canvas.height;
          canvas.width = w;
          canvas.height = h;
          let bg_img = await this.getImage(
            canvas,
            "https://sinoocean.oss-cn-beijing.aliyuncs.com/static/get_coupon_top.png"
          );
          let [err, temp] = await uni.canvasToTempFilePath({
            canvas: this.canvas,
          });
          if (!err) {
            let { tempFilePath } = temp;
            let img = await this.getImage(canvas, tempFilePath);
            ctx.drawImage(bg_img, 0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            let url = canvas.toDataURL();
            this.preview = url;
          }
        });
    },
    changeMode() {
      this.clear = !this.clear;
      this.ctx.beginPath();
    },
    clearAll() {
      this.ctx.beginPath();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  },
  computed: {},
};
</script>
