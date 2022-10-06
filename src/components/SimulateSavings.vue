<template>
  <div class="simulate">
    
    
      <b-field label="年間処理頭数（頭/年） " >
          <b-input type="number" v-model="deer_numbers"></b-input>
      </b-field>      
      
      <b-field label="一頭当たり平均重量（kg/年）" >
          <b-input type="number" v-model="average_weight"></b-input>
      </b-field> 
        
      
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
      <b-field label="詳細入力モード">
            <b-switch v-model="isDetail"></b-switch>
      </b-field>
      <section class="ingridient_ratio" v-show="isDetail">
        <b-field label="現在の一頭当たりの廃棄量の割合（％）">
            <b-slider v-model="garbage_ratio_percent"></b-slider>
        </b-field>
        
        <b-field label="導入時の一頭当たりの投入可能内臓量の割合（％）">
            <b-slider v-model="ingridient_ratio_percent"></b-slider>
        </b-field>      
      </section> 
      <div class="generated" v-show="is_generate">
        <p>節約できる金額は{{SimulatedSavingsEnergyCost}}円/年です。</p>
        <p>概算になりますので、詳しいお見積りはご相談の際に共有させていただきます。</p>
        <b-button @click="contact" type="is-primary is-light">お問い合わせはこちら</b-button>
      </div> 
      <b-button @click="simulate" type="is-primary">計算する</b-button>
      <b-button @click="reset" type="is-primary is-light">リセットする</b-button>            
           
      
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
              // input data
              deer_numbers:150,
              average_weight:60,
              garbage_ratio_percent:70,              
              ingridient_ratio_percent:50,              
              unitcost_garbage:35,
              unitcost_propangas: 690,
              unitcost_citygas: 250,
              // var
              dry_weight: 0.3,
              vs_ratio: 0.8,
              vs_weight: false,
              ratio_metan: 0.527,
              // function
              is_generate:false,
              gas_type: "propan",
              // SimulatedSavingsEnergyCost: "???",
              isDetail: false,
            }
        },
  computed:{
    garbage_ratio:function(){
        return this.garbage_ratio_percent/100
    },
    ingridient_ratio:function(){
        return this.ingridient_ratio_percent/100
    },
    gabage_amount: function(){
      return this.deer_numbers * this.average_weight * this.garbage_ratio;
    },
    amount_ingridient: function(){
      return this.deer_numbers * this.average_weight * this.ingridient_ratio;
    },
    allcost_garbage: function(){
      return this.gabage_amount * this.unitcost_garbage;
    },
    amount_gas: function(){
      return this.amount_ingridient * this.dry_weight *  this.vs_ratio * this.ratio_metan //(m3) 
    },
    // output
    SimulatedSavingGarbageCost: function() {
      return Math.round(this.allcost_garbage * this.ingridient_ratio);
    },
    SimulatedSavingsPropangasCost: function(){
      return Math.round(this.amount_gas * this.unitcost_propangas);
    },
    SimulatedSavingsCitygasCost: function(){
      return Math.round(this.amount_gas * this.unitcost_citygas);        
    },
    SimulatedSavingsEnergyCost: function(){

      if(this.gas_type=="city"){          
          return this.SimulatedSavingsCitygasCost.toLocaleString();                    
        }else if(this.gas_type=="propan"){          
          return this.SimulatedSavingsPropangasCost.toLocaleString();          
        }else{
          return "大変申し訳ございません。エラーが発生しました。"
        }
    }
  },
  methods : {
      simulate:function(){      
        this.is_generate = true;  

        // if(this.gas_type=="city"){
          
        //   this.SimulatedSavingsEnergyCost = this.SimulatedSavingsCitygasCost.toLocaleString();                    
        // }else if(this.gas_type=="propan"){
          
        //   this.SimulatedSavingsEnergyCost = this.SimulatedSavingsPropangasCost.toLocaleString();          
        // }else{
        //   this.SimulatedSavingsEnergyCost = "大変申し訳ございません。エラーが発生しました。"
        // }
        
      },
      reset: function(){
        this.SimulatedSavingsEnergyCost= "???"
      },
      contact: function(){
        this.is_generate = !this.is_generate
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
a {
  color: #42b983;
}
.button{
  margin:1rem auto
}
.gas_change{
  margin: 1rem auto;
}
.generated{
  margin: 4rem auto;
  font-family: bold;
}
.simulate .field{
  width: 100%
}
@media (min-width: 824px) {
  .simulate{
    width: 30%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
}
</style>
