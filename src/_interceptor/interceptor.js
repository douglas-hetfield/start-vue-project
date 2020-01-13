import axios from 'axios'
import router from '../router/index';

axios.interceptors.request.use(request =>{
  if(localStorage.getItem('access_token') != null){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  }
  return request;
})

axios.interceptors.response.use(response => {
  console.log("Interceptor running >>>")
  if(response.data.access_token != null){
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
    localStorage.removeItem('access_token')

    axios.post('oauth/token', {
      grant_type    : 'refresh_token',
      refresh_token : localStorage.getItem('refresh_token'),
      client_id     : process.env.VUE_APP_CLIENT_ID,
      client_secret : process.env.VUE_APP_CLIENT_SECRET,
      scope         : ''
    }).then(res => {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token
      config.headers.Authorization = 'Bearer ' + res.data.access_token
      return axios.request(config)
      
    }).catch(() => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expires_in')
      router.push('/')
    });
  }
})

