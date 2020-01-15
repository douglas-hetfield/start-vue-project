import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login/index.vue';
import dashboard from '../components/dashboard/';
import fullComponent from '../components/layout/fullComponent';

Vue.use(Router)

const routes = [
	
	{
		name: 'login',
		path: '/',
		component: login
	},
	{
		path: '',
		component: fullComponent,
		children: [
			{
				name: 'dashboard',
				path: '/dashboard',
				component: dashboard,
				meta: {
					requiresAuth: true,
				},

			},
			{
				name: 'menu',
				path: '/menu',
				meta: {
					requiresAuth: false
				}
			}
		]
	}
		
]

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
	if(to.matched.some(route => route.meta.requiresAuth)) {
		if(localStorage.getItem("access_token") == null) {
			next({ path: '/login' });
			router.push('/') 
		}
	}
	next();
});

export default router
