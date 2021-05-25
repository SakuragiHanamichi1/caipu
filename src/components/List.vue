<template>
	<div class="list">
		<van-collapse v-model="activeName" accordion>
			<van-collapse-item
				:title="item.name"
				v-for="(item, index) in menulist"
				v-show="item.cs[0].name.length != 0"
				:key="index"
				:name="index"
			>
				<div class="list-box">
					<van-tabs v-model="activeNames" color="#48803f">
						<!-- <div v-for="(list,i) in item.cs" :key="i">{{list.name}}</div> -->
						<van-tab
							v-for="(list, i) in item.cs"
							:key="i"
							:title="list.name"
							:name="list.name"
						>
							<div v-for="(cs, c) in list.cs" :key="c">
								<span @click="ToListDetalis(cs.name, list.name)">{{
									cs.name
								}}</span>
							</div>
						</van-tab>
						<!-- <van-tab title="标签 2" name="b">内容 2</van-tab>
            <van-tab title="标签 3" name="c">内容 3</van-tab>-->
					</van-tabs>
				</div>
			</van-collapse-item>
		</van-collapse>
	</div>
</template>

<script>
export default {
	data() {
		return {
			menulist: [],
			activeName: 0,
			activeNames: "a",
			indexList: [],
		};
	},
	created() {
		this.GetList();
	},
	methods: {
		GetList() {
			//       this.axios.get(api).then((response) => {
			//   console.log(response.data)
			// })
			this.$axios.get("/recipe/catalogs").then((res) => {
				console.log(res.data.result.cs);
				this.menulist = res.data.result.cs;
				for (let i = 0; i < this.menulist.length; i++) {
					this.indexList.push(this.menulist[i].name);
				}
				// console.log(this.indexList);
			});
		},
		ToListDetalis(title, name) {
			// console.log(title);
			this.$router.push({
				name: "ListDetails",
				params: { title: title, name: name },
			});
		},
	},
};
</script>

<style lang="scss">
.list {
	padding-bottom: 46px;
	.list-box {
		display: flex;
		flex-wrap: wrap;
		.van-collapse-item__content {
			padding: 0;
		}
		.van-tabs__content {
			.van-tab__pane {
				display: flex;
				flex-wrap: wrap;
				div {
					flex: 0 0 33.33%;
					font-size: 13px;
					text-align: center;
					margin: 5px 0;

					padding: 0 8px;
					box-sizing: border-box;
					span {
						display: inline-block;
						padding: 8px 0;
						width: 100%;
						height: 100%;
						border: 1px solid #f0f0f0;
						border-radius: 6px;
					}
				}
			}
		}
	}
	h2 {
		text-align: center;
	}

	.van-collapse {
		.van-hairline--top-bottom::after,
		.van-hairline-unset--top-bottom::after {
			border-width: 0px;
		}
	}
}
</style>
