import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_API_URL

var GRANT_TYPE     = process.env.VUE_APP_GRANT_TYPE
var CLIENT_ID      = process.env.VUE_APP_CLIENT_ID
var CLIENT_SECRET  = process.env.VUE_APP_CLIENT_SECRET

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
  },
  getters: {
  
  },
  mutations: {
    login(state, token) {
      state.token = token
    },
  },
  actions: {
    register(context, data) {
        return new Promise((resolve, reject) => {
            axios.post('api/insert', {
                name: data.name,
                email: data.email,
                password: data.password,
            }).then(res =>{
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    login(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('oauth/token', {
            username: credentials.username,
            password: credentials.password,
            grant_type: GRANT_TYPE,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        })
          .then(response => {
            const token = response.data.access_token
            const refresh_token = response.data.refresh_token
            localStorage.setItem('access_token', token)
            localStorage.setItem('refresh_token', refresh_token)

            context.commit('login', token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        })
    },

    registerParticipant(context, data){
        return new Promise((resolve, reject) => {
            axios.post('api/participant/insert', {
                name: data.name,
                email: data.email,
            })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        })
    },

    logout(){
      return new Promise((resolve, reject) =>{
        axios.get('api/user/logout')
        .then(response => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
})