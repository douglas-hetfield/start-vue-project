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
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    login(){
      this.$store.dispatch('login', {
        username: this.email,
        password: this.password,
      })
      .then(response => {
        console.log(response)
        this.$router.push('dashboard') 
      })
    },

    signup(){
      this.$store.dispatch('register', {
        name: this.name,
        email: this.cemail,
        password: this.cpassword,
      })
      .then(response => {
        console.log(response)
        alert('Cadastrado com sucesso!')
      },
      error => {
        alert('Ops, aconteceu algum erro ao cadastrar.')
        console.log(error);
      })
    
    }
  }
}


