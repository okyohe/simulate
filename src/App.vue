<template>
  <div id="app">
    <header>
      <img alt="Vue logo" src="./assets/logo.png">
    </header>
    <!-- <p>{{ message }}</p> -->
    <h1>{{ PageTitle }}</h1>
    <h2>{{ PageSubtitle }}</h2>
    
    
    <SimulateSavings msg="内臓も最大限いただきます"/>
  </div>
</template>

<script>
import SimulateSavings from './components/SimulateSavings.vue'


export default {
  name: 'App',
  data(){
    return{
      message : "鹿を起点に、新たな循環を",
      PageTitle : "バイオガス生産量シミュレーター",
      PageSubtitle: "どれくらいガスや電気が作れるのでしょうか？"
    }
  },
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
h1{
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem auto 0rem;
}
h2 {
  margin: 0.5rem auto 3rem;
  font-weight: bold;
  font-size: 1rem;
}

</style>
