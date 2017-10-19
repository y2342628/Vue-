<template>
  <div>
   <div
    v-loading.fullscreen.lock="fullscreenLoading" 
    element-loading-text="拼命加载中~~">
   </div>
  </div>
</template>
<script>
export default {
  data() {
    fullscreenLoading: false;
  }
};
</script>
<style scoped>

</style>


