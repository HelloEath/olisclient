import { mapGetters, mapActions } from 'vuex';
<template>
  <div class="calendar-event-book">
    <el-form
      ref="calendarEventBook"
      :labelWidth="labelWidth"
      :disabled="!editStatus"
    >
      <el-form-item
        class="event-trigger-type"
        :class="isRequired"
        label="事件触发类型："
      >
        <el-select
          v-model="calendarEventBook.eventType"
          size="small"
          @change="changeEventType"
        >
          <el-option
            v-for="(et, index) in eventTrigger"
            :key="index"
            :label="et.label"
            :value="et.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        class="event-trigger-date"
        :class="isRequired"
        label="触发日期："
      >
        <el-row
          type="flex"
          justify="space-between"
          align="center"
        >
          <el-col style="text-indent: 15px; color: #606266;">{{triggerDateTest}}</el-col>
          <el-col style="display: flex; flex-flow:row nowarp;">
            <el-select
              v-model="calendarEventBook.eventOper"
              size="small"
              @change="$emit('calendar-data')"
            >
              <el-option
                label="+"
                value="+"
              >
              </el-option>
              <el-option
                label="-"
                value="-"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="calendarEventBook.eventValue"
              size="small"
              @change="$emit('calendar-data')"
            >
              <el-option
                :label="0"
                :value="0"
                :key="0"
              >
              </el-option>
              <el-option
                v-for="num in 3"
                :label="num"
                :value="num"
                :key="num"
              >
              </el-option>
            </el-select>
            <span style="margin: 0 15px;">天</span>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- <el-form-item
        class="event-trigger-amount"
        label="触发金额："
        prop="triggerAmount"
      >
        <el-row>

        </el-row>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import calendarEventBook from '@/components/calendar_event_book/index';

export default {
  name: "calendar-event-book",

  inject: ["mainActivity"],

  props: {
    editStatus: {  //模板状态, true为编辑，false为只读
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: "200px"
    },
    eventData: {  //模板数据
      type: Object
    }
  },

  data() {
    return {
      triggerDateTest: "", //触发日期 - 文本
      calendarEventBook: {
        eventType: "",    //事件触发类型
        eventOper: "-",  //触发日期 - 运算符
        eventValue: 0,   //触发日期 - 天数
        //triggerAmount: ""   //触发金额
      }
    }
  },

  mounted() {
    if (!this.calendarEventBook.eventType) {
      this.eventTrigger.map(et => {
        if (et.label === "代发工资日") this.calendarEventBook.eventType = et.value;
      })
    }
    if (this.eventData.eventType) this.calendarEventBook.eventType = this.eventData.eventType;
    if (this.eventData.eventOper) this.calendarEventBook.eventOper = this.eventData.eventOper;
    if (this.eventData.eventValue) this.calendarEventBook.eventValue = this.eventData.eventValue;
    //console.log(this.eventData, this.calendarEventBook);
    this.changeEventType();
  },

  watch: {
    //客户类型更改时，数据初始化
    "mainActivity.ruleForm.marketingType"(val) {
      console.log(val);
      if (val !== "04") {
        this.eventTrigger.map(et => {
          if (et.label === "代发工资日") this.calendarEventBook.eventType = et.value;
        })
        this.triggerDate.map(item => {
          if (item.cascadeValue === this.calendarEventBook.eventType) this.triggerDateTest = item.value;
        })
        this.calendarEventBook.eventOper = "-";
        this.calendarEventBook.eventValue = 0;
      }
    },



    eventData(val) {
      console.log(val);
      if (val) {
        this.calendarEventBook.eventType = val.eventType;
        this.calendarEventBook.eventOper = val.eventOper;
        this.calendarEventBook.eventValue = val.eventValue;
        this.changeEventType();
      }
    }
  },

  computed: {
    ...mapGetters(["eventTrigger", "triggerDate"]),

    //是否显示红星
    isRequired() {
      return [
        {
          "required": this.editStatus
        }
      ]
    }
  },

  methods: {
    changeEventType(val) {
      //console.log(this.triggerDate);
      this.triggerDate.map(item => {
        if (item.cascadeValue === this.calendarEventBook.eventType) this.triggerDateTest = item.value;
      })
      this.$emit("calendar-data");
    }
  },
}
</script>

<style lang="scss">
.calendar-event-book {
  .required {
    .el-form-item__label {
      &::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
    }
  }
  .event-trigger-date {
    .el-row {
      width: 50%;
      background-color: #f5f7fa;
    }
  }
  .event-trigger-amount {
    .el-row {
      border: 1px solid #f5f7fa;
    }
  }
}
</style>