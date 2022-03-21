<template>
  <view>
    <view style="width:200rpx">
      <u-button
      type="primary"
      size="small"
      text="打开时间范围"
      @click="show = true"
    ></u-button>
    </view>
    <view>当前选中时间范围: {{chooseTimeRange}}</view>
    <ez-time-range
      :value="timeRange"
      @confrim="confrim"
      @cancel="show = false"
      :show="show"
    ></ez-time-range>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [],
      timeRange: ['9:10', '20:43'],
      chooseTimeRange:'',
      show: false,
    };
  },
  methods: {
    confrim(e){
      this.chooseTimeRange = e.value[0] + ' - ' + e.value[1]
      this.show = false;
    }
  },
};
</script>

<style lang="scss" scoped></style>
