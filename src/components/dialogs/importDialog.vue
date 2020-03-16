<template>
    <div>
        <el-dialog
            title="导入文本模板"
            :visible.sync="visible"
            @close="$emit('update:show', false)"
            :show="show"
            class="importDialog"
            :modal-append-to-body="false">
            <div class="importContent" v-loading="loading">
                <div class="import_txt">请下载导入模板，按模板字段录入数据并导入</div>
                <div class="import_box">
                    <div class="import_item" @click="downloadExcel">
                        <div class="import_img">excel</div>
                        <div class="import_txt">导入模板下载</div>
                    </div>
                    <div class="import_item">
                        <div class="import_img">
                            <el-upload
                              class="avatar-uploader"
                              action=""
                              accept=".xls,.xlsx"
                              :show-file-list="false"
                              :before-upload="beforeUpload">
                              <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="import_txt">导入模板上传</div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { server } from "../../common/ajax.js"
    import { mapActions } from 'vuex'
    import {filePost} from "./../../common/ajax.js"
    import dialogMixin from './../../mixins/dialog'
    export default {
        mixins: [dialogMixin],
        data () {
            return {
                fileName:'',
                uploadUrl:'',
                loading:false,
            };
        },
        created(){
          this.uploadUrl = server + 'resources/import-data';
        },
        methods:{
            ...mapActions(['getTextMaterial']),
            downloadExcel(){
                let url = server+'static/文本素材导入模板.xlsx';
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', '文本素材导入模板.xlsx')
                document.body.appendChild(link)
                link.click()
            },
            beforeUpload(file){
                this.loading = true;
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'xls'
                const extension2 = testmsg === 'xlsx'
                const isLt2M = file.size / 1024 / 1024 < 10
                if(!extension && !extension2) {
                    this.$message.warning('上传文件只能是 xls、xlsx格式!');
                    this.loading = false;
                    return;
                }
                let fd = new window.FormData();
                fd.append('file', file, file.name)
                filePost('resources/import-data',fd).then(res=>{
                    if(res.code==0){
                        this.getTextMaterial();
                        this.$message.success('上传成功！');
                        this.$emit('update:show', false)
                        this.loading = false
                    }else{
                        this.$message.error('上传失败');
                        this.loading = false
                    }
                })
                return false
            }
        }
    };
</script>
<style lang="scss">
.importDialog {
    .el-dialog__title {
        color:#333;
        position:relative;
        padding-left:32px;
    }
    .el-dialog__header{
        text-align: center;
    }
    .import_txt {
        font: 14px 'Arial Normal', 'Arial';
        color:#666;
        text-align:center;
    }
    .import_box {
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        .import_item {
            width:40%;
            .import_img {
                width:77px;
                height:56px;
                background:url(../../assets/images/u1827.png) no-repeat center center;
                background-size: 100% 100%;
                margin:20px auto;
                line-height:56px;
                text-align:center;
                cursor:pointer;
                position:relative;
                .avatar-uploader .el-upload {
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                  }
                  .avatar-uploader .el-upload:hover {
                    border-color: #1AA194;
                  }
                  .avatar-uploader-icon {
                    font-size: 14px;
                    color: #8c939d;
                    width: 77px;
                    height: 56px;
                    line-height: 56px;
                    text-align: center;
                  }
            }
        }
    }

}
</style>
