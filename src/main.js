import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios'; 
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store/store'
import interceptor from './_interceptor/interceptor'


Vue.use(axios, BootstrapVue);

Vue.config.productionTip = false

// let isRefreshing = false;
// let subscribers = [];



// axios.interceptors.response.use(response => {
//   console.log("resposta")
//   console.log(response)
//   return response;
// }, error => {
//   const {
//     config,
//     response: {status, data}
//   } = error;
  
//   const originalRequest = config;

//   if(data.message === "Missing token"){
//     router.push({name: "login"});
//     return new Promise.reject(false);
//   }

//   if(originalRequest.url.includes("login_check")){
//     return Promise.reject(error);
//   }

//   if(status === 401){
//     if(!isRefreshing){
//       isRefreshing = true;
//       store.dispatch("refresh_token").then(({status}) => {
//         if(status === 200 || status == 204){
//           isRefreshing = false;
//         }
//         subscribers = [];
//       }).catch(error => {
//         console.log(error);
//       });
//     }

//     const requestSubscribers = new Promise(resolve => {
//       subscribeTokenRefresh(() => {
//         resolve(axios(originalRequest));
//       })
//     })

//     onRefreshed();
//     return requestSubscribers;
//   }
// })

// function  subscribeTokenRefresh(cb) {
//   subscribers.push(cb);
// }

// function onRefreshed() {
//   subscribers.map(cb => cb());
// }

// subscribers = [];

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
