<template>
	<div class="refuse-class">
		<div class="banner">
			<img src="../../public/images/timg.jpg" />
			<div>
				<span>
					<input
						type="text"
						placeholder="请搜索"
						@keyup.enter="Search"
						v-model="value"
					/>
					<span class="iconfont" @click="Search">&#xe634;</span>
				</span>
			</div>
		</div>

		<div class="search">
			<div>
				<h3>热门搜索：</h3>
				<div class="hot-r">
					<div v-for="item in arr" :key="item">
						<span @click="Search">{{ item }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- <van-cell is-link title="基础用法" @click="show = true" /> -->
		<div class="new">
			<van-divider>分类小贴士</van-divider>
			<transition name="move">
				<div class="new-item-box">
					<div
						class="new-item"
						v-for="item in refuse"
						:key="item.title"
						@click="GoRefuseD(item.title)"
					>
						<div class="left">
							<i
								class="iconfont"
								v-if="item.title == '湿垃圾'"
								style="color: #d6825d;"
								>&#xe622;</i
							>
							<i
								class="iconfont"
								v-if="item.title == '干垃圾'"
								style="color: #7da0dd;"
								>&#xe604;</i
							>
							<i
								class="iconfont"
								v-if="item.title == '有害垃圾'"
								style="color: #f47f75;"
								>&#xe605;</i
							>
							<i
								class="iconfont"
								v-if="item.title == '可回收物'"
								style="color: #62d1b8;"
								>&#xe627;</i
							>
						</div>
						<div class="right">
							<div>
								<h2>{{ item.title }}</h2>
								<p>{{ item.text }}</p>
							</div>
							<span class="iconfont">&#xe73d;</span>
						</div>
					</div>
				</div>
			</transition>
		</div>

		<van-action-sheet v-model="show" :title="title">
			<div class="content">
				<div v-for="item in searchArr" :key="item.gname">
					<div>
						<h2>{{ item.gname }}</h2>
						<p v-if="item.gtype == '可回收'">
							适宜可循环利用的生活废弃物。投放可回收物时，应尽量保持清洁干燥，避免污染；立体包装应该清空内容物，滞后压扁投放；易破损或有裹尖锐边角的应包后投放。
						</p>
						<p v-if="item.gtype == '有害垃圾'">
							有害垃圾指对人体健康或者自然环境造成直接或者潜在危害的生活废弃物。常见的有包括废灯管、废油漆、杀虫剂、
						</p>
						<p v-if="item.gtype == '干垃圾'">
							干垃圾即其它垃圾，指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。常见的有包括废弃的纸张、塑料、玻璃、烟头、
							金属
						</p>
						<p v-if="item.gtype == '湿垃圾'">
							湿垃圾又称为厨余垃圾、有机垃圾，即易腐垃圾，指食材废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。
						</p>
					</div>

					<div
						v-if="item.gtype == '可回收'"
						class="bg"
						:class="item.gtype == '可回收' ? 'kehuishou' : ''"
					></div>
					<div
						v-if="item.gtype == '有害垃圾'"
						class="bg"
						:class="item.gtype == '有害垃圾' ? 'youhai' : ''"
					></div>
					<div
						v-if="item.gtype == '干垃圾'"
						class="bg"
						:class="item.gtype == '干垃圾' ? 'gan' : ''"
					></div>
					<div
						v-if="item.gtype == '湿垃圾'"
						class="bg"
						:class="item.gtype == '湿垃圾' ? 'shi' : ''"
					></div>
				</div>
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
// import { mapState } from "vuex";
import { Toast } from "vant";
export default {
	data() {
		return {
			arr: ["果皮", "太阳镜", "橘子皮", "口红", "苹果", "卫生纸"],
			arr2: ["鼠标", "可乐罐", "床垫", "手机壳", "雨伞", "电风扇"],
			value: "",
			clickvalue: "",
			show: false,
			searchArr: [],
			title: "",
			refuse: [
				{
					title: "湿垃圾",
					text: "厨余垃圾、有机垃圾、易腐垃圾",
					icon: "&#xe622;",
				},
				{
					title: "干垃圾",
					text: "可回收物、有害垃圾、湿垃圾一位的其他生活废弃物",
					icon: "&#xe604;",
				},
				{
					title: "有害垃圾",
					text: "对人体健康、自然有害的垃圾",
					icon: "&#xe605;",
				},
				{
					title: "可回收物",
					text: "适宜回收和资源化利用的生活垃圾",
					icon: "&#xe627;",
				},
			],
			showMove: false,
		};
	},
	created() {
		// this.RefuseHot();
		this.showMove = true;
	},
	methods: {
		RefuseHot() {
			this.$axios
				.get(
					`http://api.tianapi.com/txapi/hotlajifenlei/index?key=94a42e4bd854acbc453ac22be8eb4d2e`
				)
				.then((res) => {
					console.log(res.data.newslist);
					this.arr = res.data.newslist;
				});
		},

		SearchResult() {
			this.$axios
				.get(
					`http://api.kele8.cn/agent/http://gs.choviwu.top/garbage/getGarbage?garbageName=${this.value}`
				)
				.then((res) => {
					// console.log(res.data.data);
					this.searchArr = res.data.data;
					console.log(this.searchArr);
					if (this.searchArr == "服务器异常,稍后再试") {
						Toast("请正确输入");

						this.show = false;
						return;
					}
					this.title = "搜索结果";
				})
				.catch(function(err) {
					console.log(err);
				});
		},
		Search() {
			console.log(this.value);

			if (!this.value) {
				Toast("内容不能为空");
				return;
			}
			this.SearchResult();
			this.show = !this.show;
			console.log(this.show);
		},
		// onSelect(item) {
		//   // 默认情况下点击选项时不会自动收起
		//   // 可以通过 close-on-click-action 属性开启自动收起
		//   this.show = false;
		//   Toast(item.name);
		// },
		GoRefuseD(title) {
			// console.log(title);
			this.$router.push({ name: "RefuseDetail", params: { title: title } });
		},
	},
	//   computed: {
	//     ...mapState(["refuse"])
	//   }
};
</script>

<style lang="scss" scoped>
.refuse-class {
	padding-bottom: 46px;
	.move-enter {
		transform: translateX(100px);
	}
	.move-enter-active {
		transition: all 3s;
	}
	.move-enter-to {
		transform: translateX(0);
	}
	.banner {
		position: relative;
		& > img {
			width: 100%;
			object-fit: cover;
		}

		& > div {
			position: absolute;
			left: 50%;
			bottom: -6px;
			transform: translateX(-50%);
			text-align: center;
			& > span {
				position: relative;
				input {
					padding: 4px 0;
					padding-left: 12px;
					border: 1px solid silver;
					border-radius: 8px;
					color: #b2b2b2;
					font-size: 14px;
					width: 100%;
				}
				input::placeholder {
					color: #d0d1d3;
					font-size: 14px;
				}

				span {
					position: absolute;
					right: 10px;
					bottom: 0;
					font-size: 14px;
				}
			}
		}
	}

	.search {
		margin-top: 20px;
		& > div {
			display: flex;
			justify-content: center;
			font-size: 14px;
			margin-top: 15px;
			text-align: center;
			padding: 0 6px;
			h3 {
				display: inline-block;
				flex: 0 0 22%;
				font-weight: bold;
				font-size: 14px;
			}
			& > .hot-r {
				display: flex;
				flex-wrap: wrap;
				& > div {
					padding: 0 8px;
					text-align: center;
					margin-top: 6px;

					& > span {
						display: block;
						background-color: #a0d3a8;
						padding: 5px 10px;
						color: #fff;
						border-radius: 8px;
						font-size: 12px;
						letter-spacing: 1px;
					}
				}
				& > div:nth-child(-n + 3) {
					margin: 0;
				}
			}
		}
	}

	.content {
		padding-bottom: 10px;
		& > div {
			display: flex;
			padding: 0 10px;
			box-sizing: border-box;
			& > div {
				flex: 1;
				margin-bottom: 10px;
				h2 {
					// font-weight: bold;
					letter-spacing: 1px;
				}

				p {
					margin-top: 5px;
					line-height: 18px;
					letter-spacing: 0.5px;
					font-size: 14px;
					color: #b2b2b2;
				}
			}
			& > .bg {
				flex: 0 0 160px;
			}
		}
	}

	.van-action-sheet__header {
		font-weight: bold;
		letter-spacing: 1px;
	}
	.bg {
		width: 160px;
		height: 160px;
		background: url("https://smartmll.com/img/gabsdas.png") no-repeat;
	}

	.kehuishou {
		background-position: -205px -26px;
	}

	.youhai {
		background-position: -22px -26px;
	}

	.gan {
		background-position: -388px -26px;
	}

	.shi {
		background-position: -573px -26px;
	}

	.new {
		margin-top: 34px;
		.van-divider {
			border-color: #ccc;
			letter-spacing: 1px;
			margin: 8px 0;
		}
		.new-item-box {
			padding: 0px 12px;
			box-sizing: border-box;
			.new-item {
				display: flex;
				align-items: center;
				padding: 8px 0px;
				box-sizing: border-box;
				border-bottom: 1px solid #f3f3f3;
				.left {
					i {
						font-size: 68px;
					}
				}

				.right {
					display: flex;
					flex: 1;
					margin-left: 5px;

					& > div {
						line-height: 22px;
						letter-spacing: 1px;
						h2 {
							font-weight: bold;
						}

						p {
							color: #696969;
							font-size: 14px;
						}
					}
					& > span {
						color: #ccc;
						display: flex;
						flex: 1;
						justify-content: flex-end;
						align-items: center;
					}
				}
			}
			.new-item:last-of-type {
				border: 0;
			}
		}
	}
}
</style>
