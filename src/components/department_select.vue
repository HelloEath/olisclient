<template>
  <el-select 
		v-model="innerData" 
		clearable 
		:placeholder="placeholder ? placeholder : '请选择地区'"
		@change="change" 
		>
    <el-option 
			:label="item.regionName"
			:value="item.id" 
			v-for='(item, i) in allRegionsList'
			:key='i'>
		</el-option>
  </el-select>
</template>
<script>
  import {getStore} from './../common/utils'
  import { mapState, mapGetters, mapActions } from 'vuex'

  /**
   * 活动发起方下拉选择器,公共组件
   */
  export default {
    name: 'department-select',
    props: ["value", "isDisabled", "placeholder"],
    data () {
      return {
        innerData: this.value,
      }
    },

    watch: {
      value (val) {
        this.innerData = val
      },
      innerData (val) {
        this.$emit("input", val);
      }
    },
    computed: {
      ...mapGetters([
        'allRegionsList',
      ]),
    },
    created(){
      this.getAllRegions();
    },
    methods: {
      ...mapActions([
       'getAllRegions'
      ]),
      change(val){
        this.$emit("input", val);
        this.$emit("change",val);
      }
    }
  }
</script>
