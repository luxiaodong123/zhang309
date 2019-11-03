<template>
  <div id="app">
    <div class="u-env-test2222222"
         v-if="isEnvProd">测试</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEnvProd: false
    }
  },
  mounted() {
    if (process.env.VUE_APP_MODE == 'development' || process.env.VUE_APP_MODE == 'test') {
      this.isEnvProd = true;
    }
  }
}
</script>

<style lang="less">
@import "./assets/less/common/common.main.less";
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

#app {
  height: 100%;
}
.u-env-test {
  color: #f22;
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 99;
}
</style>
