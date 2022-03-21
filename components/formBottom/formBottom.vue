<template>
  <view class="formBottom">
    <slot />
  </view>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.formBottom{
  @extend .flex-r-c, .border-box;
  height: 100rpx;
  background-color: #ffffff;
  border-top: 1rpx solid #e2e2e2;
  /deep/ button{
    width: 100rpx;
    margin: 0 20rpx 0 0;
  }
}
</style>
