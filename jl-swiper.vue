<style lang="scss" scoped>
.jl-swiper-container {
  .jl-swiper {
    .slide {
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 800rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateX(0%);
      background-color: white;
      &.shadow {
        box-shadow: 10rpx 0 20rpx -10rpx rgba(0, 0, 0, 0.3);
      }
      &.prev {
        transform: translateX(0%);
      }
      &.next {
        transform: translateX(-100%);
      }
      &.tran {
        transition: transform 0.5s ease;
      }
    }
  }
  .actions {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
}
</style>
<template>
  <div class="jl-swiper-container">
    <div class="jl-swiper">
      <div
        class="slide"
        :key="index"
        v-for="(slide, index) in slides"
        @transitionend="transitionend(slide, $event)"
        :class="{
          tran: slide.tran,
          next: slide.next,
          prev: slide.prev,
          shadow: slide.shadow,
        }"
      >
        <h1>
          {{ current + 1 }} |
          {{ slide.data.content }}
        </h1>
      </div>
    </div>

    <div class="actions">
      <button @click="prev">Prev</button>
      <button @click="next">Next</button>
      <button @click="goto">Goto</button>
    </div>
  </div>
</template>

<script>
const indexes = {
  0: 2, // 2: 0, //
  1: 1, // 1: 1, //
  2: 0, // 0: 2, //
  3: 4, // 4: 3, //
  4: 3, // 3: 4, //
};

export default {
  name: "JlSwiper",
  data() {
    return {
      slide_action: "",
      slide_transition: false,
      slide_id: 2,
      slides: [
        {
          id: 0,
          next: false,
          prev: false,
          shadow: true,
          tran: false,
          data: {},
        },
        {
          id: 1,
          next: false,
          prev: false,
          shadow: true,
          tran: false,
          data: {},
        },
        {
          id: 2,
          next: false,
          prev: false,
          shadow: true,
          tran: false,
          data: {},
        },
        {
          id: 3,
          next: true,
          prev: false,
          shadow: true,
          tran: false,
          data: {},
        },
        {
          id: 4,
          next: true,
          prev: false,
          shadow: true,
          tran: false,
          data: {},
        },
      ],
      current: 0,
      items: [],
    };
  },
  watch: {
    items: {
      handler() {
        console.log("items [watch]");
        this.inject();
      },
    },
  },
  created() {
    let items = [];
    for (let i = 0; i < 5000; i++) {
      items.push({
        id: i,
        content: `第${i + 1}页${Math.random()}`,
      });
    }
    this.items = items;
  },
  methods: {
    inject() {
      this.slides.forEach((slide) => {
        slide.data =
          this.items[indexes[slide.id] + Math.floor(this.current / 5) * 5];
      });
    },
    transitionend(item, event) {
      if (this.slide_action == "next") {
        let last = this.slides.pop();
        this.slides.unshift({
          id: last.id,
          next: false,
          prev: true,
          shadow: false,
          tran: false,
          data: {},
        });
      } else if (this.slide_action == "prev") {
        let head = this.slides.shift();
        this.slides.push({
          id: head.id,
          next: true,
          prev: false,
          shadow: false,
          tran: false,
          data: {},
        });
      }
      this.$emit("change", this.current);
      this.reset();
    },
    reset() {
      this.slides.forEach((it) => {
        it.shadow = false;
        it.tran = false;
      });
      setTimeout(() => {
        this.slide_transition = false;
      }, 150);
    },
    goto() {
      let page = 200;
      this.current = page;
      this.slide_id = {
        2: 0, //
        1: 1, //
        0: 2, //
        4: 3, //
        3: 4, //
      }[page % 5];
      this.inject();
    },
    prev() {
      if (this.current - 1 < 0) {
        return;
      }
      if (this.slide_transition) {
        return;
      }
      this.slide_transition = true;
      this.slide_action = "prev";
      let slide = this.slides.find((it) => {
        if (this.slide_id == 4) {
          return it.id == 0;
        } else {
          return it.id == this.slide_id + 1;
        }
      });
      slide.prev = true;
      slide.next = false;
      slide.tran = true;
      slide.shadow = true;
      //
      this.slide_id++;
      if (this.slide_id > 4) {
        this.slide_id = 0;
      }
      this.current--;
      this.inject();
    },
    next() {
      if (this.current + 1 >= this.items.length) {
        return;
      }
      if (this.slide_transition) {
        return;
      }
      this.slide_transition = true;
      this.slide_action = "next";
      let slide = this.slides.find((it) => it.id == this.slide_id);
      slide.prev = false;
      slide.next = true;
      slide.tran = true;
      slide.shadow = true;
      //
      this.slide_id--;
      if (this.slide_id < 0) {
        this.slide_id = 4;
      }
      this.current++;
      this.inject();
    },
  },
};
</script>
