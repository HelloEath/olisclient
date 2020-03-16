<template>
  <el-row>
    <el-row style="background: #0072DC;">
      <el-col :span="16" :offset="6">
        <el-image :src="topImgUrl" ></el-image>
      </el-col>
    </el-row>
    <el-row style="background: #0072DC;">
      <el-col :span="12" :offset="6" style="display: flex;margin-top: -30px">
          <div style="margin: 0px auto;white-space:nowrap;overflow-x: auto">
            <div v-for=" one in oneList"  @click="changeCarType(one)" class="list-main bg" >
             {{one.carTypeName}}
            </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="padding: 20px;display: flex">
      <div style="margin: 0px auto">

        <div  v-for="two in twoList"  class="list-main  col-md-4 col-lg-4 col-sm-4" style="width: 400px;margin: 10px;background: #0072DC;">
          <div>
            <el-row>
              <el-col :span="24"><div style="margin: 10px">{{two.carTypeName}}</div></el-col>
            </el-row>
            <el-row >
              <div >
                <el-col :span="12" class="list-main"  v-for="three in two.threeLevelCarTypeList" style="padding: 10px;display: flex">
                  <div style="margin: 0px auto;width: auto">
                    <router-link :to="{name:'mobileYearDetails',query:{threeId:three.id,carTypeName:three.carTypeName}}">
                      <span style="color: #fff">  {{three.carTypeName}}</span>
                    </router-link>


                  </div>


                </el-col>

              </div>

            </el-row>
          </div>
        </div>

      </div>


    </el-row>

  </el-row>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import {server} from "../../common/ajax.js"

  export default {
        name: "car-type-detail",
      data(){
          return{
            editableTabsValue: '2',
            tabIndex: 2,
            carTypeForMobile:[],
            oneList:[],
            twoList:[],
            threeList:[],
          }
      },
    watch:{
      carTypeListForMobile(val){
        if (val&&val.length!=0){
          this.oneList=val;
          this.twoList=val[0].twoLevelCarTypeList;
        }


      }
    },
      computed: {
        topImgUrl(){
          return localStorage.getItem("topImgUrl")
        },
        ...mapGetters([
          'carTypeListForMobile'
        ])
      },
      created(){
        this.$store.state.isShowStep=true;
        console.log("品牌id="+this.$route.query.brandId);
          this.getAllCarTypeListForMobile(this.$route.query.brandId);
      },
      methods:{
        ...mapActions([
          "getAllCarTypeListForMobile",

        ]),
        changeCarType(oneObject) {
          this.twoList=oneObject.twoLevelCarTypeList;

        },
      }
    }
</script>

<style scoped lang="scss">
.list-main{
  color: #fff;
  float: left;
  font-size: 20px;
  font-weight: 500;

}
.bg{
  margin: 10px;
  cursor: pointer;
  float: left;
  padding: 10px;
  background-image: url(../../assets/mobile/images/04_07.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
</style>
