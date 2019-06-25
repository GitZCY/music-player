<template>
    <div class="Home" @click.stop="changeIsShow()">

        <van-row class="BottomBar" >
            <van-col span="4" class="head">
                <div class="head_img" ></div>
            </van-col>

            <van-col span="13" class="tex">
				<div class="music_name">66666666666666</div>
				<div class="music_lrc">9999999999999999</div>
            </van-col>

            <van-col span="7">
                <van-row>
                    <van-col span="12" >
                        <div class="left_btn">
                            <img src="../assets/BottomBar/播放.png" alt="">
                        </div>
                    </van-col>
                    <van-col span="12" >
                        <div class="right_btn">
                            <img src="../assets/BottomBar/播放列表.png" alt="播放列表">
                        </div>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>

    </div>
</template>

<script>
    export default {
        name: "Home",
		
		methods: {
			changeIsShow(){
				this.$store.state.show_route = !this.$store.state.show_route
				this.$store.state.bottom_Show = !this.$store.state.bottom_Show
				console.log("show_route",this.$store.state.show_route)
				console.log("bottom_Show",this.$store.state.bottom_Show)
			},
		},
		computed: {
			// 背景图
			music_bg() {
				return this.$store.state.music.al.picUrl
			},
		}
    }
</script>

<style lang="less" scoped>
    /*.Home{*/
    /*    width: 100%;*/
    /*    height: 100vh;*/
    /*}*/

    .BottomBar {
        width: 100%;
        height: 1.6rem;
        border-top: 1px solid #E6E6E6;
        position: fixed;
        background-color: rgba(255, 255, 255, 0.93);
        bottom: 0;
        left: 0;
		z-index: 11;
        .head{
            height: 1.6rem;
            position: relative;
            .head_img{
                width: 1.4rem;
                height: 1.4rem;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: calc(~"-1.4rem / 2");
                margin-top: calc(~"-1.4rem / 2");
                border-radius: 50%;
                background-image: url("../assets/Loading/bg.jpg");
                background-size: cover;
            }
        }

        .tex{
			height: 100%;
			div{
				width: 100%;
				height: 50%;
				line-height: .8rem;
			}
			.music_name,
			.music_lrc {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.music_name {
				line-height: 1rem;
				font-size: 15PX;
				font-weight: 540;
			}
			.music_lrc {
				color: #929292;
				font-size: 12PX;
			}
        }

        .left_btn,
        .right_btn{
            width: 100%;
            height: 1.6rem;
            position: relative;
            img{
                position: absolute;
                width: 1.3rem;
                height: 1.3rem;
                top: 50%;
                left: 50%;
                margin-left: calc(~"-1.3rem / 2");
                margin-top: calc(~"-1.3rem / 2");
            }
        }
        .right_btn{
            img{
                position: absolute;
                width: 0.9rem;
                height: 0.9rem;
                top: 50%;
                left: 50%;
                margin-left: calc(~"-0.9rem / 2");
                margin-top: calc(~"-0.9rem / 2");
            }
        }
    }

    /*.left_btn {*/
    /*    !*width: 100%;*!*/
    /*    width: 100%;*/
    /*    height: 10vh;*/
    /*    border: 1px solid #000;*/
    /*    position: relative;*/
    /*    img{*/
    /*        position: absolute;*/
    /*        width: 1.2rem;*/
    /*        height: 1.2rem;*/
    /*        top: 50%;*/
    /*        left: 50%;*/
    /*        margin-left: -calc(~"100% - 1.2rem / 2");*/
    /*    }*/
    /*}*/
</style>