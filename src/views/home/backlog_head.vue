<template>
  <div class="backlog-head">
    <el-card class="page-head">
      <search-bar
        @reset="reset"
        @search="searchFilter"
        @toggle="changeToggleSearch"
      >
        <el-form
          slot="searchForm"
          :model="param"
          class="search-form"
          :class="showMore?'showMore':''"
          label-width="100px"
          label-position="right"
          size="small"
        >
          <el-col :span="8">
            <el-form-item label="活动名称">
              <el-input
                clearable
                placeholder="输入活动名称搜索"
                v-model="param.name"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="投放渠道">
              <channel-name-select
                v-model="param.channel"
                placeholder="请选择渠道名称"
              >
              </channel-name-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="活动发起方">
              <department-select
                v-model="param.departmentId"
                placeholder="请选择需求部门"
              >
              </department-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="活动类型">
              <activity-type-select
                v-model="param.activityType"
                placeholder="请选择活动类型"
              >
              </activity-type-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="发送开始">
              <el-date-picker
                v-model="startDate"
                type="daterange"
                format="yyyyMMdd"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy/MM/dd HH:mm:ss"
                @change="searchByDate(startDate,'startDate')"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="发送结束">
              <el-date-picker
                v-model="endDate"
                type="daterange"
                format="yyyyMMdd"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy/MM/dd HH:mm:ss"
                @change="searchByDate(endDate,'endDate')"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="backlog.activeTab === 'first'?'发起日期':'提交日期'">
              <el-date-picker
                v-model="createTime"
                type="daterange"
                format="yyyyMMdd"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy/MM/dd HH:mm:ss"
                @change="searchByDate(createTime,'createTime')"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col
            :span="8"
            v-show="backlog.activeTab === 'second'"
          >
            <el-form-item label="审批状态">
              <el-select
                clearable
                v-model="param.status"
                placeholder="请选择审批状态"
              >
                <!-- <el-option label="审批中" value="0"></el-option> -->
                <el-option
                  label="已审批"
                  value="1"
                >
                </el-option>
                <el-option
                  label="已驳回"
                  value="2"
                >
                </el-option>
                <!-- <el-option label="延期申请审批中" value="3"></el-option>
                  <el-option label="延期申请已审批" value="4"></el-option>
                  <el-option label="延期申请已驳回" value="5"></el-option>
                  <el-option label="结束申请审批中" value="6"></el-option>
                  <el-option label="结束申请已审批" value="7"></el-option>
                  <el-option label="结束申请已驳回" value="8"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </search-bar>
    </el-card>
  </div>
</template>

<script>
import {
  mapActions
} from "vuex";
import util from "@/common/utils.js";
import {
  setStore,
  getStore,
  removeStore
} from "@/common/utils.js";
import {
  doDataPeople
} from "@/setting/enumerate/enumerate";
import searchBar from "@/components/searchBar";
import departmentSelect from "@/components/department_select";
import channelNameSelect from "@/components/channel_name_select.vue";
import activityTypeSelect from "@/components/activity_type_select.vue";

export default {
  name: "backlog-head",

  inject: ["backlog"],

  components: {
    searchBar,
    departmentSelect,
    channelNameSelect,
    activityTypeSelect,
  },

  data() {
    return {
      createTime: "",
      startDate: "",
      endDate: "",
      showMore: false,
      param: {}
    }
  },

  created() {
    let searchData = getStore("outParams") ? JSON.parse(getStore("outParams")) : "";
    if (searchData) {
      this.param = Object.assign({}, searchData)
      //console.log(this.param);
      if (this.param.createTimeStart && this.param.createTimeEnd) {
        this.createTime = [this.param.createTimeStart, this.param.createTimeEnd];
      }
      if (this.param.startDateStart && this.param.startDateEnd) {
        this.startDate = [this.param.startDateStart, this.param.startDateEnd];
      }
      if (this.param.endDateStart && this.param.endDateEnd) {
        this.endDate = [this.param.endDateStart, this.param.endDateEnd];
      }
    }
  },

  watch: {
    "backlog.activeTab": function (val) {
      this.reset();
    }
  },

  methods: {
    ...mapActions(["getToDo", "getDone"]),

    //时间类组件值改变时触发事件
    searchByDate(sentTime, dateType) {
      let start = "";
      let end = "";
      if (sentTime && sentTime.length) {
        start = sentTime[0];
        end = sentTime[1];
      }
      switch (dateType) {
        case "createTime":
          this.param.createTimeStart = start;
          this.param.createTimeEnd = end;
          break;
        case "startDate":
          this.param.startDateStart = start;
          this.param.startDateEnd = end;
          break;
        case "endDate":
          this.param.endDateStart = start;
          this.param.endDateEnd = end;
          break;
        default:
          break
      }
    },

    searchFilter() {
      //console.log(this.param);
      this.param.pageNo = 1;
      this.$emit("search-data", this.param);
    },

    changeToggleSearch(val) {
      this.showMore = val;
    },

    reset() {
      this.param = {};
      this.createTime = "";
      this.startDate = "";
      this.endDate = "";
    }
  }
}
</script>


<style lang="scss">
.backlog-head {
  margin-bottom: 20px;
}
</style>

