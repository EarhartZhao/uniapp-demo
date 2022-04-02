<template>
  <view class="dynamicForm" :style="{ height: height }">
    <u--form
      labelPosition="left"
      :errorType="errorType"
      :model="form"
      ref="formRef"
      :labelWidth="labelWidth"
    >
      <view
        v-for="(item, index) in formJson"
        :class="item.viewBreak ? 'viewBreak' : ''"
        :key="index"
      >
        <view class="bigTitle" v-if="item.bigTitle">{{ item.bigTitle }}</view>
        <u-form-item
          :label="item.title"
          :prop="[item.key]"
          :required="item.rule.required && !disabled"
          class="testclass"
          borderBottom
        >
          <!-- 输入框 -->
          <u--input
            v-if="item.type == 'input' && !disabled"
            :value="form[item.key]"
            :disabled="disabled"
            border="none"
            :placeholder="item.placeholder"
            :type="item.itemObj.type"
            inputAlign="right"
            @change="inputChange($event, item.key)"
            :clearable="false"
          ></u--input>
          <view v-if="item.type == 'input' && disabled" class="disabled-text">{{
            form[item.key]
          }}</view>

          <!-- 动态slot -->
          <view class="dynamic-slot" v-if="item.itemObj.slot">
            <view slot="right">
              <!-- #ifdef MP -->
              <slot name="{{item.itemObj.slot}}"> </slot>
              <!-- #endif -->

              <!-- #ifdef H5 || APP-PLUS  -->
              <!-- <slot :name="item.name"> -->
              <slot :name="item.itemObj.slot"></slot>
              <!-- #endif -->
            </view>
          </view>

          <!-- 多行输入框 -->
          <u--textarea
            v-if="item.type == 'textarea' && !disabled"
            :value="form[item.key] || ''"
            @input="inputChange($event, item.key)"
            :disabled="disabled"
            count
            :maxlength="item.itemObj.maxlength || 200"
            :placeholder="item.placeholder"
          ></u--textarea>
          <view
            v-if="item.type == 'textarea' && disabled"
            class="disabled-text"
            >{{ form[item.key] }}</view
          >

          <!-- 单选框 -->
          <u-radio-group
            :value="form[item.key]"
            @change="inputChange($event, item.key)"
            :disabled="disabled"
            v-if="item.type == 'radio' && !disabled"
            iconPlacement="right"
          >
            <u-radio
              :customStyle="{ marginRight: '16px' }"
              v-for="(ite, ind) in item.itemObj.dataArr"
              :key="ind"
              :label="ite[item.itemObj.key]"
              :name="ite[item.itemObj.value]"
            >
            </u-radio>
          </u-radio-group>
          <view v-if="item.type == 'radio' && disabled" class="disabled-text">{{
            byKeyFindVal(
              item.itemObj.value,
              form[item.key],
              item.itemObj.key,
              item.itemObj.dataArr
            ) || ""
          }}</view>

          <!-- 多选框 -->
          <u-checkbox-group
            :value="form[item.key]"
            @change="inputChange($event, item.key)"
            :disabled="disabled"
            v-if="item.type == 'checkbox' && !disabled"
            iconPlacement="right"
          >
            <u-checkbox
              v-for="(ite, ind) in item.itemObj.dataArr"
              :key="ind"
              :label="ite[item.itemObj.key]"
              :name="ite[item.itemObj.value]"
            >
            </u-checkbox>
          </u-checkbox-group>
          <view
            v-if="item.type == 'checkbox' && disabled"
            class="disabled-text"
            >{{
              arrayDisabledText(
                item.itemObj.value,
                form[item.key],
                item.itemObj.key,
                item.itemObj.dataArr
              ) || ""
            }}</view
          >

          <!-- 下拉框 -->
          <view
            class="select-box"
            :disabled="disabled"
            v-if="item.type == 'select'"
            @click="
              popShow[item.itemObj.showKey] = disabled ? false : true;
              hideKeyboard();
            "
          >
            <view>{{
              byKeyFindVal(
                item.itemObj.value,
                form[item.key],
                item.itemObj.key,
                item.itemObj.dataArr[0]
              ) || item.placeholder
            }}</view>
            <u-icon
              v-if="!disabled"
              name="arrow-right"
              color="#909193"
            ></u-icon>
          </view>
          <u-picker
            v-if="item.type == 'select'"
            :disabled="disabled"
            :show="popShow[item.itemObj.showKey]"
            :closeOnClickOverlay="true"
            @confirm="
              pickerConfirm($event, item.key, item.itemObj.value);
              popShow[item.itemObj.showKey] = false;
            "
            @cancel="popShow[item.itemObj.showKey] = false"
            :columns="item.itemObj.dataArr"
            :keyName="[item.itemObj.key]"
          ></u-picker>

          <!-- 动态输入框 -->
          <view class="dynamic" v-if="item.type == 'dynamicInput'">
            <view class="dynamic-left">
              <view
                class="dynamic-input"
                v-for="(ite, ind) in form[item.key]"
                :key="ind"
              >
                <u--input
                  :value="ite[item.itemObj.value]"
                  @change="
                    inputChange($event, item.key, ind, item.itemObj.value)
                  "
                  :disabled="disabled"
                  border="none"
                  :placeholder="item.placeholder"
                  :type="item.itemObj.type"
                  inputAlign="right"
                ></u--input>
                <u-icon
                  @click="deleteDynamic(item.key, ind)"
                  v-if="!disabled"
                  name="minus-circle-fill"
                  color="#e45656"
                  size="20"
                ></u-icon>
              </view>
            </view>
            <u-icon
              class="dynamic-right"
              v-if="!disabled"
              @click="addDynamic(item.key, item.itemObj.value)"
              name="plus-circle-fill"
              size="20"
              color="#19be6b"
            ></u-icon>
          </view>

          <!-- 范围日期时间 -->
          <uni-datetime-picker
            v-if="item.type == 'datetimerange' && !disabled"
            @change="inputChange($event, item.key)"
            :value="form[item.key]"
            type="datetimerange"
            :disabled="disabled"
            border="false"
            hide-second="true"
            rangeSeparator="至"
          />
          <view
            v-if="item.type == 'datetimerange' && disabled && !!form[item.key]"
            class="disabled-text"
            >{{ form[item.key][0] + " 至 " + form[item.key][0] }}</view
          >

          <!-- 日期时间 -->

          <uni-datetime-picker
            v-if="item.type == 'datetime' && !disabled"
            :type="item.type"
            :value="form[item.key]"
            start="1900-1-01"
            end="2040-12-31"
            @change="inputChange($event, item.key)"
          />
          <view
            v-if="item.type == 'datetime' && disabled"
            class="disabled-text"
            >{{ form[item.key] }}</view
          >

          <!-- 日期 -->
          <view
            class="select-box"
            :disabled="disabled"
            v-if="item.type == 'date' || item.type == 'time'"
            @click="
              popShow[item.itemObj.showKey] = disabled ? false : true;
              hideKeyboard();
            "
          >
            <view>{{ form[item.key] }}</view>
            <u-icon
              v-if="!disabled"
              name="arrow-right"
              color="#909193"
            ></u-icon>
          </view>

          <u-datetime-picker
            v-if="(item.type == 'date' || item.type == 'time') && !disabled"
            :show="popShow[item.itemObj.showKey]"
            :value="form[item.key]"
            :minDate="item.itemObj.minDate || -631152000000"
            :maxDate="item.itemObj.maxDate || 1893456000000"
            :maxHour="item.itemObj.maxHour || 23"
            :minHour="item.itemObj.minHour || 0"
            :maxMinute="item.itemObj.maxMinute || 59"
            :minMinute="item.itemObj.minMinute || 0"
            :closeOnClickOverlay="true"
            @confirm="
              uPickerConfirm($event, item.key, item.itemObj.value);
              popShow[item.itemObj.showKey] = false;
            "
            @cancel="popShow[item.itemObj.showKey] = false"
            :mode="item.type"
          ></u-datetime-picker>

          <!-- 时间范围 -->
          <view
            class="select-box"
            :disabled="disabled"
            v-if="item.type == 'timerang'"
            @click="
              popShow[item.itemObj.showKey] = disabled ? false : true;
              hideKeyboard();
            "
          >
            <view>{{ filterTimerang(form[item.key]) }}</view>
            <u-icon
              v-if="!disabled"
              name="arrow-right"
              color="#909193"
            ></u-icon>
          </view>

          <ez-time-range
            v-if="item.type == 'timerang' && !disabled"
            :value="form[item.key]"
            @confrim="
              uPickerConfirm($event, item.key, item.itemObj.value);
              popShow[item.itemObj.showKey] = false;
            "
            @cancel="popShow[item.itemObj.showKey] = false"
            :show="popShow[item.itemObj.showKey]"
          ></ez-time-range>
        </u-form-item>
      </view>
    </u--form>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    formJson: {
      type: Array,
      default: [],
    },
    formData: {
      type: Object,
      default: {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: "auto",
    },
    labelWidth: {
      type: Number,
      default: 90,
    },
    errorType: {
      type: String,
      default: "toast", // message, border-bottom, none
    },
  },
  data() {
    return {
      form: {},
      rules: {},
      popShow: {},
      validateList: [],
    };
  },
  watch: {
    formData: {
      handler(val) {
        if (JSON.stringify(val) != "{}")
          this.$data.form = JSON.parse(JSON.stringify(val));
      },
      deep: true,
      immediate: true,
    },
  },
  onReady() {
    // 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
    this.$refs.formRef.setRules(this.rules);
  },
  created() {
    this.initializeForm();
  },
  methods: {
    asyncSetFormJsonDataArr(key, arr) {
      const i = this.formJson.findIndex((ele) => ele.key == key);
      if (i == -1) return;
      this.$set(this.formJson[i].itemObj, "dataArr", arr);
      this.initializeForm();
    },
    filterTimerang(val) {
      if (Array.isArray(val) && val.length == 2) return val[0] + " - " + val[1];
      return "";
    },
    byKeyFindVal(key, sameKey, valueKey, arr) {
      if (!arr || arr.length === 0) return "";
      try {
        return arr.filter((ele) => ele[key] == sameKey)[0][valueKey];
      } catch (e) {
        return "";
      }
    },
    arrayDisabledText(vkey, val, key, arr) {
      let text = "";
      if (!val) return null;
      val.forEach((ele, i) => {
        text += this.byKeyFindVal(vkey, ele, key, arr) + ",";
      });
      return text.slice(0, -1);
    },
    inputChange(e, key, i, iKey) {
      if (iKey) {
        this.form[key][i][iKey] = e;
      } else {
        this.form[key] = e;
      }
    },
    addDynamic(formKey, key) {
      if (!this.form.hasOwnProperty(formKey)) this.$set(this.form, formKey, []);
      this.form[formKey].push({
        [key]: "",
      });
    },
    deleteDynamic(formKey, i) {
      this.form[formKey].splice(i, 1);
    },
    uPickerConfirm(e, key) {
      // console.log("uPickerConfirm", e, key);
      let val = e.value;
      if (e.mode == "time") val = val.replace("aN", "00");
      if (e.mode == "date") {
        const date = new Date(parseInt(val));
        val =
          date.getFullYear() +
          "-" +
          this.add0(date.getMonth() + 1) +
          "-" +
          this.add0(date.getDate());
      }
      this.$set(this.form, key, val);
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    pickerConfirm(e, key, valueKey) {
      this.$set(this.form, key, e.value[0][valueKey]);
    },
    initializeForm() {
      let rules = {},
        form = {},
        validateList = [];
      this.formJson.forEach((ele) => {
        if (JSON.stringify(ele.rule) != "{}") rules[ele.key] = ele.rule;
        validateList.push(ele.key);
        switch (ele.type) {
          case "dynamicInput":
            form[ele.key] = [];
            break;
          case "select":
            form[ele.key] = null;
            break;
          default:
            form[ele.key] = "";
            break;
        }
        const showType = ["select", "time", "date", "timerang"];
        if (showType.includes(ele.type)) {
          this.$set(this.popShow, ele.itemObj.showKey, false);
        }
      });
      this.$set(this, "rules", rules);
      this.$set(this, "form", form);
      this.$set(this, "validateList", validateList);
    },
    returnFormData(){
      return this.form;
    },
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs.formRef
          .validate()
          .then((res) => {
            resolve(this.form);
          })
          .catch((errors) => {
            console.log("校验失败", errors);
            // uni.$u.toast("校验失败");
          });
      });
    },
    // TODO 预留功能 暂未实现
    reset() {
      this.$refs.formRef.resetFields();
      this.$refs.formRef.clearValidate();
      setTimeout(() => {
        this.$refs.formRef.clearValidate(this.validateList);
        // 或者使用 this.$refs.form1.clearValidate()
      }, 10);
    },
    hideKeyboard() {
      uni.hideKeyboard();
    },
  },
};
</script>
