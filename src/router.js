import Vue from 'vue'
import Router from 'vue-router'


import SimulateSavings from './pages/SimulateSavings.vue'
import OurPassion from './pages/OurPassion.vue'

Vue.use(Router)

export default new Router({
  routes: [    
    { path: '/OurPassion', component: OurPassion, PageTitle:"VISION" },
    { path: '/SimulateSavings', component: SimulateSavings, PageTitle:"VISION"  }
  ]
})