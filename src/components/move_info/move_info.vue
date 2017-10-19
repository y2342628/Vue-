<template>
	<div class="moveinfo marTmp" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-text="拼命加载中~~">
		<p class="line"></p>
		<!-- 头部 -->
		<div class='header'>
			<div class='backimg' :style="{backgroundImage:'url('+info.images.large+')'}"></div>
			<el-row class='headermask'>
				<el-col :span="9">
					<img :src="info.images.large">
				</el-col>
				<el-col :span="15" class="desc">
					<h4>{{info.title}}</h4>
					<p>
						<el-rate v-model="value" disabled text-color="#ff9900">
						</el-rate>
						<span v-text="info.rating.average"></span>
						<span>({{info.ratings_count}}人评分)</span>
					</p>
					<p>导演：<span v-for='item in info.directors'>{{item.name}} </span></p>
					<p>类型：{{info.genres.join(' ')}}</p>
					<p>主演：<span v-for='item in info.casts'>{{item.name}} </span></p>
					<p>上映年份：{{info.year}}</p>
				</el-col>
			</el-row>
		</div>
		<!-- 剧情简介 -->
		<div class="content">
			<el-row :gutter="20">
				<el-col :span="6" :offset="6">
					<el-tag type="success">{{info.collect_count}}人看过</el-tag>
				</el-col>
				<el-col :span="6">
					<el-tag type="danger">{{info.wish_count}}人想看</el-tag>
				</el-col>

			</el-row>
			<h4 class="red">剧情简介</h4>
			<p class="Small">{{info.summary}}</p>
		</div>
		<!-- 演职人员 -->
		<div class="content">
			<h4 class="red">演职人员</h4>
			<div class="personnav">
				<ul :style="{width:ulWidth+'px'}">
					<li v-for='item in info.directors'>
						<router-link v-bind="{to:'/celebrity/'+item.id}">
							<img :src="item.avatars.small" >
							<p >{{item.name}}</p>
							<p class="ccc">导演</p>
						</router-link>
					</li>
					<li v-for='item in info.casts'>
						<router-link v-bind="{to:'/celebrity/'+item.id}">
						<img :src="item.avatars.small" >
						<p >{{item.name}}</p>
						<p class="ccc">演员</p>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			id: 0,
			value:0,
			info:{
				rating:{},
				genres:[],
				images:{},
				directors:[{avatars:{}}],
				casts:[{avatars:{small:'11'}}]
				},
			ulWidth:375,
			 fullscreenLoading: false
		}
	},
	created() {
		this.id = this.$route.params.id;
		this.getinfo()
	},
	methods:{
			getinfo(){
				this.fullscreenLoading = true;
				this.$http.jsonp('http://api.douban.com/v2/movie/subject/'+this.id)
				.then(function(res){
					this.info=res.body;
					this.value=this.info.rating.average/2;
					this.ulWidth=(this.info.casts.length+this.info.directors.length)*90+10
				 	this.fullscreenLoading = false;
				})
			}
	}
}
</script>
<style scoped>
.moveinfo {
	background-color: #fff;
}

.header {
	position: relative;
	overflow: hidden;
	max-height: 220px;
}

.backimg {
	height: 220px;
	background-repeat: no-repeat;
	background-size: cover;
	filter: blur(5px);
}

.headermask {
	padding: 15px;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, .2);
	height: 220px;
}

.header img {
	max-width: 120px;
	max-height: 165px;
}

.header h4,
.header p {
	color: #fff;
}
.header h4 {
	font-size: 20px;
}
.content {
	padding: 8px;
}
.content p {
	padding-left: 4px;
}
.content h4 {
	line-height: 2;
	padding-left: 4px;
}

.personnav {
	width: 100%;
	overflow-x: auto;
}

.personnav ul {
	list-style: none;
	width: 1000px;
	padding-left: 0px;
}

.personnav ul li {
	float: left;
	padding: 5px 10px;
	max-width: 90px;
}
.personnav img {
	max-width: 75px;
}
.personnav p {
	text-align: center;
}
.el-tag--success{
	background-color: #13ce66;
	color: #fff;
}
.el-tag--danger{
	background-color: #ff4949;
	color: #fff;
}
.desc p {
	font-size: 12px;
}
.el-rate{
	line-height: 1.5;
}
.ccc{
	color: #aaa;
}
</style>