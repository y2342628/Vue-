import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
//引入movelist页面
import movelist from '@/components/move_list/move_list'
//引入moveinfo页面
import moveinfo from '@/components/move_info/move_info'
//引入celebrity页面
import celebrity from '@/components/move_celebrity/celebrity'
//引入搜索页面
import search from '@/components/search/search'
//引入搜索list页面
import searchlist from '@/components/search/searchlist'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
    	path:'/movelist/:moveType',
    	name:'movelist',
    	component:movelist
    },
    {
    	path:'/moveinfo/:id',
    	name:'moveinfo',
    	component:moveinfo
    },
    {
    	path:'/celebrity/:id',
    	name:'celebrity',
    	component:celebrity
    },
    {
    	path:'/search',
    	name:'search',
    	component:search
    },
    {
    	path:'/search/searchlist/:searchvalue?',
    	name:'searchlist',
    	component:searchlist
    }
  ]
})
