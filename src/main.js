import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios'; 
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(axios, BootstrapVue);

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
