<template>
    <div class="Home">
		
		<div class="box">
			<div class="top">
				<van-row>
					<van-col span="8" v-for="(item, index) in top" :key="index">
						<div :class="[active == index ? 'active' : 'topTex']" @click="Gopath({name: item.name}, index)">
							<span>{{item.title}}</span>
						</div>
					</van-col>
				</van-row>
			</div>
			
		</div>
		
		<div class="box_null">
			
		</div>
		
		<transition name="fade">
			<router-view></router-view>
		</transition>
		
    </div>
</template>

<script>
    export default {
        name: "Home",
		
        data() {
            return {
                top: [
					{title: "我的", name: "My"},
					{title: "发现", name: "Find"},
					{title: "榜单", name: "Songs"},
				],
				
				active: 0,
            }
        },
		
		methods: {
			Gopath(params, index) {
				this.$router.push(params);
				this.$store.dispatch("ChangeHomeIndex", index)
				this.active = this.$store.state.Home_index
			},
		},
		
		created() {
			//仓库中的主页下标
			this.active = this.$store.state.Home_index
			
		},
		
        components: {
            // "bottom-nav": BottomNav,
            // [Tab.name]: Tab,
            // [Tabs.name]: Tabs,
        }
    }
</script>

<style lang="less" scoped>
	.Home {
		overflow: hidden;
		padding-bottom: 1.6rem;
	}
	.box{
		width: 100%;
		height: 1.3rem;
		margin: 0 auto;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		background-color: #FFF;
	}
	.top {
		width: 100%;
		height: 1.3rem;
		text-align: center;
		margin: 0 auto;
		.topTex{
			width: 100%;
			height: 1.3rem;
			line-height: 1.3rem;
			font-size: 20PX;
			color: #708090;
			font-family: KaiTi;
		}
	}
	.active{
		color: black;
		font-size: 22PX;
		font-weight: 600;
		line-height: 1.3rem;
		font-family: KaiTi;
	} 
	
	//路由动画
	.fade-enter-active {
		transition: all 0.5s ease-out;
		opacity: 1;
	}
	.fade-leave-active {
		transition: all 0.5s cubic-bezier(2.0, 0.5, 0.8, 1.0);
		transform: translateX(-50px);
		opacity: 1;
	}
	.fade-enter,
	.fade-leave-to{
		transform: translateX(50px);
		opacity: 0;
	}
	
	.box_null {
		width: 100%;
		height: 1.3rem;
		margin: 0 auto;
		// margin-bottom: 0.1rem;
	}
</style>