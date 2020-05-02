<template>
  <el-row>
    <el-row style="background: #0072DC;">
      <el-col :span="16" :offset="6">
        <el-image :src="topImgUrl"></el-image>
      </el-col>
    </el-row>

    <el-row style="background: #0072DC;">
      <el-col :span="12" :offset="6" style="display: flex;margin-top: -30px">
        <div class="list-main menu_bg">
          <span>API选择</span>

        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 50px">
      <el-col :span="12" :offset="6">
        <el-row :gutter="20">
          <el-col :span="6">
            <div
              style="min-height: 400px;background: #053572;font-size: 20px;display: flex;padding: 10px;border-radius: 20px">
              <span style="margin: 0px auto;color: #fff;">{{olisType}}润滑油</span>
            </div>
          </el-col>
          <el-col :span="18">
            <div style="background: #6098D3;display: flex;border-radius: 20px">
              <div style="margin: 0px auto;padding-bottom: 20px;padding: 0px 30px 20px;">
                <el-row>
                  <div style="display: flex;margin: 10px">
                    <div style="margin: 0px auto;font-size: 16px;color: #fff">截止目前已经有
                      <span
                        style="color: red">{{olisSaeles}}
                      </span>
                      瓶该等级油品被使用
                    </div>
                  </div>
                </el-row>
                <el-row>
                  <el-image :src="olisImgUrl" @click="toOlisDesc"></el-image>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>

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
        olisSaeles: '',
        olisImgUrl: '',
        engine: {},
        olis: {}
      }
    },
    computed: {
      topImgUrl() {
        return localStorage.getItem("topImgUrl")
      },
      olisType() {
        return localStorage.getItem("olisType")
      },
    },
    created() {
      this.$store.state.isShowStep = true;
      this.engine = this.$route.query.engine;
      let olis = JSON.parse(this.$route.query.olis);
      this.olis = olis;
      let imgMaterial = olis.imgMaterial;
      this.olisSaeles = imgMaterial.materialSales;
      this.olisImgUrl = server.substring(0, server.length - 1) + imgMaterial.uploadFile.path + "/" + imgMaterial.uploadFile.fileName;
    },
    methods: {
      toOlisDesc() {
        this.$router.push({
          name: 'mobileOlisDesc',
          query: {"engine": this.engine, "api": this.olis.apiName, "olis": this.olis.imgMaterial.materialName}
        })
      }
    }
  }
</script>

<style scoped>
  .menu_bg {
    cursor: pointer;
    float: left;
    padding: 10px;
    color: #fff;
    font-size: 20px;
    background-image: url(../../assets/mobile/images/03_06.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
</style>
