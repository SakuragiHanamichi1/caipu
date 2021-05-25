import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import List from '../components/List'
import More from '../components/More'
// import VideoMenu from '../view/home/VideoMenu'
import Box from '../components/Box'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Box,
		children: [
			{
				path: '/',
				component: Home,
			},
			{
				path: '/list',
				component: List,
			},
			{
				path: '/more',
				component: More,
				name:"More"
			},
			{
				path: '/refuseclassification/',
				component: () => import('../components/RefuseClassification'),
				name: "RefuseClassification"
			},
			// {
			// 	path: '/subjectfour',
			// 	name: 'SubjectFour',
			// 	// props: true,
			// 	component: () => import('../components/test/SubjectFour')

			// }
		]
	},

	{
		path: '/videomenu',
		component: () => import('../view/home/VideoMenu'),
		name: "VideoMenu"
	},
	{
		path: '/menudetails/:id',
		component: () => import('../view/MenuDetails'),
		name: "MenuDetails"
	},
	{
		path: '/listdetails/:title/:name',
		component: () => import('../view/ListDetails'),
		name: "ListDetails"
	},
	{
		path: '/searchlist',
		component: () => import('../view/SearchList'),
		name: "SearchList"
	},
	{
		path: '/searchresult/:title',
		component: () => import('../view/SearchResult'),
		name: "SearchResult"
	},
	{
		path: '/indexlogin',
		component: () => import('../view//login/IndexLogin'),
		name: "IndexLogin",
		children: [
			{
				path: '/login',
				component: () => import('../view//login/Login'),
				name:"Login"
			},
			{
				path: '/zhuce',
				component: () => import('../view//login/ZhuCe'),
				name:"ZhuCe"
			}
		]
	},
	{
		path: '/refusedetail/:title',
		component: () => import('../view/RefuseDetail'),
		name: "RefuseDetail"
	},

]

let router = new VueRouter({ // 初始化VueRouter
	mode: 'history',
	routes,
	linkActiveClass: "actived",
	linkExactActiveClass: "exact-actived"

})
export default router