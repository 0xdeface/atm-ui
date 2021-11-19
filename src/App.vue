<template>
  <div id="app">
    <TopPanel/>
    <div class="ui divider"></div>
    <router-view/>
  </div>
</template>

<script>
import TopPanel from './components/TopPanel.vue'

export default {
  name: 'App',
  components: {
    TopPanel
  }
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
