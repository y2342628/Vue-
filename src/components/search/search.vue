<template>
  <div class="search">
    <el-row>
      <el-col :span="20">
          <i class="el-icon-search"></i>
        <input  
        type="search"
        @keydown.enter="searchQ"
         placeholder="搜索 电影/影人"
         v-model="value">
      </el-col>
       <el-col :span="4" class="back">
           <a href="javascript:;" class="red" @click='goback'>返回</a>
      </el-col>
    </el-row>
    <p class="line"></p>
    <!-- 大家都在搜 -->
       <el-card class="box-card ">
            <div slot="header" class="clearfix">
                <span class="red">大家都在搜</span>
            </div>
            <div >
               <el-tag class="tag" type="danger" v-for='item in hotlist'>
                    <router-link class="red" v-bind="{to:'/search/searchlist/q='+item.title}">
                   {{item.title}}
                    </router-link>
                   </el-tag>
            </div>
        </el-card>
        <!-- 分类搜索 -->
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="red">分类</span>
            </div>
            <div >
               <el-tag class="tag" type="danger" v-for='item in taglist'>
                   <router-link class="red" v-bind="{to:'/search/searchlist/tag='+item}">
                       {{item}}
                   </router-link>
               </el-tag>
            </div>
        </el-card>
          <!-- 搜索历史 -->
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="red">搜索历史</span>
                <i style="float: right;" class="el-icon-delete red"  @click="open2"></i>
            </div>
             <div v-for="item in historylist"  class="text item hisli">
              <span>{{item}}</span>
              <i class="el-icon-close red del" @click='removehistory(item)'></i>
            </div>
        </el-card>
        <!-- 删除提示 -->
        
  </div>
</template>
<script>
//引入localStorage的操作方法
import {setitem,getitem,removeitem} from '../../stic/localitem'
export default {
  data() {
    return {
      historylist:[],
      value: "",
      hotlist:[{title:'战狼'},{title:'王牌特工'}],
      taglist:['剧情','爱情','喜剧','科幻','动作','悬疑','治愈','青春','文艺']
    };
  },
  created() {
      this.gethotlist();
      this.gethistory();
  },
  methods: {
      //删除历史记录
      removehistory(value){
          //1.删除localStorage中的记录
            removeitem(value)
        //2.删除当前history列表中的记录
        if(value){
            for(var i=this.historylist.length;i>=0;i--){
                if(this.historylist[i]==value){
                    this.historylist.splice(i,1);
                    break;
                }
            }
        }else{
            this.historylist=[];
        }
      },
      //获取搜索历史记录
      gethistory(){
        this.historylist=getitem();
      },
      //删除历史记录
      open2() {
        this.$confirm('是否清空历史记录', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
            this.removehistory()
          console.log('删除成功')
        }).catch(() => {
          console.log('取消删除')        
        });
      },
      //返回上一页
      goback(){
         this.$router.go(-1);
      },
      searchQ(){
          if(!this.value.trim()){
              return ;
          }
           setitem(this.value);
          location.hash='#/search/searchlist/q='+this.value
      },
      //发送请求 获取当前热门影片的标题
      gethotlist(){
          this.$http.jsonp('http://api.douban.com/v2/movie/in_theaters',{params:{start:0,count:10}})
          .then(function(res){
             this.hotlist=res.body.subjects;
          })
      }
  }
};
</script>
<style scoped>
.search {
  position: relative;
  z-index: 200;
  background: #e5e9f2;
  padding: 5px;
  height: 100%;
}
.search .back {
  font-size: 18px;
  text-align: center;
  line-height: 2.2;
}
.search input {
  padding-left: 30px;
  color: #666;
}
.search .el-icon-search {
  position: absolute;
  left: 9px;
  top: 9px;
  color: #aaa;
}
.tag{
    padding: 2px 14px;
    box-sizing: content-box;
    border-radius: 10px;
    cursor: pointer;
    margin: 5px 6px;
}
.el-card{
    border: 0px;
    border-radius: 0px;
}
.hisli{
    padding: 5px ; 
    border-bottom: 1px solid #eee;
    line-height: 30px;
    color:#666;
}
.del {
    font-size: 12px;
    float: right;
    height: 35px;
    line-height: 35px;
}
</style>
