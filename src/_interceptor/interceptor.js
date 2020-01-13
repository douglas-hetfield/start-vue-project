import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router/index';


axios.interceptors.request.use(request =>{
  if(localStorage.getItem('access_token') != null){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  }
  return request;
})

axios.interceptors.response.use(response => {
  if(response.data.access_token != null){
    let expires_in = Date.now() + response.data.expires_in;
    
    localStorage.setItem('expires_in', expires_in);
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

  }
  return response;

}, error => {
  
  const {
    response: {status, data, config}
  } = error;

  if(status == 401 && data.message == "Unauthenticated."){
    let expires_in = localStorage.getItem('expires_in')
    
    if(Date.now() > expires_in){
      localStorage.removeItem('access_token')
      localStorage.removeItem('expires_in')

      axios.post('oauth/token', {
        grant_type    : 'refresh_token',
        refresh_token : localStorage.getItem('refresh_token'),
        client_id     : process.env.VUE_APP_CLIENT_ID,
        client_secret : process.env.VUE_APP_CLIENT_SECRET,
        scope         : ''
      }).then(res => {
        console.log("refresh")
        localStorage.setItem('expires_in', (Date.now() + res.data.expires_in));
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token
        
        return axios.request(config)
        
      }).catch(() => {
        console.log("erro refresh token expirado")

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('expires_in')
        router.push('/')
      });

    }
  }

})



const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
  },

  query (resource, params) {
    return axios
      .get(resource, params)
      .catch((error) => {
        throw new Error(`[RFOOD] ApiService ${error}`)
      })
  },

  get (resource, slug = '') {
    return new Promise((resolve, reject) => {
      axios.get(`${resource}/${slug}`).then(res => {
        console.log(res);
        resolve(res)
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },

  post (resource, params) {
    return axios.post(`${resource}`, params)
  },

  upload (resource, params) {
    return axios.post(`${resource}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).catch(error => {
      if(error.response.status == 401){
        console.log(error);
        // this.refreshToken();
      }else{
        console.log(error);
      }
    })
  },

  update (resource, params) {
    return axios.put(`${resource}`, params)
  },

  put (resource, params) {
    console.log(resource)
    return axios
      .put(`${resource}`, params)
  },

  delete (resource) {
    return axios
      .delete(resource)
      .catch((error) => {
        throw new Error(`[RFOOD] ApiService ${error}`)
      })
  },

  refreshToken(){
    axios.post('oauth/token/refresh', {
      token: localStorage.getItem('refresh_token')
    }).then(response => {
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('expires_in', response.data.expires_in)
      localStorage.setItem('refresh_token', response.data.refresh_token)
    }).catch(error => {
      console.log(error)
    })
  },

}

export default ApiService


