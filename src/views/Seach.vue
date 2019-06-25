<template>
	<div class="seach">
		<div class="seach_box">
			<div class="seach">
				<input type="text">
			</div>
			<div class="seach_img">
				<img src="../assets/BottomBar/搜索.png" alt="搜索">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "seach",
	}
</script>

<style lang="less" scoped>
	.seach_box {
		width: 90%;
		height: 5.5vw;
		border: 1px solid #708090;
		margin: 0.2rem auto 0.4rem;
		border-radius: 15px;
		overflow: hidden;

		.seach{
			display: inline-block;
			width: 88%;
			height: 100%;
			padding-left: 0.3rem;
			line-height: 5.5vm;
			float: left;
			
			input{
				width: 100%;
				height: 100%;
				border: none;
				font-size: 12PX;
				background-color: rgba(255, 255, 255, 0);
				padding: 0;
			}
		}

		.seach_img{
			width: 0.45rem;
			height: 100%;
			display: inline-block;
			float: left;
			position: relative;
			
			img{
				width: 0.45rem;
				height: 0.45rem;
				vertical-align: middle;
				position: absolute;
				top: 50%;
				margin-top: calc(~"-0.45rem / 2")
			}
		}
	}
</style>
