import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios'; 
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueAlertify from 'vue-alertify';
import store from './store/store'
import interceptor from './_interceptor/interceptor'

Vue.use(VueAlertify, {
  glossary: {
    title: 'Yschool',
    ok: 'OK',
    cancel: 'Cancelar',
  }
});
Vue.use(axios, BootstrapVue);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  interceptor,
  router,
  store: store,
  
  mounted(){
  },
  data: {
  },
  methods: {
  }

}).$mount('#app')
