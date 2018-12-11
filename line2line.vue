<style lang="less">
.container {
  position: relative;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

<template>
  <view class="container">
    <canvas style="width: 750rpx; height: 1000rpx;" canvas-id="canvas-bg"></canvas>
    <canvas @touchstart="start" @touchmove="move" @touchend="end" style="width: 750rpx; height: 1000rpx;" canvas-id="canvas-front"></canvas>
  </view>
</template>

<script>
import wepy from 'wepy';

export default class Index extends wepy.page {
  data = {};

  downX = 0;
  downY = 0;
  startX = 20;
  startY = 20;
  // 模拟数据
  questions = [
    { text: '1+1', answer: 2 },
    { text: '2+1', answer: 3 },
    { text: '3+1', answer: 4 },
    { text: '4+1', answer: 5 }
  ];
  answers = [5, 3, 4, 2];
  //
  width = 100;
  height = 80;
  offsetH = 200;
  offsetV = 20;
  points = [];
  ctx = null;

  drawLines(x, y) {
    if (this.points.length > 0) {
      this.points.forEach(([x1, y1, x2, y2]) => {
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
      });
    }
    if (x && y) {
      this.ctx.moveTo(this.downX, this.downY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
    this.ctx.draw();
  }

  methods = {
    start(e) {
      let { x, y } = e.changedTouches[0];
      this.downX = x;
      this.downY = y;
    },
    move(e) {
      let { x, y } = e.changedTouches[0];
      this.drawLines(x, y);
    },
    end(e) {
      let { x, y } = e.changedTouches[0];
      let start = this.startBound();
      let end = this.endBound(x, y);
      console.log(start, end);
      // 起点和终点都落在框子里
      if (start != -1 && end != -1) {
        // 判断下是否匹配
        let { answer } = this.questions[start];
        if (answer == this.answers[end]) {
          this.points.push([this.downX, this.downY, x, y]);
        }
      }
      this.drawLines();
    }
  };

  endBound(x, y) {
    let offset = this.startY + this.height;
    for (let i = 0; i < 4; i++) {
      if (
        x >= this.startX + this.offsetH &&
        x <= this.startX + this.width + this.offsetH
      ) {
        if (
          y >= this.startY + offset * i &&
          y <= this.startY + this.height + offset * i
        ) {
          return i;
        }
      }
    }
    return -1;
  }

  startBound() {
    let offset = this.startY + this.height;
    for (let i = 0; i < 4; i++) {
      if (this.downX >= this.startX && this.downX <= this.startX + this.width) {
        if (
          this.downY >= this.startY + offset * i &&
          this.downY <= this.startY + this.height + offset * i
        ) {
          return i;
        }
      }
    }
    return -1;
  }

  drawBlocks() {
    let ctx = wx.createCanvasContext('canvas-bg');
    ctx.setFontSize(30);
    this.questions.forEach((question, index) => {
      let x = this.startX;
      let y = this.startY + this.height * index + this.offsetV * index;
      ctx.setFillStyle('#006699');
      ctx.fillRect(x, y, this.width, this.height);
      ctx.setFillStyle('#FFFFFF');
      ctx.fillText(question.text, x + 20, y + 30);
    });
    this.answers.forEach((answer, index) => {
      let x = this.startX + this.offsetH;
      let y = this.startY + this.height * index + this.offsetV * index;
      ctx.setFillStyle('#43CD80');
      ctx.fillRect(x, y, this.width, this.height);
      ctx.setFillStyle('#FFFFFF');
      ctx.fillText(answer, x + 20, y + 30);
    });
    ctx.draw();
  }

  onReady(e) {
    this.drawBlocks();
    this.ctx = wx.createCanvasContext('canvas-front');
  }
}
</script>
