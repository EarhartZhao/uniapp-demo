<template>
  <u-popup :show="show" @close="closeHandler">
    <view class="time-rang">
      <u-toolbar
        cancelText="取消"
        confirmText="确定"
        :title="title"
        @cancel="cancel"
        @confirm="confirm"
      ></u-toolbar>
      <picker-view
        class="time-rang-picker"
        :value="timerang"
        @change="() => {}"
        indicator-style="height:30px;"
      >
        <picker-view-column>
          <view
            class="time-rang-hours picker-column-block"
            v-for="(item, index) in hoursList"
            :key="index"
            >{{ item }}</view
          >
        </picker-view-column>
        <picker-view-column>
          <view
            class="time-rang-minutes picker-column-block"
            v-for="(item, index) in minutes"
            :key="index"
            >{{ item }}</view
          >
        </picker-view-column>
        <picker-view-column>
          <view class="picker-column-block">-</view>
        </picker-view-column>
        <picker-view-column>
          <view
            class="time-rang-hours picker-column-block"
            v-for="(item, index) in hoursList"
            :key="index"
            >{{ item }}</view
          >
        </picker-view-column>
        <picker-view-column>
          <view
            class="time-rang-minutes picker-column-block"
            v-for="(item, index) in minutes"
            :key="index"
            >{{ item }}</view
          >
        </picker-view-column>
      </picker-view>
    </view>
  </u-popup>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: [],
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val && val.length == 2) this.timerang = this.handleTime(val);
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      timerang: ["9", "00", "0", "18", "00"], //默认结束开始时间
      minutes: Array.from(Array(59), (v, k) => (k + "").padStart(2, "0")),
      hoursList: Array.from(Array(23), (v, k) => (k + "").padStart(2, "0")),
    };
  },
  methods: {
    handleTime(val) {
      return []
        .concat(val[0].split(":"))
        .concat(["0"])
        .concat(val[1].split(":"));
    },
    closeHandler() {
      this.$emit("close");
    },
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      let val = this.timerang;
      let timerang = [
        `${val[0].padStart(2, "0") + ":" + val[1].padStart(2, "0")}`,
        `${val[3].padStart(2, "0") + ":" + val[4].padStart(2, "0")}`,
      ];
      this.$emit("confrim", { value: timerang });
    },
  },
};
</script>
<style lang="scss" scoped>
.time-rang {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  color: #000;
  height: 450rpx;

  .time-rang-picker {
    width: 100%;
    height: 300rpx;
  }
  .time-rang-hours {
    font-size: 30rpx;
    font-weight: bold;
    color: #000;
  }
  .time-rang-minutes {
    font-size: 30rpx;
    font-weight: bold;
    color: #000;
  }
  .picker-column-block {
    line-height: 30px;
    text-align: center;
  }
}
</style>
