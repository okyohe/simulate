<template>
  <div class="page">
    <h1>雑草発電シミュレーター</h1>
    <h2>{{AmountHouses}}世帯を賄うのに必要な雑草はどのくらいでしょうか？</h2>
    <div class="simulate">      
      <b-field class="mt-4" label="世帯数">
          
          <b-input type="number" v-model="AmountHouses"></b-input>
      </b-field>            
      <div class="generated" v-show="is_generate">        
        <p>一年間で必要な雑草の収穫/投入量は<span class="bold">{{AmountWeed.toLocaleString()}}トン</span>です。</p>
        <p>これはイタドリが生えている空地{{AmountSquare.toLocaleString()}}㎡分です。</p>
        <p>これは{{Math.sqrt(AmountSquare).toLocaleString()}}m四方の土地になります。</p>
      </div>
      <div class="generated" v-show="is_generate">
        <p>一年間で生産できるガス量は<span class="bold">{{AmountGas.toLocaleString()}}㎥</span>です。</p>
        <p>プロパンガス<span class="bold">{{PriceGas.toLocaleString()}}円</span>分です。</p>        
        <p>概算になりますので、詳しいお見積りはご相談の際に共有させていただきます。</p>
        <p class="mt-4">deerveryone@gmail.com</p>
        <p>070-8380-0865</p>
      </div> 
      
      <b-button @click="is_generate = true;" v-if="!is_generate" type="is-primary">試算する</b-button>
      <b-button @click="is_generate = false;" v-if="is_generate" type="is-primary is-light">リセットする</b-button>            
    </div>      
  </div>
</template>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

export default {
  name: 'SimulateWeed',
  props: {
    msg: String,    
  },  
  data() {
            return {

              // input data            
              // var
              AmountHouses:60,           
              GasPerWeed: 60, //per ton
              ConsumptionGas: 365, //per house
              SquarePerTon: 625, // ㎡ per ton
              
              // function
              
              is_generate:false,
              calc_type: "weight",              
              isDetail: false,
            }
        },
  computed:{      
    AmountGas: function(){
      return Math.round(this.AmountHouses * this.ConsumptionGas)                            
    },    
    AmountWeed:function(){//per year
      return Math.round(this.AmountGas / this.GasPerWeed)
    },
    AmountSquare: function(){
      return Math.round(this.AmountWeed * this.SquarePerTon)
    },
    PriceGas: function(){
      return Math.round(this.AmountGas * 690) //yen
    }
    // output            
  }
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
  margin: 1rem auto;
  font-weight: bold;
  font-size: 1rem;
}
.simulate{
  margin: auto 2rem;
  
  
}


h3 {
  margin: 2rem 0 3rem;
  font-weight: bold;
  font-size: 2rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.generated{
  margin: 0.5rem auto;
  font-family: bold;
  background-color: #f5eeff ;
  border-radius: 5%;
  padding: 2rem;
}
.bold{
  font-weight: bold;
}


@media (min-width: 824px) {
  .simulate{
    width: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
}
</style>
