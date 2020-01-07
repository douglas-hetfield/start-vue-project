<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './globalScss.scss'
import login from './components/login/index.vue'

Vue.use(BootstrapVue)

export default {
  name: 'app',
  components: {
    login
  }
}
</script>