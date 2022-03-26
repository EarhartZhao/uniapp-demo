## uniapp-动态表单
#### 此组件为动态表单，基于uview@2.0.29，实现快速生成表单。

### 字段说明

|类型|字段|注解|
|:-|:-|:-|
|Array|formJson|生成表单配置数据|
|Object|formData|表单数据值，用来展示默认数据，如果不需要默认展示可不传|
|Boolean|disabled|用来控制当前表单状态，true 为展示状态，false 为编辑状态|
|String|height|表单高度|
|Number|labelWidth|表单label的宽度|
|String|errorType|错误类型，可选值：message border-bottom none|
|Function|submit|提交验证表单，返回promise，通过refs调用 Vue.refs['组件ref'].submit()|
|Function|asyncSetFormJsonDataArr|动态添加selete类型等的数据 Vue.$refs['组件ref'].asyncSetFormJsonDataArr(key,arr) key:目标key arr:设置的数组，select类型需要注意是二维数组|
|Function|initializeForm|初始化方法|

### formJson 字段配置说明

|类型|字段|注解|
|:-|:-|:-|
|String|title|formItem 的 title 字段|
|String|key|控件的 key 字段, 每个组件作用域必须唯一||
|String|type|控件类型 可选: input, textarea, radio, checkbox, select, dynamicInput, datetimerange, time, date, datetime, timerang|
|String|placeholder|控件 placeholder 字段|
|Object|itemObj|每个控件的补充字段|
|String|itemObj.type|input 的 type 字段|
|Number|itemObj.maxlength|textarea 的 maxlength 字段|
|Array|itemObj.dataArr|radio, checkbox, select 存放数据源字段，select 的数据源必须为二维数组，详情查看uview文档|
|String|itemObj.key|dataArr内对应的 key 字段|
|String|itemObj.value|dataArr内对应的 value 字段|
|String|itemObj.showKey|selete,time, date, timerang 展示下拉框布尔值字段，每个组件作用域必须唯一|
|Number|itemObj.maxDate|date 最大日期(时间戳)|
|Number|itemObj.minDate|date 最小日期(时间戳)|
|Number|itemObj.maxHour|time 最大小时|
|Number|itemObj.minHour|time 最小小时|
|Number|itemObj.maxMinute|time 最大分钟|
|Number|itemObj.minMinute|time 最小分钟|
|Object|rule|表单验证数据，必须存在字段，数据为空表示不进行验证|
|Boolean|viewBreak|换行|
|Boolean|readOnly|预留|

### 使用说明

```html
<template>
	<view>
    <dynamicForm
      :formJson="formJson"
      :disabled="disabled"
      :labelWidth="150"
      height="calc(100vh - 100rpx)"
      ref="dynamicForm"
    />
	</view>
</template>
<script>
export default {
  data() {
    return {
      formJson:[],
      disabled: true,
    };
  },
  methods: {
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
```

### 样式说明

> 需要在根目录的 uni.scss 文件内引入 dynamicForm.scss 

### 其他

> 范围日期时间组件使用的是 uniapp 的 uni-datetime-picker 组件  
> 时间范围组件是基于 ez-time-range 组件  