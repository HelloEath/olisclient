<template>
  <div class="top-steps">
    <div class="step_bar">
        <div class="step_item" :class="item.value" v-for='(item, i) in stepList' :key="i">
            <div class="triangle"></div>
            <!-- <div class="arrow" v-show="item.value=='status_3'">
                <div class="arrow_up"></div>
                <div class="arrow_down"></div>
            </div> -->
            {{item.name}}
        </div>
    </div>
</div>
</template>
<script>
  export default{
    props: ['step','name3'],
    data () {
        return {
            show: true,
            stepList: [
                {
                    name: '选择模块',
                    value: 'status_2'
                },{
                    name: '活动设计',
                    value: 'status_3'
                },{
                    name: this.name3,
                    value: 'status_3'
                },
            ]
        }
    },
    computed: {
        stepShow () {
            return this.step
        }
    },
    watch: {
        stepShow () {
            let vm = this
            if (this.stepShow == 0) {
                this.stepList[0].value = 'status_2'
                this.stepList[1].value = 'status_3'
                this.stepList[2].value = 'status_3'
            }
            if (vm.stepShow == 1) {
                vm.show = false
                vm.stepList[0].value = 'status_1'
                vm.stepList[1].value = 'status_2'
                vm.stepList[2].value = 'status_3'
                setTimeout(() => {
                   vm.show = true
                }, 100);
            }
            if (this.stepShow == 2) {
                vm.show = false
                vm.stepList[0].value = 'status_1'
                vm.stepList[1].value = 'status_1'
                vm.stepList[2].value = 'status_2'
                setTimeout(() => {
                   vm.show = true
                }, 100);
            }
        },
        name3(val) {
            this.stepList[2].name = val
        }
    },
    mounted () {
            if (this.stepShow == 0) {
                this.stepList[0].value = 'status_2'
                this.stepList[1].value = 'status_3'
                this.stepList[2].value = 'status_3'
            } else if (this.stepShow == 1) {
                this.stepList[0].value = 'status_1'
                this.stepList[1].value = 'status_2'
                this.stepList[2].value = 'status_3'
            }else if (this.stepShow == 2) {
                this.stepList[0].value = 'status_1'
                this.stepList[1].value = 'status_1'
                this.stepList[2].value = 'status_2'
            }

    }
  }
</script>
<style lang="scss">
    .top-steps{
        padding: 12px 24px;
        margin-bottom:10px;
        .ivu-steps.ivu-steps-small .ivu-steps-head-inner {
            width: 28px;
            height: 28px;
            line-height: 26px;
            margin-right: 10px;
            text-align: center;
            border-radius: 50%;
            font-size: 20px;
        };
        .ivu-steps.ivu-steps-small .ivu-steps-tail{
            top: 15px;
        }
        .ivu-steps.ivu-steps-small .ivu-steps-title{
            font-size: 20px;
        }
    }
    .step_bar {
        width:80%;
        display:flex;
        box-shadow: 2px 2px 4px #ddd;
        margin:0 auto;
        background: #b6d6fa;
        .step_item {
            width:100%;
            height:42px;
            line-height:42px;
            position: relative;
            text-align:center;
            font-size:18px;
            &:not(:last-child) .triangle {
                width:30px;
                height:30px;
                position: absolute;
                display:block;
                top:50%;
                margin-top:-15px;
                right:-15px;
                background:#57a0f2;
                transform: rotate(-45deg);
                z-index:10;
            }
            &.status_1{
                background:#bcd9fa;
                color:#fff;
                .triangle {
                    background:#bcd9fa
                }
            }
            &.status_2 {
                background:#57a0f2;
                color:#fff;
                .triangle {
                    background:#57a0f2;
                }
            }
            &.status_3 {
                background:#fff;
                .triangle {
                    background:#fff;
                }
            }
        }
    }
</style>
