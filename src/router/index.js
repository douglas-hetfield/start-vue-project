import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login/index.vue';
import dashboard from '../components/dashboard/';

Vue.use(Router)

const routes = [
	{
		name: 'login',
		path: '/',
		component: login
	},
	{
		name: 'dashboard',
		path: '/dashboard',
		component: dashboard
	}
]

const router = new Router({ routes })

export default router