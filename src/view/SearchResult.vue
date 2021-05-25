<template>
	<div class="searchresilt">
	
		<div class="content">
			<div class="item" v-for="(item, index) in arr.list" :key="index">
				<img :src="item.r.img" alt />
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
							<img :src="item.r.a.p" alt />
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
			arr: [],
			title: "",
		};
	},
	activated() {
		this.title = this.$route.params.title;
		this.Getdata();
		// this.scrollBehavior();
	},
	methods: {
		Getdata() {
			this.$axios.get(`/recipe/list?keyword=${this.title}`).then((res) => {
				console.log(res.data.result.list);
				this.arr = res.data.result;
				console.log(this.arr);
			});
		},
		ToMenuDtails(id) {
			this.$router.push({ name: "MenuDetails", params: { id: id } });
			console.log(id);
		},
	},
};
</script>

<style lang="scss" scoped>
.searchresilt {
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
