<template>
  <div class="bg" v-show="isShowLogin">
    <el-button @click="flash" class="flash-btn"><i class="el-icon-refresh"></i></el-button>

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
        isShowLogin: false,
        topImgUrl: "http://47.110.243.203:8102/olisserver/appconfig/20200423/t2_01.png",//移动端头图片,
        olisType: "",
        rowData: {
          region: {
            id: ''
          },
          deviceProxy: '',
          deviceProxyNumber: '',
          systemType: 'ttt',
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
          if (res.data.code == '0') {
            localStorage.setItem('mobileLoginUrl', window.location.href)
            localStorage.setItem('token', res.data.data)
            this.$router.push({name: 'mobileBrandList'})
          } else if (res.data.code == '1') {
            console.log("设备未授权");
            this.isShowLogin = true;
            this.$message.error('设备未授权');
            localStorage.setItem('token', res.data.data)
          } else {
            this.carOlisUsed();
            this.isShowLogin = true;
            console.log("不存在该设备")
          }
        })
      },
      flash() {
        this.getDeviceValidate();
      },

      initData() {
        localStorage.setItem("topImgUrl", this.topImgUrl);
        localStorage.setItem("olisType", this.olisType);
        //localStorage.removeItem("token");
        this.$store.state.isShowStep = false;
        localStorage.removeItem('token')

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
          this.rowData.deviceType = '02';
          this.rowData.deviceCode = macAddress;
          //保存设备id在本地，用于鉴权
          localStorage.setItem("deviceId", macAddress);
          localStorage.setItem("deviceType", "android");

        } catch (e) {
          console.log("java代码调用失败")
          this.getDeviceIP((ip) => {
            // 打印客户端ip
            console.log(ip);
            localStorage.setItem("deviceType", "pc");
            localStorage.setItem("deviceId", ip);
            this.rowData.deviceType = '01';
            this.rowData.deviceCode = ip;
          });
        }
        localStorage.setItem("systemType", this.rowData.systemType);


      },

      //获取当前浏览器设备ip
      getDeviceIP(onNewIP) {
        let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
        let pc = new MyPeerConnection({iceServers: []})
        let noop = function () {
        }
        let localIPs = {}
        let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g

        function iterateIP(ip) {
          if (!localIPs[ip]) onNewIP(ip)
          localIPs[ip] = true
        }

        pc.createDataChannel('')
        pc.createOffer().then(function (sdp) {
          sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return
            line.match(ipRegex).forEach(iterateIP)
          })
          pc.setLocalDescription(sdp, noop, noop)
        }).catch(function (reason) {
          // An error occurred, so handle the failure to connect
        })
        // seen for candidate events
        pc.onicecandidate = function (ice) {
          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return
          ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
        }

      },

      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.savedeviceDetailByMobile(this.rowData).then(res => {
              if (res.code == 0) {
                this.$message.success('信息保存成功');
                this.isShowLoginDialog = false;
                localStorage.setItem('token', res.data)
              }
              if (res.code == 2) {
                this.$message.error('信息保存失败');
              }
              this.buttonLoading = false;
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
    background-image: url(../../assets/mobile/images/a4a9b06dd3c93b08792b064aa4a4db2b.jpg);
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
    .flash-btn {
      border-radius: 60px 60px;
      font-size: 30px;
      width: 72px;
      height: 72px;
      position: fixed;
      right: 60px;
      top: 80%;
    }
  }

  .page-component__scroll {
    //height: 100%;
  }

  .page-component__scroll .el-scrollbar__wrap {
    overflow-x: auto;
  }

</style>
