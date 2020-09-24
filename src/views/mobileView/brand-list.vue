<template>
    <el-row>
      <el-backtop class='page-component__scroll'></el-backtop>
      <el-row style="background: #0072DC;">
        <el-col :span="16" :offset="6">
          <keep-alive> <el-image :src="topImgUrl"></el-image></keep-alive>
        </el-col>
      </el-row>

      <el-row style="padding: 0px 20px">
        <el-col >
          <el-row style="background-color: #6D6D6D;padding: 10px 20px;margin-left: 10px;border-radius: 0px 0px 20px 0px;display: inline-block"><span style="color: #fff;font-size: 18px">汽车品牌</span></el-row>

          <el-row>

            <el-col :span="24" v-for="(item,key) in allBrandListByMobile">
                <div>

                  <div style="width: 80px;height:80px;display: flex;font-size: 30px;font-weight: bold;float: left;margin:0px 10px;padding: 10px;border-bottom: 1px solid rgba(20,17,35,0.6);border-left: 1px solid rgba(20,17,35,0.6);border-radius: 0px 0px 0px 20px;">
                    <div style="align-self: center;margin: 0px auto">{{key}}</div>
                  </div>
                  <div v-for="item2 in item" style="margin-top: 30px;float: left;">
                    <router-link :to="{name:'mobileCarTypeDetails',query:{brandId:item2.id}}">

                      <el-image :src="imgUrlHead+item2.uploadFile.path+'/'+item2.uploadFile.fileName" style="width: 100px;height: 100px;margin-right: 10px"></el-image>

                    </router-link>

                  </div>
              </div>
            </el-col>
          </el-row>


        </el-col>

      </el-row>

    </el-row>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import {server} from "../../common/ajax.js"

  export default {
        name: "brand-list",
      data(){
          return{
            t:''

          }
      },

      computed: {
        topImgUrl(){
          return localStorage.getItem("topImgUrl")
        },
        ...mapGetters([
          'allBrandListByMobile'
        ])
      },
      methods:{
        ...mapActions([
          "getAllBrandListByMobile",

        ]),
      },
      created(){
        this.$store.state.isShowStep=true;
        this.getAllBrandListByMobile({systemType:'aorun'});
        this.imgUrlHead = server.substring(0,server.length-1);
      }
    }
</script>

<style scoped lang="scss">
  .page-component__scroll{
    //height: 100%;
  }
  .page-component__scroll .el-scrollbar__wrap {
    overflow-x: auto;
  }

</style>
