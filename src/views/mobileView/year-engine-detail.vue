<template>
  <el-row>
    <el-row style="background: #0072DC;">
      <el-col :span="16" :offset="6">
        <el-image :src="topImgUrl" ></el-image>
      </el-col>
    </el-row>

    <el-row style="background: #0072DC;">
      <el-col :span="12" :offset="6" style="display: flex;margin-top: -30px">
        <div class="list-main menu_bg">
          <span>{{carTypeName}}</span>

        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 50px">
      <el-col :span="12" >
        <div style="background: #000066;width:45%;margin-right: 20px;float: right;min-height: 400px">
          <el-row><div class="year_title" ><span style="align-self:center;margin-left: 20px;font-size: 20px;color: black">年限</span></div></el-row>

            <el-row v-for=" item in mobileYearList" style="background-color: #FF9900;margin: 10px 0px;border-radius:20px;cursor: pointer;" >
              <div @click="getEngineType(item.id)">
                <el-col :span="24" class="list-main" style="display: flex" >
                  <div style="margin-left:20px;padding: 10px"  >
                    <span style="color: black">{{item.keyYearWords}}</span>
                  </div>
                </el-col>

              </div>

            </el-row>
        </div>

      </el-col>
      <el-col :span="12" >
        <div style="background: #000066;width: 45%;margin-left: 20px;float: left;min-height: 400px">
          <el-row><div class="year_title" ><span style="align-self:center;margin-left: 20px;font-size: 20px;color: black">排量/发动机</span></div></el-row>
          <el-row>
            <el-col :span="24" class="list-main">
              <div style="cursor: pointer;padding: 10px;background-color: #FF9900;margin: 10px 0px;border-radius:20px" v-for=" item in engineTypeList" @click="toSaeDetail(item.engine)" >
              <!--  <router-link :to="{name:'mobileSaeDetails',query:{engine:JSON.stringify(item.engine)}}">
                  <span style="color: #fff">{{item.engineType.engineTypeName}}</span> </router-link>-->

                  <span style="color: black;margin-left:20px;">{{item.engineType.engineTypeName}}</span></div>
            </el-col>
          </el-row>
        </div>
      </el-col>


    </el-row>
  </el-row>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
        name: "year-engine-detail",
    data(){
          return{
            carTypeName:'',
            threeId:'',
            engineTypeList:[],
          }
    },
      computed: {
        topImgUrl(){
          return localStorage.getItem("topImgUrl")
        },
        ...mapGetters([
          'mobileYearList','mobileEngineTypeList','saeListForMobile'
        ])
      },
      created(){
        this.$store.state.isShowStep=true;
        console.log("品牌id="+this.$route.query.threeId);
        this.carTypeName=this.$route.query.carTypeName;
        this.threeId=this.$route.query.threeId;
        this.getYearListForMobile(this.$route.query.threeId);
      },
    watch:{
      mobileEngineTypeList(val){
        this.engineTypeList=val;
      }
    },
      methods:{
        ...mapActions([
          "getYearListForMobile",'getEngineTypeListForMobile','getSaeListForMobile'

        ]),
        getEngineType(id){
          this.getEngineTypeListForMobile({id:id,threeId:this.threeId});
        },
        getOlisDetail(engineTypeId,threeId){

        },
        changeCarType(oneObject) {
          this.twoList=oneObject.twoLevelCarTypeList;

        },
        toSaeDetail(engine){
          this.getSaeListForMobile({threeId: engine.three.id, engineTypeId: engine.engineType.id, yearId: engine.year.id}).then(res=>{
            if(res.code === "0"){
              this.$router.push({name:'mobileSaeDetails',query:{"engine":JSON.stringify(engine),"saeList":JSON.stringify(res.data)}})

            };
            if(res.code === "1"){
              this.$message.error(res.data);
            };
            })
        }
      }
    }
</script>

<style scoped lang="scss">
  .list-main{
    color: #fff;
    float: left;
    font-size: 16px;
    font-weight: 500;
  }
  .menu_bg{
    cursor: pointer;
    float: left;
    padding: 10px;
    background-image: url(../../assets/mobile/images/03_06.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .year_title{
    cursor: pointer;
    display: flex;
    float: left;
    width: 100%;
    height: 70px;
    padding: 10px;
    background-image: url(../../assets/mobile/images/04_03.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
</style>
