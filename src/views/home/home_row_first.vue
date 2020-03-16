<template>
	<div class="index-row index-row-first">
		<el-row :gutter="20">
			<!-- 旧版入口 开始 -->
		  <!-- <el-col :span="8">
			  <div class="grid-content bg-white">
			  	<div class="grid-content-tit">
			  		<div class="grid-content-txt"><i class="icon-1"></i>我的活动</div>
			  		<div class="grid-content-btn" v-if="homeBtns.activityBtn" @click="clearStore">
							<router-link :to="{path: '/my-activity', query: {my: 'current', departmentId: department.id }}">
			  				<el-button type="primary" plain>
			  					查看详情
			  				</el-button>
			  			</router-link>
		  			</div>
			  	</div>
			  	<div class="grid-content-lst">
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">待提交</div>
			  			<div class="itm-value primary" v-if="rowFirstData.activityBeforeApproval>0 && homeBtns.activityBtn" @click="clearStore">
							<router-link :to="{path: '/my-activity', query: {my: 'current', status: 1, departmentId: department.id }}">
			  					{{rowFirstData?rowFirstData.activityBeforeApproval:0}}
							</router-link>
			  			</div>
			  			<div class="itm-value primary" v-else>
			  					{{rowFirstData?rowFirstData.activityBeforeApproval:0}}
			  			</div>
			  		</div>
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">执行中</div>
			  			<div class="itm-value primary" v-if="rowFirstData.activityInExecuting>0 && homeBtns.activityBtn" @click="clearStore">
							<router-link :to="{path: '/my-activity', query: {my: 'current', status: 3, departmentId: department.id }}">
									{{rowFirstData?rowFirstData.activityInExecuting:0}}
							</router-link>
			  			</div>
			  			<div class="itm-value primary" v-else>
			  					{{rowFirstData?rowFirstData.activityInExecuting:0}}
			  			</div>
			  		</div>
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">昨日结束</div>
			  			<div class="itm-value">{{rowFirstData?rowFirstData.activityFinishedYestoday:0}}</div>
			  		</div>
			  	</div>
			  </div>
		  </el-col> -->
			<!-- 旧版入口 结束 -->
			<!-- 新版入口 开始 -->
		  <el-col :span="8">
			  <div class="grid-content bg-white">
			  	<div class="grid-content-tit">
			  		<div class="grid-content-txt"><i class="icon-1"></i>我的活动</div>
			  		<!-- <div class="grid-content-btn" v-if="homeBtns.activityBtn" @click="clearStore">
							<router-link :to="{path: '/activity-management', query: {my: 'current', departmentId: department.id }}">
			  				<el-button type="primary" plain>
			  					查看详情
			  				</el-button>
			  			</router-link>
		  			</div> -->
			  	</div>
			  	<div class="grid-content-lst">
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">待提交</div>
			  			<div class="itm-value primary" v-if="rowFirstData.activityBeforeApproval>0 && homeBtns.activityBtn" @click="clearStore">
							<router-link :to="{path: '/routine-activity', query: {my: 'current', status: 1, departmentId: department.id }}">
			  					{{rowFirstData?rowFirstData.activityBeforeApproval:0}}
							</router-link>
			  			</div>
			  			<div class="itm-value primary" v-else>
			  					{{rowFirstData?rowFirstData.activityBeforeApproval:0}}
			  			</div>
			  		</div>
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">执行中</div>
			  			<div class="itm-value primary" v-if="rowFirstData.activityInExecuting>0 && homeBtns.activityBtn" @click="clearStore">
							<router-link :to="{path: '/routine-activity', query: {my: 'current', status: 3, departmentId: department.id }}">
									{{rowFirstData?rowFirstData.activityInExecuting:0}}
							</router-link>
			  			</div>
			  			<div class="itm-value primary" v-else>
			  					{{rowFirstData?rowFirstData.activityInExecuting:0}}
			  			</div>
			  		</div>
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">昨日结束</div>
			  			<div class="itm-value">{{rowFirstData?rowFirstData.activityFinishedYestoday:0}}</div>
			  		</div>
			  	</div>
			  </div>
		  </el-col>
			<!-- 新版入口 结束 -->
		  <el-col :span="8">
			  <div class="grid-content bg-white">
			  	<div class="grid-content-tit">
			  		<div class="grid-content-txt"><i class="icon-2"></i>我的审批事项</div>
			  		<!-- <div class="grid-content-btn" v-if="homeBtns.aduitBtn" @click="clearStore">
							<router-link :to="{path: '/routine-activity', query: {my: 'approval', departmentId: department.id }}">
			  				<el-button type="primary" plain>
			  					查看详情
			  				</el-button>
			  			</router-link>
		  			</div> -->
			  	</div>
			  	<div class="grid-content-lst">
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">审批中</div>
			  			<div class="itm-value primary" v-if="rowFirstData.inApproval>0 && homeBtns.aduitBtn" @click="clearStore">
								<router-link :to="{path: '/routine-activity', query: {my: 'approval', status: 2, departmentId: department.id }}">
			  					{{rowFirstData?rowFirstData.inApproval:0}}
			  				</router-link>
			  			</div>
			  			<div class="itm-value primary" v-else>
			  					{{rowFirstData?rowFirstData.inApproval:0}}
			  			</div>
			  		</div>
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">审批驳回</div>
			  			<div class="itm-value primary" v-if="rowFirstData.reject>0 && homeBtns.aduitBtn" @click="clearStore">
								<router-link :to="{path: '/routine-activity', query: {my: 'approval', status: 4, departmentId: department.id }}">
				  				{{rowFirstData?rowFirstData.reject:0}}
				  			</router-link>
				  		</div>
				  		<div class="itm-value primary" v-else>
				  				{{rowFirstData?rowFirstData.reject:0}}
				  		</div>
			  		</div>
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">最新通过</div>
			  			<div class="itm-value">{{rowFirstData?rowFirstData.approved:0}}</div>
			  		</div>
			  	</div>
			  </div>
		  </el-col>
		  <el-col :span="8">
			  <div class="grid-content bg-white">
			  	<div class="grid-content-tit">
			  		<div class="grid-content-txt"><i class="icon-3"></i>我的待办事项</div>
			  		<!-- <div class="grid-content-btn" v-if="homeBtns.waitBtn" @click="clearStore">
			  			<router-link to="/back-log">
			  				<el-button type="primary" plain>
			  					查看详情
			  				</el-button>
			  			</router-link>
		  			</div> -->
			  	</div>
			  	<div class="grid-content-lst">
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">待审批</div>
			  			<div class="itm-value primary" v-if="rowFirstData.todoBeforeApproval>0 && homeBtns.waitBtn" @click="clearStore">
			  				<router-link to="/back-log">
			  					{{rowFirstData?rowFirstData.todoBeforeApproval:0}}
			  				</router-link>
			  			</div>
			  			<div class="itm-value primary" v-else>
			  					{{rowFirstData?rowFirstData.todoBeforeApproval:0}}
			  			</div>
			  		</div>
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">加急事项</div>
			  			<div class="itm-value primary" v-if="rowFirstData.todoUgrent>0 && homeBtns.waitBtn" @click="clearStore">
			  				<router-link to="/back-log">
				  				{{rowFirstData?rowFirstData.todoUgrent:0}}
				  			</router-link>
			  			</div>
			  			<div class="itm-value primary" v-else>
				  				{{rowFirstData?rowFirstData.todoUgrent:0}}
			  			</div>
			  		</div>
			  		<div class="grid-content-itm">
			  			<div class="itm-txt">昨日新增</div>
			  			<div class="itm-value">{{rowFirstData?rowFirstData.todoNewlyAdded:'0'}}</div>
			  		</div>
			  	</div>
			  </div>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {getStore,removeStore} from './../../common/utils.js'
export default {
    data () {
        return {
        }
		},
		watch: {
			"homeIndexEntryTab.activeTab": function(tab){
				if(tab === 'first') this.getFirstRow();
				//console.log(tab);
			}
		},
		inject:['homeIndexEntryTab'],
    computed: {
			...mapGetters(['rowFirstData','homeBtns']),
			department() {
				return JSON.parse(getStore('currentDepartment'));
			},
		},
    created(){
    	this.getFirstRow();
		},
    methods: {
				...mapMutations(['changeMainLoading']),
        ...mapActions(['getFirstRow']),
				clearStore(){
	        removeStore('outParams');
	        removeStore('SetParams');
	        removeStore('backlogTab');
	      }
    },
}
</script>
<style lang="scss" scoped>
	 @import '../../assets/css/home_row_first';
</style>
