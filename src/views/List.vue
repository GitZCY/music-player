<template>
    <div class="List">
		
       <div class="Box">
			<div class="bg" ref="Topbar">
				<div class="Topbar">
					<div class="Topbar_img">
						<img src="../assets/music/左箭头.png" alt="返回" @click="Goback()">
					</div>
					<div class="Topbar_name">
						<span class="sp_top">歌单</span>
						<span class="sp_bottom">编辑推荐: {{Recommend_split}}</span>
					</div>
				</div>
			</div>
			
			<div class="introduce_box">
				<div class="content">
					<div class="introduce_img">
						<img v-lazy="bgc_url" alt="">
					</div>
					<div class="introduce_name">
						<div class="top_sp">{{Recommend_name}}</div>
						<div class="center_sp" >
							<div class="first"><img v-lazy="Recommend_userimg" alt="头像"></div>
							<div class="two" @click="pop_use()">{{Recommend_user}} ></div>
						</div>
						<div class="bottom_sp">{{Recommend_nosplit}}</div>
					</div>
				</div>
			</div>
			
			<div class="Playall">
				<van-row class="play_box">
					<van-col span="3" class="play_btn">
						<img src="../assets/BottomBar/播放.png" alt="播放全部" @click="play_music(musics[0], 0)">
					</van-col>
					<van-col span="13" class="play_text">
						播放全部
						<span>(共{{count}}首)</span>
					</van-col>
				</van-row>
			</div>
			
			<div class="BottomBar">
				<van-row class="music_list" v-for="(item, index) in musics" :key="index" @click.native="play_music(item, index)">
					<van-col span="3" class="music_left">{{index + 1}}</van-col>
					<van-col span="15" class="music_center">
						<span class="music_name">{{item.name}}</span>
						<span class="music_user">{{item.ar[0].name}} - {{item.al.name}}</span>
					</van-col>
					<van-col span="6" class="music_right">
						<div><img src="../assets/Open/play.png" alt="播放" ></div>
					</van-col>
				</van-row>
			</div>
	   </div>
	  <!-- :style="{backgroundImage: 'url(' + Recommend_userimg + ')'}" -->
	   <van-popup v-model="show" class="popup_use">
			<div class="User_bg" :style="{backgroundImage: 'url(' + Recommend_dataimg + ')'}">
				<div class="User_head">
					<img :src="Recommend_userimg" alt="头像">
				</div>
			</div>
			<div class="User_all">
				<div class="User_name">{{Recommend_user}}</div>
				<div class="introduce">
					<span v-for="(item, index) in Recommend_Daren[0]" :key="index" class="Label">{{item}}</span>
				</div>
			</div>
			
			<div class="noitems">
				<span>ta的歌单</span>
			</div>
			
			<div class="User_musicbox">
				<div class="User_music">
					<van-row v-for="(item, index) in Usermusic[0]" :key="index" class="vant_row">
						<van-col span="4" class="User_musicimg">
							<img v-lazy="item.coverImgUrl" alt="">
						</van-col>
						<van-col span="20" class="User_musictext" >
							<div>{{item.name}}</div>
							<div>{{item.trackCount}}首,播放{{item.playCount}}次</div>
						</van-col>
					</van-row>
				</div>
			</div>
	   </van-popup>
	   
    </div>
</template>

