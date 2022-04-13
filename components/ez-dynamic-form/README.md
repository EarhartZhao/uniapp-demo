## uniapp-动态表单
#### 此组件为动态表单，基于uview@2.0.29，实现快速生成表单。

### 字段说明

|类型|字段|注解|
|:-|:-|:-|
|Array|formJson|生成表单配置数据 若需要异步动态配置多个dataArr，建议全部获取之后再赋值 formJson ，并调用 initializeForm 方法|
|Object|formData|表单数据值，用来展示默认数据，如果不需要默认展示可不传 *注意：若使用 initializeForm 方法，该变量赋值需要再 initializeForm 后执行|
|Boolean|disabled|用来控制当前表单状态，true 为展示状态，false 为编辑状态|
|String|height|表单高度|
|Number|labelWidth|表单label的宽度|
|String|errorType|错误类型，可选值：message border-bottom none|
|Function|submit|提交验证表单，返回promise，通过refs调用 Vue.refs['组件ref'].submit()|
|Function|asyncSetFormJsonDataArr|动态添加selete类型等的数据 Vue.$refs['组件ref'].asyncSetFormJsonDataArr(key,arr) key:目标key arr:设置的数组，select类型需要注意是二维数组|
|Function|initializeForm|初始化方法,小程序中不要将该方法放于 onShow 生命周期内|
|Function|returnFormData|直接获取组件内部 form 数据|

### formJson 字段配置说明

|类型|字段|注解|
|:-|:-|:-|
|String|title|formItem 的 title 字段|
|String|key|控件的 key 字段, 每个组件作用域必须唯一||
|String|type|控件类型 可选: input, textarea, radio, checkbox, select, dynamicInput, datetimerange, time, date, datetime, timerang|
|String|placeholder|控件 placeholder 字段|
|--|--|无需配置，直接在父级使用。显示在表单最右侧，从索引0开始计算 eg:<view slot="slot-0">btn</view>|
|Object|inputOptions|类型 input 的补充字段，更多配置需要自定义，并参见uview文档|
|String|inputOptions.type|input 的 type 字段|
|Object|textareaOptions|类型 textarea 的补充字段，更多配置需要自定义，并参见uview文档|
|Number|textareaOptions.maxlength|textarea 的 maxlength 字段|
|Object|commonOptions|每个控件的公共补充字段|
|Array|commonOptions.dataArr|radio, checkbox, select 存放数据源字段，select 的数据源必须为二维数组，详情查看uview文档|
|String|commonOptions.key|dataArr 内对应的 key 字段|
|String|commonOptions.value|dataArr 内对应的 value 字段|
|String|commonOptions.showKey|selete,time, date, timerang 展示下拉框布尔值字段，每个组件作用域必须唯一|
|Boolean|commonOptions.viewBreak|换行|
|Boolean|commonOptions.readOnly|只读|
|Object|datetimeOptions|类型 date 和 time 的补充字段，更多配置需要自定义，并参见uview文档|
|Number|datetimeOptions.maxDate|date 最大日期(时间戳)|
|Number|datetimeOptions.minDate|date 最小日期(时间戳)|
|Number|datetimeOptions.maxHour|time 最大小时|
|Number|datetimeOptions.minHour|time 最小小时|
|Number|datetimeOptions.maxMinute|time 最大分钟|
|Number|datetimeOptions.minMinute|time 最小分钟|
|Object|uploadOptions|类型 upload 的补充字段，更多配置需要自定义，并参见uview文档|
|Boolean|uploadOptions.multiple|是否开启图片多选|
|Number|uploadOptions.maxCount|最大选择图片的数量|
|String|uploadOptions.accept|接受的文件类型|
|Object|rule|表单验证数据，必须存在字段，数据为空表示不进行验证，暂不支持嵌套函数等复杂验证|

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

> 需要在根目录的 uni.scss 文件内引入[dynamicForm.scss](https://github.com/EarhartZhao/uniapp-demo/blob/main/assets/styles/global/dynamicForm.scss)  

### 其他

> 范围日期时间组件使用的是 uniapp 的 uni-datetime-picker 组件  
> 时间范围组件是基于 ez-time-range 组件  