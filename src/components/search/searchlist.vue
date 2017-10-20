<template>
	<div class="marTmp">
		<!-- 标题部分 -->
		<!-- 华丽的分割线 -->
		 <p class="line"></p>
		<!-- 每块 的标题 -->
		<el-row class='title'>
		  <el-col :span="18"><h3>{{searchvalue[1]}}的搜索结果</h3></el-col>
		  <el-col :span="6" ><span>共{{total}}条</span></el-col>

		</el-row>
		<!-- 图文列表 -->
		<ul   v-infinite-scroll="loadMore"
			  infinite-scroll-disabled="loading"
			  infinite-scroll-distance="10"
		  	  class="mui-table-view mui-table-view-chevron movelist">
				<li class="mui-table-view-cell mui-media" v-for='item in list'>
					<router-link v-bind="{to:'/moveinfo/'+item.id}" class="mui-navigate-right">
						<img  class="mui-media-object mui-pull-left" v-lazy="item.images.large">
						<div class="mui-media-body">
							<h4>{{item.title}}</h4>
							<p><el-rate
								  v-model="item.rating.average"
								  disabled
								  show-text
								  text-color="#ff9900"
								  text-template="{value}">
								</el-rate>
							</p>
							<p>导演：<span v-for='value in item.directors'>{{value.name}}  </span></p>
							<p>类型：{{item.genres.join(' ')}}</p>
							<p>主演：<span v-for='value in item.casts'>{{value.name}}  </span></p>
						</div>
					</router-link>
				</li>
			</ul>
			<!-- 加载中动画 -->
			<el-row>
			  <el-col :span="24"  class='loading'>
			  	<span class="red">{{loadValue}}</span>
				<span class="fr">
					<mt-spinner v-if='showload' :size="30" color="#df2d2d" type="triple-bounce"></mt-spinner>
				</span>
			  </el-col>
			</el-row>
	</div>
</template>
<script>
	export default{
		data(){
			return {
                searchvalue:[],
                qvalue:'',
                tagvalue:'',
				list:[],
	     		page:1,
	     		total:0,
	     		loading:false,
	     		start:0,
	     		loadValue:'加载中',
	     		showload:true
			}
		},
		created(){
            this.searchvalue= this.$route.params.searchvalue.split('=');
            if(this.searchvalue[0]=='q'){
                this.qvalue=this.searchvalue[1]
            }
            else{
                this.tagvalue=this.searchvalue[1]
            }
			this.getlist()
		},
		methods:{
			//发送ajax获得数据
			getlist(){
				this.$http.jsonp('http://api.douban.com/v2/movie/search',{params:{q:this.qvalue,tag:this.tagvalue}})
				.then(function(res){
					this.total=res.body.total
                    this.list=res.body.subjects
					this.loading = false;
					//判断 如果返回结果小于10条  则不在加载
					if(res.body.subjects.length<5){
						this.loading=true;
						this.showload=false;
						this.loadValue='没有更多数据啦~~'
					}
				})
			},
			loadMore() {
			  this.loading = true;
			  setTimeout(() => {
			    this.page++;
			    this.start=(this.page-1)*10
			    this.getlist()
			  }, 1000);
			}
		}

	}
</script>
<style scoped>
	.title{
	  	background-color: #df2d2d;
	  	line-height: 2;
	  	color: #fff;
	  	text-indent: 1rem;
	  	border-radius: 5px;
	  	margin-bottom: 8px;
	  }
  image[lazy=loading] {
		  width: 40px;
		  height: 300px;
		  margin: auto;
        }
 .title{
         line-height: 40px;
   }
	h3{
		font-family: '微软雅黑';
		font-size: 20px;
		line-height: 2;
	}
	/*改造图文列表*/
	.mui-table-view .mui-media-object{
		height: auto;
		max-width: 70px;
		line-height: 65px;
	}
	.movelist h4{
		margin-bottom: 2px;
	}

	p{
		font-size: 12px;
	}
	.loading{
		text-align: center;
	}
	.loading span {
		display: inline-block;
		font-size: 18px;
		line-height: 2;
		vertical-align: middle;
	}
</style>