<script>
    import {Dialog, Popup} from 'vant'
    export default {
        name: 'list',

        data() {
            return {
				//用户弹出层
				show: false,
				
				//用户的歌单
				Usermusic: [],
				
				//当前歌单信息
				CurrentList: [],
				
				//歌单内歌曲信息
				musics: [],
				
				//当前歌单的图片
				bgc_url: '',
				
				//顶部编辑推荐（剪切版）
				Recommend_split: "",
				
				//推荐栏name
				Recommend_name: "",
				
				//推荐人资料之背景图
				Recommend_dataimg: "",
				//推荐人资料之音乐达人
				Recommend_Daren: [],
				
				//推荐人及头像及id
				Recommend_user: "",
				Recommend_userimg: "",
				Recommend_id: "",
				
				//编辑推荐介绍（无剪切）
				Recommend_nosplit: "",
				
				//当前歌单歌曲数
				count: "",
			
			}
        },

        methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(scrollTop > 20){
					this.$refs.Topbar.style.backgroundColor = "#6BC235";
				}
				if(scrollTop < 20){
					this.$refs.Topbar.style.backgroundColor = "rgba(255, 255, 255, 0)";
				}
			},
		   
			Goback() {
				// if(this.sign) {
				// 	this.$router.push({name: "Find", params: {dis: 1}})
				// }else{
					this.$router.go(-1);
				// }
			},
		   
			play_music(item, index) {
				let list = this.musics
				this.$store.dispatch("PushMusic", {list, index, item})
			},
			
			//点击获取用户歌单
			pop_use() {
				this.axios({
					type: "GET",
					url: "http://localhost:3000/user/playlist?uid=" + this.Recommend_id
				}).then((r)=> {
					this.Usermusic.push(r.data.playlist)
				}).catch(()=> {
					console.log("个人信息请求超时")
				})
				this.show = !this.show
			}
        },
		
		mounted() {
			 window.addEventListener('scroll', this.handleScroll, true)
		},
		
        computed: {
			
        },
		
        created() {
			let id = this.$route.params.pid
		
			//请求歌单
            this.axios({
                type: "GET",
                url: "http://localhost:3000/playlist/detail?id=" + id 
            }).then(response => {
				//当前歌单信息   
				this.CurrentList.push(response.data)
				//所有歌单内歌曲
				this.musics.push(...(response.data.playlist.tracks))
				//当前歌单图片
				this.bgc_url = response.data.playlist.coverImgUrl
				
				//推荐栏name
				this.Recommend_name = response.data.playlist.name
				
				//推荐人资料之背景图
				this.Recommend_dataimg = response.data.playlist.creator.backgroundUrl
				
				//推荐栏推荐人及头像及id
				this.Recommend_user = response.data.playlist.creator.nickname
				this.Recommend_userimg = response.data.playlist.creator.avatarUrl
				this.Recommend_id = response.data.playlist.creator.userId
				
				//当前歌单歌曲数
				this.count = response.data.playlist.tracks.length
				
				//推荐人资料之音乐达人
				this.Recommend_Daren.push(response.data.playlist.creator.expertTags) 
				
				//未剪切编辑推荐栏
				if(response.data.playlist.description) {
					this.Recommend_nosplit = response.data.playlist.description
				}else{
					this.Recommend_nosplit = "暂无介绍哦"
				}
				
				//当前歌单编辑推荐栏
				if(response.data.playlist.description) {
					let Recom = response.data.playlist.description
					this.Recommend_split = Recom.split("。")[0]
				}else{
					this.Recommend_split = "暂无介绍哦"
				}
            }).catch(() => {
                console.log("榜单请求超时")
            })
        },
		
		updated() {
			
		},
		
		//组件销毁阶段
		beforeDestroy() {
			 window.removeEventListener("scroll", this.handleScroll, true)
		},
		
        components: {
            [Dialog.name]: Dialog,
            [Popup .name]: Popup 
        },
    }
</script>

