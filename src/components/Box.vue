<template>
	<div class="home">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>

		<div class="footer">
			<router-link exact tag="div" to="/">
				<p class="iconfont">
					<i>&#xe603;</i>
				</p>
				<span>Home</span>
			</router-link>

			<router-link tag="div" to="/list">
				<p class="iconfont">
					<i>&#xe6c8;</i>
				</p>
				<span>List</span>
			</router-link>

			<router-link tag="div" to="/RefuseClassification">
				<p class="iconfont">
					<i>&#xe640;</i>
				</p>
				<span>Refuse</span>
			</router-link>

			<router-link tag="div" to="/more">
				<p class="iconfont">
					<i>&#xe782;</i>
				</p>
				<span>More</span>
			</router-link>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.home {
	& > input {
		width: 100%;
		border-radius: 1.125rem;
		outline: none;
		border: 0;
		background-color: #f7f7f7;
		padding: 0.5rem 0;
		padding-left: 1.125rem;
		box-sizing: border-box;
	}
	& > input::placeholder {
		color: #ababab;
	}
	.footer {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2.875rem;
		border-top: 0.0625rem solid #ccc;
		background-color: #fff;
		& > div {
			flex: 1;
			text-align: center;
			p {
				font-size: 1.3125rem;
				margin-bottom: 0.125rem;
			}
			span {
				font-size: 0.875rem;
			}
		}
	}

	.exact-actived {
		span,
		p > i {
			color: #48803f;
			font-weight: bold;
		}
	}
}
</style>
