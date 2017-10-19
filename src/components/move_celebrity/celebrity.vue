<template>
    <div class="celebritypage marTmp"
    v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命加载中~~">
        <p class="line"></p>
        <div class="celebrity">
            <!-- 个人资料 -->

            <el-card class="box-card header">
                <h2>{{info.name}} - {{info.latin_name}}</h2>
                <el-col :span="17">
                    <p class="ccc">{{info.fans_count}} 人收藏</p>
                    <p v-html="info.info"></p>
                </el-col>
                <el-col :span="7">
                    <img :src="info.avatar.large" alt="">
                </el-col>
            </el-card>
            <!-- 影人介绍 -->
            <el-card class="box-card persondesc">
                <h4>影人介绍</h4>
                <p>{{isshow?info.abstract:info.intro}} <span v-if='isshow' class="red" @click='showinfo'>(展开)</span></p>
             
            </el-card>
            <!-- 影人图片 豆瓣拒绝访问  注释掉 -->
            <!-- <el-card class="box-card listbox">
                <h4>图片</h4>
                <ul>
                    <li v-for='item in info.album.photos'>
                        <img :src="item.image.large.url" >
                    </li>
                </ul>
            </el-card> -->
            <!-- 个人作品 -->
             <el-card class="box-card listbox worklist">
                 <h4>个人作品</h4>
                 <ul>
                    <li v-for='item in info.latest_works'>
                       <router-link v-bind="{to:'/moveinfo/'+item.id}">
                            <img :src="item.pic.large" alt="">
                            <p>{{item.title}}</p>
                            <el-rate class="star"
                                v-model="item.rating.star_count"
                                disabled
                                text-color="#ff9900"
                            >
                            </el-rate>
                            <span class="ccc">{{item.rating.value}}</span>
                       </router-link>
                    </li>
                   
                </ul>
              </el-card>    
              <!-- 合作过的影人 -->
              <el-card class="box-card listbox">
                 <h4>合作过的影人</h4>
                 <ul>
                    <li v-for='item in info.related_celebrities' @click='changeid(item.celebrity.id)'>
                      <router-link v-bind="{to:'/celebrity/'+item.celebrity.id}">
                        <img :src="item.celebrity.avatar.large" alt="">
                        <p>{{item.celebrity.name}}</p>
                      </router-link>
                    </li>
                </ul>
              </el-card>   
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      info: { album: {}, avatar: {} },
      photo: [],
      isshow: true,
      fullscreenLoading: false
    };
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id)
    this.getinfo();
  },
  methods: {
      //点影人信息更换影人信息
      changeid(id){
          this.id=id;
          this.getinfo()
      },
    //个人信息详情展开事件
    showinfo() {
        this.isshow=false;
    },
    getinfo() {
    this.fullscreenLoading = true;
      this.$http
        .jsonp("https://m.douban.com/rexxar/api/v2/celebrity/" + this.id)
        .then(function(res) {
          this.info = res.body;
          this.fullscreenLoading = false;
        });
    }
  }
};
</script>
<style scoped>
.celebrity {
  background-color: #fff;
}
.el-card {
  border: 0px;
}
h2 {
  margin: 10px 0;
}
.header img {
  width: 100px;
}
.header .ccc {
  margin-bottom: 10px;
}
.persondesc h4 {
  margin-bottom: 10px;
}
.listbox {
  overflow-x: auto;
}
.listbox ul {
  list-style: none;
  width: 10000px;
  padding-left: 0px;
}
.listbox ul li {
  padding: 5px 8px;
  float: left;
  width: 125px;
  text-align: center;
}
.worklist li p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.listbox ul li img {
  height: 120px;
  width: 100%;
}
.star {
  display: inline-block;
}
.ccc,
h4 {
  color: rgba(0, 0, 0, 0.6);
}
</style>
