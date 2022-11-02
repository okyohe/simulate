<template>
  <div>
    <p class="menu">
        <router-link to="/OurPassion">
            私たちの想い
        </router-link> | 
        <!-- <router-link to="/SimulateSavings">
            鹿の内臓を活用をしたい方
        </router-link> |  -->
        <router-link to="/SimulateBiogas">
            空き地を活用したい方
        </router-link>
        <router-link to="/SimulateWeed"> | 
            世帯数から必要な雑草量を計算する
        </router-link>
    </p>
</div>
</template>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

export default {
    name: 'MenuBar',
    data(){

    }
}
</script>

<style>
.menu{
    display: block;    
    background-color: #f5eeff;
    margin: 2rem auto;
    padding: 2rem;
}
</style>
