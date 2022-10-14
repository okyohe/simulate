<template>
  <div class="page">
    <h1>日本シカ発電</h1>
    <h2>未利用資源から新たな循環をつくる</h2>
    <div class="slide">
      <h2>簡易説明資料</h2>      
      <iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b2b1680dcf62490684492819e4fd6ee7" title="日本シカ発電_超簡易説明資料" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"  data-ratio="1.78343949044586"></iframe>
    </div>
    
    

  </div>
</template>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

export default {
  name: 'SimulateSavings',  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
iframe{
  border: 0px; 
  background: padding-box padding-box rgba(0, 0, 0, 0.1); 
  margin: 0px; 
  padding: 0px; 
  border-radius: 6px; 
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; 
  max-width: 100%; 
  width: 560px;
  height: 314px;
}
</style>
