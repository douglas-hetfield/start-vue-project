import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import interceptor from '../_interceptor/interceptor'
import { promised } from 'q'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_API_URL

var GRANT_TYPE     = process.env.VUE_APP_GRANT_TYPE
var CLIENT_ID      = process.env.VUE_APP_CLIENT_ID
var CLIENT_SECRET  = process.env.VUE_APP_CLIENT_SECRET

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    filter: 'all',
    todos: [],
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
    },
    todosFiltered(state) {
      if (state.filter == 'all') {
        return state.todos
      } else if (state.filter == 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    retrieveTodos(state, todos) {
      state.todos = todos
    },
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
    clearTodos(state) {
      state.todos = []
    },
  },
  actions: {
    clearTodos(context) {
      context.commit('clearTodos')
    },


    register(context, data) {
      let isRefresh = false;
      if(isRefresh == false){
        isRefresh = true;
        return new Promise((resolve, reject) => {
            interceptor.post('api/insert', {
                name: data.name,
                email: data.email,
                password: data.password,
            }).then(res =>{
                resolve(res)
                isRefresh = false;
            }).catch(error => {
                reject(error)
            })
        })
      }
    },


    destroyToken(context) {
        if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
              // console.log(response);
              // context.commit('addTodo', response.data)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },



    retrieveToken(context, credentials) {
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

            context.commit('retrieveToken', token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        })
    },

    refresh_token: () =>{
      return new promised((resolve, reject) => {
        interceptor.post('token/refresh').then(res =>{
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },

    registerParticipant(context, data){
      console.log(data);
        return new Promise((resolve, reject) => {
            interceptor.post('api/participant/insert', {
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
        interceptor.get('api/user/logout')
        .then(response => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('expires_in')
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

    retrieveTodos(context) {
        axios.get('/todos')
        .then(response => {
          context.commit('retrieveTodos', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    
    
    
    updateTodo(context, todo) {
      axios.patch('/todos/' + todo.id, {
        title: todo.title,
        completed: todo.completed,
      })
        .then(response => {
          context.commit('updateTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTodo(context, id) {
      axios.delete('/todos/' + id)
        .then(response => {
            console.log(response)
            context.commit('deleteTodo', id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    
  }
})