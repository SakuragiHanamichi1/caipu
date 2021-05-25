<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- sdsds -->
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
  .footer {
    display: flex;
    align-items: center;
    position: absolute;
    // bottom: 0;
    left: 0;
    width: 100%;
    height: 2.875rem;
    border-top: 0.0625rem solid #ccc;
    span {
      flex: 1;
      text-align: center;
    }
  }

  .exact-actived {
    span {
      color: #fcec76;
    }
  }
}
</style>
