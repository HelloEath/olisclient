<template>
    <div>
        <el-dialog
            title="审批驳回备注"
            :visible.sync="visible"
            @close="$emit('update:show', false)"
            :show="show"
            class="rejectApproval"
            :modal-append-to-body="false">
            <div class="reject-box" v-if="approvalOpinion">
              <div class="reject-item">
                <label class="reject-label">审批意见：</label>
                <span class="reject-txt">{{approvalOpinion.content || "无"}}</span>
              </div>
              <div class="reject-item">
                <label class="reject-label">审批人：</label>
                <span class="reject-txt">{{approvalOpinion.userName || "无"}}</span>
              </div>
              <div class="reject-item">
                <label class="reject-label">审批附件：</label>
                <upload-attachments
                  :attachments="approvalOpinion.attachments"
                  :type="false">
                </upload-attachments>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialog">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import uploadAttachments from './../uploadAttachments/index.vue';
import dialogMixin from './../../mixins/dialog'
export default {
    components: { uploadAttachments },
    mixins: [dialogMixin],
    props: ['channelId', 'approvalOpinion']
};
</script>
<style lang="scss">
    .reject-box {
      .reject-item {
        font-size: 14px;
        color: #333;
        padding: 8px 0;
        .reject-label {
          width: 100px;
          float: left;
        }
        .reject-txt {
          font-weight: bold;
          line-height: 25px;
        }
      }
    }
</style>
