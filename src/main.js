// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


//引入vueRrsource
import vueResource from 'vue-resource'
Vue.use(vueResource)


Vue.config.productionTip = false
//引入element-ui
import Element from 'element-ui'
Vue.use(Element)
import '../node_modules/element-ui/lib/theme-default/index.css'

//引入mui
import '../static/mui/css/mui.css'

//引入mint-ui 
import mint from 'mint-ui'
Vue.use(mint)
import '../node_modules/mint-ui/lib/style.css'
//引入Vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



//引入全局css

import '../static/css/base.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
