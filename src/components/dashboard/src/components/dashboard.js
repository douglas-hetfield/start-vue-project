
export default {
  name: 'dashboard',
  components: {},
  props: [],
  data () {
    return {
      name: null,
      email: null
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    register(){
      this.$store.dispatch('registerParticipant', {
        name: this.name,
        email: this.email,
      })
      .then(response => {
        response
        alert('participante cadastrado com sucesso!')
      },
      error => {
        alert('Ops, aconteceu algum erro ao cadastrar.')
        console.log(error);
      })
    },

    logout: function() {
      this.$store.dispatch('logout').then(response =>{
        console.log(response)
        if(response['data']['success'] == true){
          alert("deslogado com sucesso!")
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          this.$router.push('/') 
        }else{
          alert("Ops.. não foi possivel deslogar ; (")
        }
      
      })
    }
  }
}


