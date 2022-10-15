<template>
  <div class="page">
    <h1>内臓発電シミュレーター</h1>
    <h2>内臓の分解でどれくらいガスが作れるでしょうか？</h2>
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
        <p>一年間で生産できるガス量は<span class="bold">{{amount_gas.toLocaleString()}}㎥</span><br/>節約できるガス料金は<span class="bold">{{SimulatedSavingsEnergyCost.toLocaleString()}}円/年</span>です。</p>
        <!-- <p>同じく一年間で生産できる電気量は<span class="bold">{{amount_electricity.toLocaleString()}}kWh</span>、節約できる電気料金は<span class="bold">{{SimulatedSavingElectricityCost.toLocaleString()}}円/年</span>です。電気だとエネルギー効率が落ちるためガスでお使いいただくことをおすすめしております。</p> -->
        <p>現在の産業廃棄費用は{{allcost_garbage.toLocaleString()}}円、<br/>節約できる産業廃棄費用は<span class="bold">{{SimulatedSavingGarbageCost.toLocaleString()}} 円/年</span>です。</p>
        <p>概算になりますので、詳しいお見積りはご相談の際に共有させていただきます。</p>
        <p class="mt-4">deerveryone@gmail.com</p>
        <p>070-8380-0865</p>
      </div> 
      <b-button @click="simulate" v-if="!is_generate" type="is-primary">計算する</b-button>
      <b-button @click="reset" v-if="is_generate" type="is-primary is-light">リセットする</b-button>            
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
  props: {
    msg: String,    
  },  
  data() {
            return {
              // input data
              deer_numbers:150,
              average_weight:60,
              garbage_ratio_percent:65,              
              ingridient_ratio_percent:30,              
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

              //contact component つくりたい,
              txtData: "",
              address1: 'メールアドレス',
              address2: '@co.jp',
              address: this.address1+this.address2,
              subject: '○○の件について',
              body: 'メール本文' + '%0D%0A' + this.txtData,
              
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
    amount_gas: function(){
      return Math.round(this.amount_ingridient * this.dry_weight *  this.vs_ratio * this.ratio_metan); //(m3) 
    },
    amount_electricity: function(){
      return Math.round(this.amount_gas*37000*0.25/3600)
    },
    allcost_garbage: function(){
      return Math.round(this.gabage_amount * this.unitcost_garbage);
    },
    // output    
    SimulatedSavingGarbageCost: function(){
      return Math.round(this.allcost_garbage * this.ingridient_ratio);
    },
    SimulatedSavingsPropangasCost: function(){
      return Math.round(this.amount_gas * this.unitcost_propangas);
    },
    SimulatedSavingsCitygasCost: function(){
      return Math.round(this.amount_gas * this.unitcost_citygas);        
    },
    SimulatedSavingElectricityCost: function(){
      return Math.round(this.amount_electricity * 30);
    },
    SimulatedSavingsEnergyCost: function(){

      if(this.gas_type=="city"){          
          return this.SimulatedSavingsCitygasCost;                    
        }else if(this.gas_type=="propan"){          
          return this.SimulatedSavingsPropangasCost;          
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
        this.SimulatedSavingsEnergyCost= "???";
        this.is_generate = false;
        
      },

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
.gas_change{
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
