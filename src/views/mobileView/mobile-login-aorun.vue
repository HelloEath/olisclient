<template>
  <div class="bg" v-show="isShowLogin">
    <el-button round @click="carOlisUsed" class="car-olis-user-btn">轿车用油查询</el-button>
    <el-dialog title="注册信息"
               :visible.sync="isShowLoginDialog"
    >
      <el-form
       style="margin: 0px auto;width: 90%"
        :model="rowData"
        :rules="rules"
        ref="rowData"
      >

        <el-form-item
          class="required"
          label="地区："
          prop="region.id"
          label-width="100px"
          style="margin-top: 20px"
        >
          <el-select v-model="rowData.region.id" filterable>
            <el-option v-for="item in regionListForMobile" :value="item.id" :label="item.regionName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="required"
          label="名称："
          label-width="100px"
          prop="deviceProxy"
        >
          <el-input
            v-model="rowData.deviceProxy"
            auto-complete="off"
            placeholder="请输入名称"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          class="required"
          label="联系电话："
          label-width="100px"
          prop="deviceProxyNumber"
        >
          <el-input
            v-model="rowData.deviceProxyNumber"
            auto-complete="off"
            placeholder="请输入联系电话"
          >
          </el-input>
        </el-form-item>

        <div style="display: flex">
          <el-button
            style="margin: 0px auto"
            type="primary"
            @click="save"
            :loading="buttonLoading">提交
          </el-button>

        </div>
      </el-form>

    </el-dialog>

  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {

    name: "mobile-login",
    data() {
      const checkPhoneNumber = (rule, value, callback) => {
        if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
          callback(new Error('手机号码不符合规范'))
        } else {
          callback()
        }

      }
      return {
        isShowLoginDialog: false,
        buttonLoading: false,
        isShowLogin:false,
        topImgUrl:"/static/images/t2_01.png",//移动端头图片,
        olisType:"澳润",
        rowData: {
          region: {
            id: ''
          },
          deviceProxy: '',
          deviceProxyNumber: '',
          systemType: 'aorun',
          deviceType: '',
          deviceCode: ''
        },
        rules: {
          "region.id": [{
            required: true,
            message: '请选择地区名称',
            trigger: 'blur'
          },

          ],

          deviceProxy: [
            {
              required: true,
              message: '请输入名称',
              trigger: ''
            }
          ],
          deviceProxyNumber: [
            {
              required: true,
              message: '请输入联系电话',
              trigger: 'blur'
            },
            {
              validator: checkPhoneNumber,
              trigger: 'blur'

            }
          ]

        },

      }
    },
    created() {
      this.initData();

    },
    computed: {
      ...mapGetters([
        'saeListForMobile', 'regionListForMobile'
      ])
    },
    methods: {
      ...mapActions([
        'savedeviceDetailByMobile', 'getAllRegionsForMobile', 'deviceValidate'
      ]),
      getDeviceValidate() {
        this.deviceValidate(this.rowData).then(res => {
          if (res.data == '-1') {
            this.carOlisUsed();
            this.isShowLogin=true;
            console.log("不存在该设备")
          } else if (res.data=='1') {
            localStorage.setItem('mobileLoginUrl', window.location.href)
            this.$router.push({name: 'mobileBrandList'})
          }else if (res.data=='0') {
            console.log("设备未授权");
            this.isShowLogin=true;
            this.$message.error('设备未授权');

          }
        })
      },
      initData() {
        localStorage.setItem("topImgUrl",this.topImgUrl);
        localStorage.setItem("olisType",this.olisType);

        this.$store.state.isShowStep = false;
        this.getMacAddress();
        this.getDeviceValidate();
        this.getAllRegionsForMobile();
      },
      carOlisUsed() {
        this.isShowLoginDialog = true;
      },
      //获取设备的唯一标识号
      getMacAddress() {
        try {
            //调用java代码获取max地址
            let macAddress = window.t.getMacAddress();
            console.log("macAddress======="+macAddress)
            this.rowData.deviceType='02';
            this.rowData.deviceCode = macAddress;
            //保存设备id在本地，用于鉴权
            localStorage.setItem("deviceId",macAddress);
            localStorage.setItem("systemType",this.rowData.systemType);
          localStorage.setItem("deviceType","android");

        }catch (e) {
          localStorage.setItem("deviceType","pc");
          console.log("java代码调用失败")
        }

      },
      getBrowserInfo() {
        var agent = navigator.userAgent.toLowerCase();
        console.log(agent);
        var arr = [];
        var system = agent.split(' ')[1].split(' ')[0].split('(')[1];
        arr.push(system);
        var regStr_edge = /edge\/[\d.]+/gi;
        var regStr_ie = /trident\/[\d.]+/gi;
        var regStr_ff = /firefox\/[\d.]+/gi;
        var regStr_chrome = /chrome\/[\d.]+/gi;
        var regStr_saf = /safari\/[\d.]+/gi;
        var regStr_opera = /opr\/[\d.]+/gi;
        //IE
        if (agent.indexOf("trident") > 0) {
          arr.push(agent.match(regStr_ie)[0].split('/')[0]);
          arr.push(agent.match(regStr_ie)[0].split('/')[1]);
          return arr;
        }
        //Edge
        if (agent.indexOf('edge') > 0) {
          arr.push(agent.match(regStr_edge)[0].split('/')[0]);
          arr.push(agent.match(regStr_edge)[0].split('/')[1]);
          return arr;
        }
        //firefox
        if (agent.indexOf("firefox") > 0) {
          arr.push(agent.match(regStr_ff)[0].split('/')[0]);
          arr.push(agent.match(regStr_ff)[0].split('/')[1]);
          return arr;
        }
        //Opera
        if (agent.indexOf("opr") > 0) {
          arr.push(agent.match(regStr_opera)[0].split('/')[0]);
          arr.push(agent.match(regStr_opera)[0].split('/')[1]);
          return arr;
        }
        //Safari
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
          arr.push(agent.match(regStr_saf)[0].split('/')[0]);
          arr.push(agent.match(regStr_saf)[0].split('/')[1]);
          return arr;
        }
        //Chrome
        if (agent.indexOf("chrome") > 0) {
          arr.push(agent.match(regStr_chrome)[0].split('/')[0]);
          arr.push(agent.match(regStr_chrome)[0].split('/')[1]);
          return arr;
        } else {
          arr.push('请更换主流浏览器，例如chrome,firefox,opera,safari,IE,Edge!')
          return arr;
        }
      },

      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.savedeviceDetailByMobile(this.rowData).then(res => {
              if (res.code == 0) {
                this.buttonLoading = false;
                this.$message.success('信息保存成功');
                this.isShowLoginDialog = false;

              }
            })

          } else {
            this.$message.warning('提交失败，请确认修改信息是否有错漏！');
            this.buttonLoading = false;
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">

  .bg {
    width: 100%;
    height: 104.5%;
    background-image: url(../../assets/mobile/images/pic123.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    .car-olis-user-btn {
      font-size: 30px;
      font-weight: bold;
      width: 260px;
      height: 74px;
      position: fixed;
      right: 60px;
      top: 28%;
    }
  }

</style>
