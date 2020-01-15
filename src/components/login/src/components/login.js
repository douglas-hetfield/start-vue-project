export default {
  
  name: 'login',
  components: {},
  props: [
    
  ],
  data () {
    return {
      //variáveis de componentes HTML
      errors: [],
      submitted: false,
      disableSendButton: false,
      errorCredentials: false,
      rememberForm: false,

      //variáveis para tratamento de dados
      email: '',
      password: '',

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    rememberPassword(){
      if(!this.rememberForm){
        this.rememberForm = true
      }else{
        this.rememberForm = false
      }
    },
    checkform(){
      if(!(this.email && this.password)){
        this.disableSendButton = false
      }else{
        this.disableSendButton = true
      }
    },
      
    login(){
      this.$store.dispatch('login', {
        username: this.email,
        password: this.password,
      })
      .then(() => {
        this.$alertify.success("Logado com sucesso!")
        this.$router.push('dashboard') 
      }).catch(() => {
        this.errorCredentials = true
      })
    }
  }
}
