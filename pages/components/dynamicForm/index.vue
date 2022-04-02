<template>
  <view>
    <dynamicForm
      :formJson="formJson"
      :formData="mockData"
      :disabled="disabled"
      :labelWidth="150"
      height="calc(100vh - 100rpx)"
      ref="dynamicForm"
    >
    <view name="btn" @click="clickBtn">btn</view>
    </dynamicForm>
    <formBottom>
      <u-button
        v-if="!disabled"
        type="primary"
        size="small"
        text="保存"
        plain
        hairline
        @click="submit"
      ></u-button>
      <u-button
        v-else
        type="primary"
        size="small"
        text="编辑"
        @click="disabled = false"
      ></u-button>
    </formBottom>
  </view>
</template>

<script>
import formJson from "./formJson.js";
import mockData from "./mockData.js";
export default {
  name: "",
  data() {
    return {
      formJson,
      mockData:{},
      disabled: true,
    };
  },
  created(){
    setTimeout(() => {
      this.mockData = mockData;
      console.log('this.mockData', this.mockData)
    }, 3000);
  },
  methods: {
    clickBtn(){
      console.log('click slot btn')
    },
    submit() {
      this.$refs.dynamicForm.submit().then((r) => {
        console.log("formData", r);
        if (r) {
          //验证通过
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
