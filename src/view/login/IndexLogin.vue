<template>
	<div class="index-login">
		<div class="header">
			<router-link tag="span" to="/login">登录</router-link>
			<i>/</i>
			<router-link tag="span" to="/zhuce">注册</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {
			uname: "",
			upwd: "",
		};
	},

	methods: {},
	computed: {},
};
</script>

<style lang="scss">
.index-login {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: url("../../../public/images/loginbg.jpg") no-repeat;
	background-size: 100% 100%;
	padding: 0 8px;
	box-sizing: border-box;
	.header {
		display: flex;
		color: #fff;

		i {
			margin: 0 6px;
		}

		.actived {
			color: #8eca84;
		}
	}
	.login {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 10px;
		box-sizing: border-box;

		.back {
			position: fixed;
			top: 14px;
			left: 15px;
			color: #c8c9cc;
		}

		.login-box {
			background-color: rgba(255, 255, 255, 0.2);
			padding: 14px 12px;
			box-sizing: border-box;
			border-radius: 10px;
			input {
				outline: none;
			}

			& > div {
				color: #fff;
			}
			& > div:nth-of-type(2) {
				margin-top: 20px;
			}

			button {
				float: right;
				color: #fff;
				background-color: transparent;
				border: 0;
				margin-top: 20px;
				border: 1px solid rgba(255, 255, 255, 0.849);
				padding: 8px 12px;
				border-radius: 4px;
				letter-spacing: 3px;
			}
		}
	}
}
</style>
