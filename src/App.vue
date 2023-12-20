<template>
  <div id="app" style="position: relative;width: 100%;height: 100%;">
    <Header></Header>
    <router-view/>
    <div style="position: absolute;bottom:0px;width: 100%;">
      <Footer></Footer>
    </div>

  </div>
</template>



<script>
import Header from '@/components/header.vue';
export default {
  components: {
    Header,
  },
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
