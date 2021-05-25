<template>
	<div class="menudetails">
		<van-sticky>
			<div class="header">
				<div class="back iconfont" @click="goback">&#xe67c;</div>
				<div>
					<h2>菜谱详情</h2>
				</div>
				<div class="right">
					<i @click="GoStart" class="iconfont">&#xe65a;</i>
				</div>
			</div>
		</van-sticky>
		<van-empty description="加载中..." v-show="!ShowAll" />

		<div class="content" v-show="ShowAll">
			<div v-for="(item, index) in arr" :key="index" class="item">
				<img :src="item.original_photo_path" alt />

				<div class="info">
					<h2>{{ item.title }}</h2>
					<p>
						浏览：{{ item.vc }}
						<span>{{ item.release_time }}</span>
					</p>
					<div class="user">
						<div class="l">
							<img :src="item.author_photo" alt v-lazy="item.author_photo" />
							<p>
								{{ item.user.nick }}
								<span>LV.{{ item.user.lvl }}</span>
							</p>
						</div>
					</div>
					<div class="text" v-if="item.cook_time">
						<span>
							<i class="iconfont">&#xe72a;</i>
							{{ item.cook_time }}
						</span>
						<span>
							<van-rate
								size="14px"
								disabled-color="#83ac7d"
								count="3"
								v-model="value"
								disabled
							/>
							{{ item.cook_difficulty }}
						</span>
					</div>

					<div class="food-list">
						<h2>-食材清单-</h2>
						<ul :class="flag ? 'morehight' : ''">
							<li v-for="(foods, i) in item.major" :key="i">
								<span>{{ foods.title }}</span>
								<span>{{ foods.note }}</span>
							</li>
						</ul>
						<p class="more" @click="More">
							<span v-if="flag">显示更多</span>
							<span v-if="!flag">收起</span>
						</p>
					</div>

					<div class="step">
						<h2>-步骤-</h2>
						<div class="stepitem" v-for="(step, s) in item.cookstep" :key="s">
							<span>
								步骤{{ step.position }}
								<i>/{{ item.cookstep.length }}</i>
							</span>
							<img
								:src="step.image"
								alt
								@click="getImg(s)"
								v-lazy="step.image"
							/>
							<p>{{ step.content }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="totop">
			<div class="gotop" v-show="gotop" @click="toTop">Top</div>
		</div>
	</div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
	name: "ImagePreview ",
	data() {
		return {
			id: 0,
			arr: [],
			value: 1,
			flag: true,
			gotop: false,
			name: "",
			images: [],
			ShowAll: false,
		};
	},

	created() {
		console.log(this.$route.params.id);
	},
	activated() {
		this.id = this.$route.params.id;
		this.GetMenuDetails();
		// this.scrollBehavior();
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		window.pageYOffset = 0;
		this.flag = true;
		this.ShowAll = true;
	},
	methods: {
		onChange(index) {
			this.index = index;
		},
		getImg(s) {
			ImagePreview({
				images: this.images,
				showIndex: true,
				loop: false,
				startPosition: s,
			});
		},
		More() {
			console.log(1);
			this.flag = !this.flag;
		},
		GoStart() {
			//触发mutation必须使用$store所提供的commit方法提交一次mutation
			//commit方法接收两个参数参数一需要触发mutation的同名字符串参数二载荷
			this.$store.commit("Start");
		},
		scrollBehavior(to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition;
			} else {
				return { x: 0, y: 0 };
			}
		},
		GetMenuDetails() {
			this.$axios.get(`/recipe/detail?id=${this.id}`).then((res) => {
				console.log(res.data.result.recipe.cookstep);
				this.arr = res.data.result;
				for (let i = 0; i < res.data.result.recipe.cookstep.length; i++) {
					this.images.push(res.data.result.recipe.cookstep[i].image);
				}
			});
		},
		handleScroll() {
			let scrolltop =
				document.documentElement.scrollTop || document.body.scrollTop;
			scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
		},
		toTop() {
			let top = document.documentElement.scrollTop || document.body.scrollTop;
			// 实现滚动效果
			const timeTop = setInterval(() => {
				document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
				if (top <= 0) {
					clearInterval(timeTop);
				}
			}, 10);
		},
		goback() {
			this.$router.go(-1);
		},
	},
	mounted() {
		// 此处true需要加上，不加滚动事件可能绑定不成功
		window.addEventListener("scroll", this.handleScroll, true);
	},
	// watch: {
	//   arr(val, newval) {
	//     console.log(val.recipe.author, newval.recipe.autho);

	//   }
	// },
	computed: {},
};
</script>
<style lang="scss" scoped>
.menudetails {
	.header {
		display: flex;
		width: 100%;
		padding: 0 6px;
		padding-bottom: 8px;
		padding-top: 8px;
		box-sizing: border-box;
		background-color: #fff;
		div {
			flex: 1;
		}

		h2 {
			color: #a4a4a4;
			text-align: center;
			letter-spacing: 1px;
		}

		.right {
			text-align: right;
		}
	}

	.content {
		.item {
			img {
				display: block;
				width: 100%;
				height: 200px;
				object-fit: cover;
			}

			.info {
				padding: 0 10px;
				box-sizing: border-box;

				h2 {
					font-weight: bold;
					margin: 8px 0;
					font-size: 14px;
					letter-spacing: 1.5px;
				}

				& > p {
					font-size: 12px;
					margin-top: 11px;
					color: #141414;
					span {
						margin-left: 12px;
					}
				}

				.user {
					display: flex;
					margin: 20px 0;

					.l {
						display: flex;
						align-items: center;

						img {
							width: 40px;
							height: 40px;
							border-radius: 50%;
						}

						p {
							font-size: 14px;
							margin: 0 8px;
							letter-spacing: 2px;
							span {
								font-size: 12px;
								font-style: italic;
								font-weight: bold;
								color: #dbbf76;
								margin-left: 5px;
							}
						}
					}
				}
				.text {
					display: flex;
					font-weight: bold;
					span {
						flex: 1;
						text-align: center;
						font-size: 14px;
						.van-rate {
							margin-right: 6px;
						}
					}
				}

				.food-list {
					margin: 30px 0;

					& > h2 {
						color: #535353;
						font-weight: bold;
					}
					.morehight {
						height: 132px;
					}
					ul {
						overflow: hidden;

						li {
							display: flex;
							margin-top: 18px;
							padding: 0 14px;
							padding-bottom: 10px;
							box-sizing: border-box;
							font-size: 14px;
							border-bottom: 1px dotted #b6b6b6;
							span {
								flex: 1;
								letter-spacing: 1.5px;
							}

							& > span:first-of-type {
								color: #83ac7d;
							}
							& > span:nth-of-type(2) {
								color: #707070;
							}
						}
					}

					.more {
						margin-top: 8px;
						text-align: center;
						font-size: 14px;
						letter-spacing: 1px;
						color: #adadad;
					}
				}

				.step {
					& > h2 {
						color: #535353;
					}

					.stepitem {
						span {
							display: inline-block;
							font-size: 14px;
							color: #707070;
							letter-spacing: 2px;
							margin-top: 10px;
							i {
								font-size: 12px;
								color: #adadad;
							}
						}

						img {
							border-radius: 8px;
							margin-top: 16px;
						}

						p {
							margin: 10px 0;
							font-size: 14px;
							line-height: 22px;
						}
					}
				}
			}
		}
	}

	.totop {
		position: fixed;
		right: 8px;
		bottom: 30px;
		.gotop {
			text-align: center;

			cursor: pointer;
			padding: 10px;
			border-radius: 50%;
			background: white;
			color: #000000;
		}
	}
}
</style>
