<template>
    <div class="error-dialog">
        <el-dialog
            :title="'系统日志异常'"
            :visible.sync="visible"
            @close="$emit('update:show', false)"
            :show="show"
            :modal-append-to-body="false">
            <div v-if="errorData.length">
                <div v-for="(item,index) in errorData" :key="index" class="errorConent">{{item.traceLine}}</div>
            </div>
            <div v-else class="noData">
                暂无数据
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import dialogMixin from './../../mixins/dialog'
export default {
    mixins: [dialogMixin],
    props: ['eventId'],
    data() {
        return {
            errorData: []
        }
    },
    watch: {
        eventId(val) {
            this.handleError(val);
        }
    },
    mounted() {
        if (this.eventId) {
            this.handleError(this.eventId)
        }
    },
    methods: {
        ...mapActions([
            'getLogError'
        ]),
        handleError(id) {
          this.getLogError(id).then( res => {
            this.errorData = res;
          })
        },
    }
}
</script>

<style lang="scss">
.noData {
    color: #333;
    font-size: 18px;
}
</style>
