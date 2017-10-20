<template>
  <div id="app">
  	<!-- header部分 -->
	<div class="header">
	<el-row :gutter="20">
	  <el-col :span="4">
	  	<div class="grid-content bg-purple">
	  	<router-link to='/'>
					<img src="../static/images/logo.png">
			</router-link>
	  	</div>
	  </el-col>
	  <el-col :span="16">
	  	<div class="grid-content bg-purple">
	  		<h4 class="red bold">猫眼电影</h4>
	  		<p>在线选座，热门影讯，爱上看电影</p>
	  	</div>
	  </el-col>
	  <el-col :span="4">
	  	<div class="grid-content bg-purple">
	  		<router-link to='/search'>
	  			<span class="el-icon-search red"></span>
	  		</router-link>
	  	</div>
	  </el-col>
	</el-row>
	</div>
	
	    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
   data() {
    return {
      input2: ''
    }
  },
  methods: {
    handleIconClick(ev) {
      console.log(ev);
    }
  }
}
</script>

<style scoped>
.header {
	width: 100%	;
	position: fixed;
	padding: 5px;
	background-color: #eee;
	z-index: 99;
}


  .el-col{
  	line-height: 1.5;
  }
  h4{
  	line-height: 1.5;
  }
  img{
  	width: 44px;
  	margin-left: 5px;
  }

 .grid-content p {
 	font-size: 12px;
 	color: rgba(0,0,0,.3);
 	line-height: 1.5;
 }
.el-icon-search{
	font-size: 2rem;
	line-height: 1.2;
}
</style>
