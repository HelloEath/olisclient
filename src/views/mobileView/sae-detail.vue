<template>
  <el-row style="margin-bottom: 40px">
    <el-row style="background: #0072DC;">
      <el-col :span="16" :offset="6">
        <el-image :src="topImgUrl"></el-image>
      </el-col>
    </el-row>

    <el-row style="background: #0072DC;">
      <el-col :span="12" :offset="6" style="display: flex;margin-top: -30px">
        <div class="list-main menu_bg">
          <span>请仔细阅读以下内容，这对保护您的发动机非常重要</span>

        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 50px">
      <el-col :span="12" :offset="6">
        <el-image :src="engineImgUrl"></el-image>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <div style="border-bottom: 2px solid black;width: 100%;margin:50px 0px 20px"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <div style="background: #0000FF;width: 100%;display: flex"><span style="margin: 5px auto;font-size: 20px;display: inline-block;color: #fff">以下是适合你的油品，请选择</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <div>
          <div v-for="item in olisList" style="margin: 10px">
            <div><span style="font-weight: bold;font-size: 20px;color: black">{{item.desc3 ? "."+item.desc3:''}}</span></div>
            <div style="font-size: 18px;margin-top: 10px;cursor: pointer">
              <div style="margin: 2px 4px;float: left"><img src="../../assets/mobile/images/befor.png"></img></div>
              <router-link :to="{name:'mobileOlisDetails',query:{imgMaterial:JSON.stringify(item.imgMaterial)}}">
                <span style="color: red;cursor: pointer"> {{item.apiName}}</span></router-link>
            </div>
            <div style="font-size: 18px;margin-top: 10px;"><span v-html="item.desc1"></span></div>
          </div>
        </div>
      </el-col>
    </el-row>

  </el-row>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import {server} from "../../common/ajax.js"

  export default {
    name: "olis-detail",
    data() {
      return {
        engineImgUrl: '',
        olisList: []
      }
    },
    computed: {
      topImgUrl(){
        return localStorage.getItem("topImgUrl")
      },
      ...mapGetters([
        'saeListForMobile',
      ])
    },
    watch: {
      saeListForMobile(val) {
      }
    },
    methods: {
      ...mapActions([
        "getSaeListForMobile",
      ]),
    },
    created() {
      this.$store.state.isShowStep = true;
      let engine = JSON.parse(this.$route.query.engine);
      let saeList = JSON.parse(this.$route.query.saeList);
      this.olisList=saeList;
      console.log(engine);
      let uploadFile = engine.imgMaterial.uploadFile;
      this.engineImgUrl = server.substring(0, server.length - 1) + uploadFile.path + "/" + uploadFile.fileName;
      //this.getSaeListForMobile({threeId: engine.three.id, engineTypeId: engine.engineType.id, yearId: engine.year.id})
    }

  }
</script>

<style scoped>
  .menu_bg{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    float: left;
    padding: 10px;
    background-image: url(../../assets/mobile/images/n2.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
</style>
