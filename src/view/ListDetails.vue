<template>
	<div class="listdetails">
		<van-sticky :offset-top="0">
			<div class="header">
				<span class="iconfont" @click="goback">&#xe67c;</span>
				<h2>{{ name }}</h2>
			</div>
		</van-sticky>
		<div class="content">
			<div class="item" v-for="(item, index) in arr.list" :key="index">
				<img :src="item.r.img" v-lazy="item.r.img" alt />
				<div @click="ToMenuDtails(item.r.id)" class="item-info">
					<h1>{{ item.r.n }}</h1>
					<h2>
						<span>{{ item.r.rate }}分</span>
						<span>{{ item.r.recommendation_tag }}</span>
					</h2>
					<div>
						<span
							v-for="recipe in item.r.recipe_list_tags"
							:key="recipe.text"
							:style="{
								'background-color': recipe.background_end_color,
								color: recipe.text_color,
							}"
							>{{ recipe.text }}</span
						>
						<!-- <p>{{item.r.an}}</p> -->
						<div class="user">
							<img :src="item.r.a.p" alt v-lazy="item.r.a.p" />
							<p>{{ item.r.an }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: "",
			name: "",
			flag: true,
			arr: [],
		};
	},
	created() {
		console.log(this.$route.params.title);
		console.log(this.$route.params.name);
	},
	activated() {
		this.title = this.$route.params.title;
		this.name = this.$route.params.name;
		this.GetDataListDetalis();
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		window.pageYOffset = 0;
	},
	methods: {
		GetDataListDetalis() {
			this.$axios.get(`/recipe/list?keyword=${this.title}`).then((res) => {
				console.log(res.data.result);
				this.arr = res.data.result;
				this.flag = false;
			});
		},
		// 跳转菜谱详情
		ToMenuDtails(id) {
			this.$router.push({ name: "MenuDetails", params: { id: id } });
			console.log(id);
		},
		goback() {
			this.$router.go(-1);
		},
	},
	computed: {
		text() {
			// DOM 更新了
			return this.title;
		},
	},
};
</script>

<style lang="scss" scoped>
.listdetails {
	.header {
		position: relative;
		width: 100%;
		background-color: #fff;
		text-align: center;
		padding-top: 8px;
		padding-bottom: 6px;
		box-shadow: 0 0 5px 1px #999;
		z-index: 10;
		span {
			position: absolute;
			left: 5px;
		}
	}

	.content {
		.item {
			display: flex;
			padding: 0px 8px;
			padding-left: 10px;
			margin: 14px 0;
			box-sizing: border-box;
			& > img {
				width: 135px;
				height: 110px;
				object-fit: cover;
				border-radius: 8px;
			}
		}

		.item-info {
			margin-left: 10px;
			padding: 8px 0;
			h1 {
				font-weight: bold;
				margin-bottom: 8px;
				font-size: 15px;
			}
			h2 {
				font-size: 13px;
				font-weight: bold;
				margin-bottom: 6px;
				/* border: 1px solid; */
			}
			& > div {
				span {
					display: inline-block;
					font-size: 12px;
					padding: 2px 5px;
					margin: 0 4px;
					box-sizing: border-box;
					border-radius: 4px;
				}
				& > span:first-of-type {
					margin-left: 0;
				}

				.user {
					display: flex;
					align-items: center;
					margin-top: 14px;
					img {
						display: block;
						width: 20px;
						height: 20px;
						border-radius: 50%;
					}
					p {
						font-size: 12px;
						color: #8d8e8e;
						margin-left: 5px;
					}
				}
			}
		}
	}
}
</style>
