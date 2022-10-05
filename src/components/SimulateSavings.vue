<template>
  <div class="simulate">
    
    
      <b-field label="年間処理頭数（頭/年） " >
          <b-input type="number" v-model="deer_numbers"></b-input>
      </b-field>      
      
      <b-field label="一頭当たり平均重量（kg/年）" >
          <b-input type="number" v-model="average_weight"></b-input>
      </b-field> 
      <section class="ingridient_ratio">
        <b-field label="一頭当たりの廃棄量の割合（％）">
            <b-slider v-model="garbage_ratio"></b-slider>
        </b-field>
        
        <b-field label="一頭当たりの投入可能内臓量の割合（％）">
            <b-slider v-model="ingridient_ratio"></b-slider>
        </b-field>      
      </section>   
      
      <b-field label="廃棄単価（円/kg）">
        <b-input type="number" v-model="unitcost_garbage"></b-input>
      </b-field> 
      <div class="gas_change">
        <b-radio v-model="gas_type" native-value="city" name="gas_type">
            都市ガス
        </b-radio>
        <b-radio v-model="gas_type" native-value="propan" name="gas_type">
            プロパンガス
        </b-radio>        
      </div>
   
      
      <b-field label="プロパンガス単位料金（円/㎥）" v-show="gas_type=='propan'">
        <b-input type="number" v-model="unitcost_propangas"></b-input>
      </b-field>
      <b-field label="都市ガス単位料金（円/㎥）" v-show="gas_type=='city'">
        <b-input type="number" v-model="unitcost_citygas"></b-input>
      </b-field>      
      <b-button @click="simulate" type="is-primary">計算する</b-button>
      <b-message 
            title="節約できる金額" 
            type="is-success" 
            aria-close-label="結果を消す"
            v-show="is_generate">
            ”シカくん初号機”を導入することで節約できる光熱費は 約{{SimulatedSavingsEnergyCost}}円です。※概算になるため、詳しいお見積りはヒアリング後にさせて頂きます。
            <b-button @click="contact" type="is-success">お問い合わせはこちら</b-button>
        </b-message>
  </div>
</template>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

export default {
  name: 'SimulateSavings',
  props: {
    msg: String,    
  },
  data() {
            return {
                value: 5,
                deer_numbers:150,
                average_weight:60,
                garbage_ratio:0.7,
                ingridient_ratio:0.5,
                unitcost_garbage:35,
                gas_type: "propan",
                unitcost_citygas: 250,
                unitcost_propangas: 690,
                is_generate:false,
                SimulatedSavings:false,
                amount_gas:false,
                gabage_amount:false,
                ingridient_amount:false,
                allcost_garbage:false,
                SimulatedSavingGarbageCost:false,
                SimulatedSavingsPropangasCost:false,
                SimulatedSavingsCitygasCost:false

            }
        },   
  methods : {
      simulate(){      
        this.is_generate = true;
        this.gabage_amount = this.deer_numbers * this.average_weight * this.garbage_ratio;
        this.ingridient_amount = this.deer_numbers * this.average_weight * this.ingridient_ratio;
        this.allcost_garbage = this.gabage_amount * this.unitcost_garbage;
        this.amount_gas = this.ingridient_amount * 0.3 * 1000 * 0.8 * 0.527 / 1000 //(m3) 
        this.SimulatedSavingGarbageCost = this.allcost_garbage * this.ingridient_ratio;
        this.SimulatedSavingsPropangasCost = this.amount_gas * this.unitcost_propangas;
        this.SimulatedSavingsCitygasCost = this.amount_gas * this.unitcost_citygas;
        
        
        if(this.gas_type=="city"){
          this.SimulatedSavingsEnergyCost = this.SimulatedSavingsCitygasCost.toLocaleString();          
          
        }else if(this.gas_type=="propan"){
          this.SimulatedSavingsEnergyCost = this.SimulatedSavingsPropangasCost.toLocaleString();
          
        }else{
          this.SimulatedSavingsEnergyCost = "大変申し訳ございません。エラーが発生しました。"
        }
        
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.simulate{
  margin: auto 2rem;
  
  
}
.ingridient_ratio{
  display: none
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
a {
  color: #42b983;
}
.button{
  margin:1rem auto
}
.gas_change{
  margin: 1rem auto;
}
@media (min-width: 824px) {
  .simulate{
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
}
</style>
