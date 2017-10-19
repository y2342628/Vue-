<template>
	<div class="tmpMar"
	v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命加载中~~">
		<!-- 华丽的分割线 -->
		 <p class="line"></p>
		<!-- 每块 的标题 -->
		<el-row class='title'>
		  <el-col :span="20"><h4>{{moveTitle}}</h4></el-col>
		  <el-col :span="4" >
		  	<router-link v-bind="{to:'/movelist/'+moveType}">
		  		<span >more>></span>
		  	</router-link>
		  </el-col>
		</el-row>
		<!--每块的内容 -->
		<div class ="content">
			<el-row :gutter="10">
		  <el-col :span="8" v-for='item in list'>
		  	<router-link v-bind="{to:'/moveinfo/'+item.id}">
		  		<div class="grid-content bg-purple">
		  		<img :src="item.images.large">
		  		<h5>{{item.title}}</h5>
		  		<el-rate
				  v-model="item.rating.average"
				  disabled
				  show-text
				  text-color="#ff9900"
				  text-template="{value}">
				</el-rate>
		  	</div>
		  	</router-link>
		  </el-col>
		</el-row>
		</div>
		
	</div>
</template>
<script>
	export default {
	name:'movemodule',
	props:['moveType','moveTitle'],
	  data() {
	    return {
	     	list:[],
			 fullscreenLoading: false

	    }
	  },
	  created(){
	  	this.getlist()
	  },
	  methods:{
	  	getlist(){
				 this.fullscreenLoading = true;
	  		this.$http.jsonp('http://api.douban.com/v2/movie/'+this.moveType,{params:{start:0,count:6}})
	  		.then(function(res){
	  				this.list=res.body.subjects;
						  this.fullscreenLoading = false;
	  		})
	  	}
	  }
	}
</script>
<style scoped>
	

  img {
    width: 100%;
    max-height: 140px;
   
  }
  .el-row {
  margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .title{
  	background-color: #df2d2d;
  	line-height: 2;
  	color: #fff;
  	text-indent: .5rem;
  	border-radius: 5px;
  }
  .title h4{
  	line-height: 2;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    border: 1px solid #000;
    padding: 5px;
  }
  .content{
  	background: #fff;
  	padding: 10px 5px;
  	border-radius: 5px;
  	text-align: center;
  }
  .content .el-col{
  	margin-bottom: 5px; 
  }
  .content h5{
  	width: 100%;
  	overflow: hidden;
 	white-space: nowrap;
 	text-overflow: ellipsis;
  }

 
 
</style>