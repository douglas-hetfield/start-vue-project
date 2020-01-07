import Axios from "axios"


export default {
  name: 'login',
  components: {},
  props: [],
  data () {
    return {
      name: '',
      email: '',
      cemail: '',
      password: '',
      cpassword: '',
      status: null,
      API_URL: null,
      GRANT_TYPE: null,
      CLIENT_ID: null,
      CLIENT_SECRET: null
    }
  },
  computed: {

  },
  mounted () {
    //variáveis do .env deve ser resgatadas neste metodo!
    this.API_URL        = process.env.VUE_APP_API_URL 
    this.GRANT_TYPE     = process.env.VUE_APP_GRANT_TYPE
    this.CLIENT_ID      = process.env.VUE_APP_CLIENT_ID
    this.CLIENT_SECRET  = process.env.VUE_APP_CLIENT_SECRET
  },
  methods: {
    login(){
      const data = {
        grant_type: this.GRANT_TYPE,
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        username: this.email,
        password: this.password,
      };
      
      console.log(data);
      Axios.post(this.API_URL + 'oauth/token', data).then(res => {
        localStorage.setItem('currentToken', btoa(JSON.stringify(res['data']['access_token'])));
        this.$router.push('dashboard') 
      }
      , error => {
        console.log(error);
        this.status = "Ops... algo deu errado, verifique seu Email e Senha!";
        
      });
    },

    signup(){
      const data = {
        grant_type: this.GRANT_TYPE,
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        name: this.name,
        username: this.cemail,
        password: this.cpassword,
      };

      Axios.post(this.API_URL + 'oauth/clients', data).then(res => {
        alert("usuario cadastrado com sucesso!");
        console.log(res);
      },
      error =>{
        alert("ops... parece que temos algum problema");
        console.log("erro: "+ error)
      });
    }
  }
}