<style lang="less" scoped>
	.List{
		padding-bottom: 1.6rem;
	}
	.bg{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		transition: all 0.5s;
		z-index: 10;
	}
	.Topbar {
		width: 90%;
		height: 1.5rem;
		font-family: KaiTi;
		margin: 0 auto;
		display: flex;
		padding-top: .1rem;

		.Topbar_img{
			width: 15%;
			height: 100%;
			display: flex;
			align-items: center;

			img{
				width: .9rem;
				height: .9rem;
			}
		}

		.Topbar_name{
			width: 85%;
			height: 100%;
			display: inline-block;

			.sp_top,
			.sp_bottom {
				width: 100%;
				height: 50%;
				color: white;
				display: inline-block;
				line-height: calc(~"1.500666rem / 2")
			}
			.sp_top {
				font-size: 20PX;
				font-weight: 800;
			}
			.sp_bottom{
				font-size: 13PX;
				color: rgba(255, 255, 255, 0.85);
				overflow: hidden;    
				text-overflow: ellipsis;      
				white-space: nowrap;
			}
		}
	}
	
	.introduce_box {
		width: 100vw;
		height: 40vh;
		background: linear-gradient(to top right, #AEDD81 0%, #AEDD81 25%, #6BC235 90%);
		position: relative;

		.content{
			width: 90%;
			height: 17vh;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;

			.introduce_img {
				width: 17vh;
				height: 100%;
				float: left;

				img{
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}
			}

			.introduce_name {
				width: calc(~"100% - 17vh");
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.top_sp,
				.center_sp,
				.bottom_sp {
					padding-left: .3rem;
					display: flex;
					align-items: center;
				}

				.top_sp {
					color: white;
					font-size: 15PX;
					font-weight: 550;
				}

				.center_sp{
					color: rgba(240, 240, 240, 1);
					font-size: 12PX;
					margin-top: .03rem;
					display: flex;

					.first{
						width: 15%;
						display: flex;
						justify-content: center;

						img{
							max-width: .8rem;
							max-height: .8rem;
							border-radius: 50%;
							vertical-align: middle;
						}
					}

					.two {
						width: 85%;
						height: 100%;
						display: flex;
						align-items: center;
						padding-left: .15rem;
					}

				}

				.bottom_sp{
					// word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					color: rgb(235, 235, 235);
					font-size: 13PX;		
				}
			}
		}
	}
	
	.Playall{
		width: 100%;
		height: 1.2rem;
		margin-top: -1rem;
		background-color: white;
		border-radius: 18px 18px 0 0;
		overflow: hidden;
		position: sticky;
		top: 1.5rem;
		overflow: hidden;
		.play_box{
			width: 90%;
			height: 100%;
			margin: 0 auto;
			.play_btn {
				height: 100%;
				position: relative;
				img{
					width: 1rem;
					height: 1rem;
					position: absolute;
					top: 50%;
					// left: 50%;
					margin-top: calc(~"-1rem / 2");
					// margin-left: calc(~"-1rem / 2");
				}
			}
			.play_text{
				height: 100%;
				line-height: 1.2rem;
				font-size: 18PX;
				span{
					display: inline-block;
					height: 100%;
					line-height: 1.2rem;
					font-size: 14PX;
					color: rgb(146, 146, 146);
				}
			}
		}
	}
	
	.BottomBar{
		width: 100%;
		margin: 0 auto;
		.music_list{
			width: 100%;
			height: 1.5rem;
			margin-top: 0.2rem;
			.music_left{
				height: 100%;
				line-height: 1.5rem;
				font-size: 19PX;
				text-align: center;
				color: rgb(146, 146, 146);
			}
			.music_center{
				height: 100%;
				line-height: calc(~"1.5rem / 2");
				.music_name{
					display: block;
					height: 50%;
					font-size: 15PX;
					font-weight: 540;
					overflow: hidden;    
					text-overflow: ellipsis;      
					white-space: nowrap;
				}
				.music_user{
					display: block;
					height: 50%;
					color: rgb(146, 146, 146);
					font-size: 12PX;
					overflow: hidden;    
					text-overflow: ellipsis;      
					white-space: nowrap;
				}
			}
			.music_right {
				height: 100%;
				div{
					width: 50%;
					height: 100%;
					line-height: 1.4rem;
					text-align: center;
					img{
						width: .8rem;
						height: .8rem;
						vertical-align: middle;
					}
				}
			}
		}
	}

	.popup_use {
		width: 90%;
		height: 80%;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 20px;
		overflow: hidden;

		.User_bg {
			width: 100%;
			height: 30%;
			border-top: 0.1px solid rgba(255, 255, 255, 0);
			background-size: cover;
			border-radius: 20px;
			border: 1px solid white;
			display: flex;
			align-items: center;

			.User_head {
				width: 8em;
				height: 8em;
				border: 1px solid white;
				border-radius: 50%;
				margin-left: 5vw; 
				background-size: cover;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.User_all {
			width: 97%;
			height: 15%;
			margin: 0.1rem auto 0;
			line-height: 9vw;
			border: 1px solid white;
			border-radius: 15px;

			.User_name,
			.introduce {
				height: 50%;
				color: white;
				padding-left: .2rem;
				font-family: KaiTi;
				font-size: 16PX;
				display: flex;
				align-items: center;

				.Label {
					display: flex;
					align-items: center;
					flex-shrink: 0;
					height: 50%;
					border: 1px solid white;
					margin-right: 0.3rem;
					border-radius: 12px;
				}
			}

			.User_name{
				font-size: 18PX;
				font-weight: 545;
			}
		}

		.User_musicbox {
			width: 97%;
			height: 45%;
			border: 1px solid white;
			border-radius: 15px;
			margin: 0.1rem auto 0;
			overflow-y: scroll;
			font-family: KaiTi;

			.User_music {
				width: 90%;
				height: 1.4rem;
				margin: 0 auto;
				color: white;

				.vant_row{
					margin-top: 0.2rem;
					display: flex;
					align-items: center;
				}

				.User_musicimg {

					img {
						width: 100%;
						height: 100%;
						border-radius: 5px;
						display: block;
					}
				}

				.User_musictext {
					height: 1.4rem;
					display: inline-block;
					line-height: 0.7rem;
					padding-left: .2rem;

					div:nth-child(1){
						height: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 14PX;
					}

					div:nth-child(2){
						height: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #d3d3d3;
					}
				}
			}
		}
	}

	.noitems{
		width: 90%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		margin: 0 auto;
		color: white;

		span{
			font-size: 14PX;
			position: relative;
			border-radius: 15%;
			letter-spacing: 0.05rem;
		}

		span::after,
		span::before{
			content: "";
			position: absolute;
			z-index: 1;
			pointer-events: none;
			background-color: #ccc;
			height: 1px;
			width: 2.5rem;
			top: 50%;
		}

		span::after {
			left: 2rem;
		}

		span::before {
			right: 2rem;	
		}
	}
</style>
