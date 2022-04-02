export default [
  {
    title: "输入框",
    type: "input",
    key: "input",
    inputOptions: {
      type: "text",
    },
    commonOptions: {
      slot: "btn"
    },
    placeholder: "请输入",
    rule: {
      type: "string",
      required: true,
      message: "input该字段必填",
      trigger: ["blur", "change"],
    },
  },
  {
    title: "多行输入框",
    type: "textarea",
    key: "textarea",
    textareaOptions: {
      maxlength: 130,
    },
    placeholder: "请输入",
    rule: {
      type: "string",
      required: true,
      message: "textarea该字段必填",
      trigger: ["blur", "change"],
    },
    commonOptions: {
      viewBreak: true
    }

  },
  {
    title: "单选框",
    type: "radio",
    key: "radio",
    commonOptions: {
      dataArr: [
        {
          key: "选项1",
          value: 0,
        },
        {
          key: "选项2",
          value: 1,
        },
        {
          key: "选项3",
          value: 2,
        },
      ],
      key: "key",
      value: "value",
      viewBreak: true
    },
    placeholder: "请选择",
    rule: {
      type: "number",
      required: true,
      message: "radio该字段必填",
      trigger: ["change"],
    }
  },
  {
    title: "多选框",
    type: "checkbox",
    key: "checkbox",
    commonOptions: {
      dataArr: [
        {
          key: "选项1",
          value: 0,
        },
        {
          key: "选项2",
          value: 1,
        },
        {
          key: "选项3",
          value: 2,
        },
        {
          key: "选项4",
          value: 3,
        },
      ],
      key: "key",
      value: "value",
      viewBreak: true
    },
    rule: {
      type: "array",
      required: true,
      message: "checkbox该字段必填",
      trigger: ["change"],
    },
  },
  {
    title: "下拉框",
    type: "select",
    key: "select",
    commonOptions: {
      dataArr: [[ // 必须加一维数组
        {
          key: "选项1",
          value: 0,
        },
        {
          key: "选项2",
          value: 1,
        },
        {
          key: "选项3",
          value: 2,
        },
        {
          key: "选项4",
          value: 2,
        },
      ]],
      key: "key",
      value: "value",
      showKey: 'selectShow'  // 该字段每个作用域必须唯一
    },
    placeholder: "请选择",
    rule: {
      type: "number",
      required: true,
      message: "select该字段必填",
      trigger: ["change"],
    },
  },
  {
    title: "动态输入框",
    type: "dynamicInput",
    key: "dynamicInput",
    commonOptions: {
      type: "text",
      key: "title",
      value: "title",
      viewBreak: true
    },
    placeholder: "请输入",
    rule: {},
  },
  {
    title: "日期时间范围",
    type: "datetimerange",
    key: "datetimerange",
    commonOptions: {
      viewBreak: true
    },
    placeholder: "请选择",
    rule: {
      type: "array",
      required: true,
      message: "dynamicInput该字段必填",
      trigger: ["change"],
    },
  },
  {
    title: "时间",
    type: "time",
    key: "time",
    commonOptions: {
      showKey: "timeShow",
    },
    placeholder: "请选择",
    rule: {
      type: "string",
      required: true,
      message: "time该字段必填",
      trigger: ["change"],
    },
  },
  {
    title: "日期",
    type: "date",
    key: "date",
    commonOptions: {
      showKey: "dateShow",
    },
    placeholder: "请选择",
    rule: {
      type: "string",
      required: true,
      message: "date该字段必填",
      trigger: ["change"],
    },
  },
  {
    title: "日期时间",
    type: "datetime",
    key: "datetime",
    placeholder: "请选择",
    rule: {
      type: "string",
      required: true,
      message: "datetime该字段必填",
      trigger: ["change"],
    },
  },
  {
    title: "时间范围",
    type: "timerang",
    key: "timerang",
    commonOptions: {
      showKey: "timerangShow",
    },
    placeholder: "请选择",
    rule: {
      type: "array",
      required: true,
      message: "timerang该字段必填",
      trigger: ["change"],
    },
  },
  {
    title: "上传",
    type: "upload",
    key: "upload",
    commonOptions: {
      showKey: "",
    },
    placeholder: "请选择",
    rule: {
      type: "array",
      required: true,
      message: "upload该字段必填",
      trigger: ["change"],
    },
  },
]