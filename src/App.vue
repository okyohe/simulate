<template>
  <div id="app">
    <header>
      <img alt="Vue logo" src="./assets/logo.png">
    </header>
    <SimulateSavings msg="内臓も最大限いただきます"/>
  </div>
</template>

<script>
import SimulateSavings from './components/SimulateSavings.vue'

export default {
  name: 'App',
  components: {
    SimulateSavings
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
  margin: 5rem auto;
  display: flex;
  justify-content: center;
}
header{
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  
}
header img{  
  flex-grow: none;
  flex-shrink: none;  
  width:200px;  
}

</style>
