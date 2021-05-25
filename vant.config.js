import {
	Skeleton,
	Empty,
	Icon,
	Swipe,
	SwipeItem,
	RadioGroup,
	Radio,
	IndexBar, 
	IndexAnchor,
	Cell,
	Circle,
	Lazyload,
	PullRefresh,
	Toast,
	Search,
	Rate,
	ImagePreview,
	Collapse, 
	CollapseItem,
	Sticky,
	Tab, 
	Tabs,
	Loading,
	ActionSheet,
	Divider,
	Field,
} from 'vant'
const vants = [Skeleton, Empty, Icon, Swipe, SwipeItem, RadioGroup, Radio,IndexBar, IndexAnchor ,Cell ,Circle, Lazyload,PullRefresh,Toast,Search,Rate,ImagePreview,Collapse, CollapseItem,Sticky,Tab,Tabs,Loading,ActionSheet,Divider,Field]

export default {
	/**
	 * Vue.use 方法会自动调用install函数
	 * Install Vant Component plugin
	 * @param Vue
	 */
	install(Vue) {
		vants.forEach(Component => {
			Vue.use(Component)
		})
	}

}
