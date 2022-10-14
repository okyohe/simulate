<template>
  <div id="app">
    <header>
      
      <img alt="Vue logo" src="./assets/logo.png">
    </header>
    <!-- <p>{{ message }}</p> -->
    
    <router-view />
    
    <MenuBar/>
  </div>
</template>

<script>

import MenuBar from './components/MenuBar.vue'

export default {
  name: 'App',  
  components: {    
    MenuBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1d3247;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
header{  
  /* width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem auto;
  
}
header img{   
  width:150px;  
  display: inline-block;
  display: flex;
  margin: auto;

  justify-content: center;
}
a{
  color: #7957d5;
}

</style>
