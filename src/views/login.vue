<template>
  <div class="login-view">
    <div class="login-view-container">
      <h1>“神算子”网络金融智能推荐平台</h1>
      <el-form label-position="left" ref="loginForm" :model="loginForm" :rules="rules" class="login-view-form" v-loading="loading">
        <div class="logo" style="height: 30px">
          <!--<img src="./../assets/images/logo.png" height="512" width="512">-->
        </div>
        <el-form-item prop="userName">
          <el-input
           v-model="loginForm.userName"
           placeholder="请输入账号"
           @keyup.enter.native="submitClick">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
          type="password"
          v-model="loginForm.password"
          @keyup.enter.native="submitClick"
          placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="18">
            <el-checkbox-group
            v-model="loginForm.remenberPassWord">
              <el-checkbox label="记住密码"></el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="6">
            <!--<a href="#">忘记密码？</a>-->
          </el-col>
        </el-row>

        <el-row type="flex" class="login-view-form-btn" justify="center">
          <el-button
          type="primary"
          @keyup.enter.native="submitClick"
          @click.native.prevent="submitClick"
          round>
          登录
          </el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import * as ajax from "../common/ajax"
  import {Message} from 'element-ui'

  /**
   *  登录界面模板
   **/
  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          userName: '',
          password: '',
          remenberPassWord: false,
        },
        rules: {
          userName: [
            {required: true, message: '账号不能为空', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
        loading: false,
      }
    },
    mounted() {
      if(localStorage.hasOwnProperty('login')){
        const login = JSON.parse(localStorage.getItem('login'));
        this.loginForm = login;
      }
    },
    methods: {
      submitClick: function () {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            var _this = this;
            this.loading = true;
            window.sessionStorage.clear();
            ajax.postRequest('login', {
              username: this.loginForm.userName,
              password: this.loginForm.password
            }).then(resp => {
              _this.loading = false;
              if (resp && resp.code == "0") {
                Message({
                  message: "登录成功",
                  type: 'success'
                })
                _this.$store.commit('login', resp.user);
                this.remenberPassWord();
                var path = _this.$route.query.redirect;
                _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
              }
            });
          } else {
            this.$message({
              type: 'warning',
              message: '登录信息有误，请重新填写'
            });
            return false;
          }
        });
      },
      //记住密码
      remenberPassWord () {
        if(this.loginForm.remenberPassWord){
          localStorage.setItem('login', JSON.stringify(this.loginForm))
        }else {
          localStorage.removeItem('login');
        }
      }
    }
  }
</script>

<style lang="scss">
.login-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #FFFFFF;
  background-image: url(../assets/images/loginbg.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  // background-color: rgb(16, 168, 238);
  input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }
  .login-view-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: -240px;
    width: 480px;
    border-radius: 10px;
    h1 {
      position: absolute;
      top: -80px;
      left: 50%;
      margin-left:-300px;
      width: 600px;
      font-size: 32px;
      text-align: center;
    }
    .login-view-form {
      margin: 0 50px;
      padding: 20px 50px;
      border-radius: 10px;
      background-color: #FFFFFF;
      .logo {
        img {
          display: block;
          width: 60px;
          height: 60px;
          margin: 0 auto;
          margin-bottom: 30px;
        }
      }
      .el-form-item {
        margin-bottom: 20px;
        &:nth-last-of-type(1) {
          margin-bottom: 10px;
        }
      }
      .el-row {
        margin-bottom: 20px;
        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
        .el-button {
          width: 80%;
        }
        a {
          display: block;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
