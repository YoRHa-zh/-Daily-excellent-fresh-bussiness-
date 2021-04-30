<template>
  <div class="home-container">
    <div class="left">
      <LeftMenu />
    </div>
    <div :class="{ fold: $store.state.collapsed, main: true }">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import LeftMenu from './components/LeftMenu.vue';
import Header from './components/Header.vue';

export default {
  components: {
    LeftMenu,
    Header,
  },
  data() {
    return {
    };
  },
  methods: {

  },
};
</script>
<style lang="less">
@import url("~@/assets/css/home.less");
</style>
