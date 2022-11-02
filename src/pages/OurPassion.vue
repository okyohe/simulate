<template>
  <div class="page">
    <h1>鹿ガス</h1>
    <h2>鹿の力で、雑草を再生可能エネルギーに。</h2>
    <div class="slide">
      <h3>簡易説明資料</h3>
            
      <iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/fbc68e9c34e14aebba8df644e4b154d5" title="シカくん初号機" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"  data-ratio="1.78343949044586"></iframe>
    </div>
    <div class="slide">
      <h3>お問い合わせ</h3>
      <p>詳しくはこちらからご連絡ください</p>
      <p><a mailto="deerveryone@gmail.com">メール</a></p>   
      <p><a href="https://www.facebook.com/yohei.watanabe.12/">Facebookメッセンジャー</a></p>
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
  margin: 0rem auto;
}
h2 {
  margin: 0.5rem auto 1rem;
  font-weight: bold;
  font-size: 1rem;
}
h3 {
  margin: 3rem auto 1rem;
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
