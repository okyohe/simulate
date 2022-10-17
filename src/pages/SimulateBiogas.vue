<template>
  <div class="page">
    <h1>雑草発電シミュレーター</h1>
    <h2>雑草からどれくらいガスや電気が作れるのでしょうか？</h2>
    <div class="simulate">
      <div class="type_change">
        <b-radio v-model="calc_type" native-value="area" name="calc_type">
          {{LabelArea}}
        </b-radio>
        <b-radio v-model="calc_type" native-value="weight" name="calc_type">
          {{LabelWeight}}
        </b-radio>        
      </div>
      <b-field class="field" v-if="calc_type=='area'">
          <b-input v-model="AmountArea"></b-input>
      </b-field>      
      
      <b-field class="field" v-if="calc_type=='weight'">
          <b-input v-model="AmountCrop"></b-input>
      </b-field>          
      <div class="generated" v-show="is_generate">        
        <p>一年間で生産できるガス量は<span class="bold">{{amount_gas.toLocaleString()}}㎥</span>です。</p>
        <p>同じく一年間で生産できる電気量は<span class="bold">{{amount_electricity.toLocaleString()}}kWh</span>、節約できる電気料金は<span class="bold">{{SimulatedGeneratingElectricityCost.toLocaleString()}}円</span>です。</p>       
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
  name: 'SimulateBiogas',
  props: {
    msg: String,    
  },  
  data() {
            return {
              // label data 
              LabelArea: "収穫可能面積（ha）",
              LabelWeight: "収穫重量（t/日）",
              // input data            
              AmountArea: 10,
              AmountCrop: 1.97,
              // var
              VarHa: 1000,
              VarKg: 1000,
              VarYear: 365,
              // function
              
              is_generate:false,
              calc_type: "weight",              
              isDetail: false,
            }
        },
  computed:{      
    amount_gas: function(){
      if(this.calc_type=="area"){          
          return this.AmountArea * 0.2664 * this.VarHa * this.VarYear;                    
        }else if(this.calc_type=="weight"){          
          return this.AmountCrop * 0.074 * this.VarKg * this.VarYear;          
        }else{
          return "大変申し訳ございません。エラーが発生しました。"
        }
    },
    amount_electricity: function(){
      return Math.round(this.amount_gas*37000*0.25/3600)
    },

    // output        
    SimulatedGeneratingElectricityCost: function(){
      return Math.round(this.amount_electricity * 30);
    },
    SimulatedGeneratingEnergy: function(){

      if(this.calc_type=="area"){          
          return this.SimulatedSavingsCitygasCost;                    
        }else if(this.calc_type=="weight"){          
          return this.SimulatedSavingsPropangasCost;          
        }else{
          return "大変申し訳ございません。エラーが発生しました。"
        }
    }
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
  margin: 0.5rem auto 3rem;
  font-weight: bold;
  font-size: 1rem;
}
.simulate{
  margin: auto 2rem;
  
  
}
.ingridient_ratio{
  /* display: none */
  margin:1.5rem auto;
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

.button{
  margin:1rem auto
}
.type_change{
  margin: 1rem auto;
}
.generated{
  margin: 1rem auto;
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
