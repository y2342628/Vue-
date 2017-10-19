<template>
  <div class=" marTmp">
   <!-- 即将上映模块 -->
 	<movemodule :moveType='moveType[0]' :moveTitle='moveTitle[0]'></movemodule>
 	<!-- 即将上映模块 -->
 	<movemodule :moveType='moveType[1]' :moveTitle='moveTitle[1]'></movemodule>
 	<!-- top250模块 -->
 	<movemodule :moveType='moveType[2]' :moveTitle='moveTitle[2]'></movemodule>
 
  </div>
</template>

<script>
import movemodule from './move_module/move_module.vue'
export default {
  name: 'home',
  data () {
    return {
    	moveTitle:['正在热映','即将上映','Top250'],
    	moveType:['in_theaters','coming_soon','top250']
    }
  },
  components:{
  	movemodule
  }
}
</script>

<style scoped>

</style>
