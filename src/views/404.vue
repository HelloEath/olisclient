<template>
  <div id="page-404">
        <div class="container">
            <section class="error-wrapper">
                  <!-- <i class="el-icon-picture"></i> -->
                  <h1>404</h1>
                  <h2>page not found</h2>
                  <p class="page-404">Something went wrong or that page doesn't exist yet. <router-link to="/home">Return Home</router-link></p>
              </section>
        </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../assets/css/common';
  #page-404 {
    background: #18d4cb;
    color: #fff;
    width:100%;
    height:100%;
    .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        .error-wrapper {
            text-align: center;
            padding-top: 10%;
            .el-icon-picture {
                display: inline-block;
                font-size:120px;
                margin-bottom:60px;
            }
            h1 {
                font-size: 90px;
                font-weight: 300;
                margin: -50px 0 0 0;
            }
            h2 {
                font-size: 20px;
                font-weight: 300;
                margin: 0 0 30px 0;
            }
            p.page-404 {
                color: #7dfff7;
            }
            p, p a {
                font-size: 18px;
                font-weight: 300;
            }
            p.page-404 a, p.page-500 a, p.page-404 a:hover, p.page-500 a:hover {
                color: #fff;
            }
        }
    }
  }

</style>
