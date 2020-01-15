
export default {
  name: 'full-component',
  components: {},
  props: [],
  data () {
    return {
      //component HTML
      navbarOpen: false,
      sidebarOpen: true,
      contentbody: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    toggle(){
      console.log("togle")
      if(!this.navbarOpen){
        this.contentbody= true,
        this.navbarOpen = true,
        this.sidebarOpen = false
      }else{
        this.contentbody = false,
        this.navbarOpen = false,
        this.sidebarOpen = true
      }
    },

    logout: function() {
      this.$alertify.confirm("Deseja sair do sistema Yschool?",() => {
          this.$store.dispatch('logout').then(response =>{
            if(response['data']['success'] == true){
              localStorage.removeItem('access_token')
              localStorage.removeItem('refresh_token')
              this.$alertify.success("Deslogado com sucesso!")
              this.$router.push('/') 
            }else{
              this.$alertify.error("Não foi possivel deslogar do sistema, tente novamente.")
            }
          })


        }
      )
    }






  }
}


