<template>
  <el-row style="margin-bottom: 40px">
    <el-row style="background: #0072DC;">
      <el-col :span="16" :offset="6">
        <el-image :src="topImgUrl"></el-image>
      </el-col>
    </el-row>

    <el-row style="margin-top: 50px">
      <el-col :span="12" :offset="6">

        <div class="olis-desc"><h1>用户您好；您的爱车为：</h1></div>
        <div class="olis-desc"><h1>品牌：{{brand}}</h1></div>
        <div class="olis-desc"><h1>车型：{{carType1}}/{{carType2}}/{{carType3}}</h1></div>
        <div class="olis-desc"><h1>年限/发动机：{{year}}/{{engineType}}</h1></div>
        <div class="olis-desc"><h1>api：{{api}}</h1></div>
        <div class="olis-desc"><h1>{{this.company}}为您推荐的用油为：{{olis}}</h1></div>

      </el-col>
    </el-row>

    <el-row style="margin-top: 50px">
      <el-col :span="12" :offset="12">
        <el-button @click="toIndex" style="margin-left: -98px" type="warning">返回首页</el-button>

      </el-col>
    </el-row>

  </el-row>
</template>

<script>
  export default {
    name: "olis-desc",
    data() {
      return {
        company: "东营澳润公司",
        brand: "",
        carType1: "",
        carType2: "",
        carType3: "",
        year: "",
        engineType: "",
        api: "",
        olis: ""
      }
    },
    computed: {
      topImgUrl() {
        return localStorage.getItem("topImgUrl")
      },

    },
    created() {
      let engine = JSON.parse(this.$route.query.engine);
      this.brand = engine.brand.brandName;
      this.carType1 = engine.one.carTypeName;
      this.carType2 = engine.two.carTypeName;
      this.carType3 = engine.three.carTypeName;
      this.year = engine.year.keyYearWords;
      this.engineType = engine.engineType.engineTypeName;
      this.api = this.$route.query.api;
      this.olis = this.$route.query.olis;
    },
    methods: {
      toIndex() {
        this.$router.push({name: 'mobileBrandList'})

      }
    }
  }
</script>

<style scoped>
  .olis-desc {
    color: #016934;
    font-size: 1em;
    font-weight: bold;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
  }

</style>
