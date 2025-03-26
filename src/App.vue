<template>
  <div id="app">
    
    <nav>
      <router-link to="/markedjs">MarkedJS</router-link> |
      <router-link to="/unified">UnifiedJS</router-link> |
      <router-link to="/chatbox">ChatBox</router-link>  |
      <router-link to="/streaming">Streaming</router-link>
      <router-link to="/streaming-markedjs">Streaming Markedjs</router-link>

    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
//import "./output.css"
import 'highlight.js/styles/github.css'
import "./markdown.css"
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-active {
  color: #42b983;
}

.markdown-teampal {
  padding: 20px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  background-color: #fff;
  color: #24292e;
  font-size: 16px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>