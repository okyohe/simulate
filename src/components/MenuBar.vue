<template>
  <div>
    <p class="menu">
        <router-link to="/OurPassion">
            私たちの想い
        </router-link> | 
        <router-link to="/SimulateSavings">
            バイオガス生産量シミュレーター
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
