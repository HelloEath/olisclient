<template>
  <div class="activity-index-entry" id="activity-index-entry"  >
    <el-row type="flex"  justify="center">

      <el-col :span="6" >
        <div>
          <div style="width: 266px;margin: 0px auto  ">
            <img src="../../assets/images/home-xiaolian.png" height="80" width="80" style="margin: 10px auto;display: block;">
            <p class="text" style="font-size:20px">欢迎登录{{olisShowName}}润滑油管理后台</p>
          </div>

        </div>

      </el-col>
    </el-row>
   <!-- <svg class="icon user-icon" aria-hidden="true">
                 <use xlink:href="#icon-menu"></use>
              </svg>-->


  </div>
</template>
<script>
  import homeRowFirst from './home_row_first'
  import {mapGetters} from 'vuex'
  import { getStore, removeStore } from '../../common/utils.js'

  export default{
    name:'activityIndexEntry',
    components: {
      homeRowFirst,
    },
    provide(){
      return {
        "homeIndexEntryTab": this,
      }
    },
    data () {
      return{
        activeTab: 'first',
        olisShowName:''
      }
    },
    computed: {
      ...mapGetters(["loginUser"]),
      
      userType() { //判断用户角色类型
        return this.loginUser.userType || null
      }
    },
    created(){
      let olisFlag=JSON.parse(localStorage.getItem('olisFlag'));
      if (olisFlag){
        this.olisShowName=olisFlag.olisShowName;
      } else{
        //_this.$router.replace({path:''});

      }
    },
    mounted () {
/*      sessionStorage.tab? this.activeTab = 'second':this.activeTab = 'first';
      sessionStorage.removeItem('tab');*/
    },
    methods:{
      handleClick: function(tab, event) {
        //console.log(tab, event);
        removeStore('outParamsQuasi2');
        removeStore('outParamsQuasiIndex2');
      }
    }
  }
</script>
