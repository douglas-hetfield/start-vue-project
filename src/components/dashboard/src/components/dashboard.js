
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
  }
}


