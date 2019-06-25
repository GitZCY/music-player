<template>
	<div class="My">
		<div class="Not_logged_box" v-if="!load_show">
			<div class="Not_logged_img">
				<img src="../assets/Open/网易云音乐.png" alt="网易云">
			</div>
			<div class="Not_logged_text">
				<p>登陆网易云音乐</p>
				<p>手机电脑多端同步，尽享海量高品质音乐</p>
			</div>
			<div class="load_btn">
				<div class="btn" @click="Gopath({name: 'Loading'})">立即登陆</div>
			</div>
		</div>
		
		<div v-if="load_show" class="user_box">
			<div class="head_box">
				<div class="user_head">
					<img :src="head" alt="头像">
				</div>
				<div class="user_name">
					<div>{{head_name}}</div>
					<div>关注 {{follow}}  |  粉丝 {{Fans}}</div>
				</div>
			</div>

			<div class="classification">
				<div class="my_listBox">
					<div v-for="(item, index) in myList" :key="index" class="my_list" @click="changeList(index)">
						<div class="my_content">
							<img :src="item.src" :alt="item.title">
						</div>
						<div :class="[active == index ? 'my_listNm' : 'my_listNmRed']">
							{{item.title}}
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="content" v-if="load_show">
			<div class="active">
				<!-- 我的歌单 -->
				<div class="my_music" v-show="myListShow[0]">
					<!-- 推荐 -->
					<div class="noitems">
						<span>我的歌单</span>
					</div>
					
					<div class="User_musicbox">
						<div class="User_music">
							<van-row v-for="(item, index) in personal_music[0]" :key="index" class="vant_row" @click.native="GoList({name: 'List', params: {pid : item.id}})">
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
				</div>
				
				<!-- 我的好友 -->
				<div class="my_friends" v-show="myListShow[1]">
					<!-- 关注 -->
					<div class="noitems">
						<span>我的关注</span>
					</div>
					
					<div class="user_friends">
						<div class="friends_list">
							<van-row v-for="(item, index) in people[0]" :key="index" class="friends_row">
								<van-col span="4" class="friends_img">
									<img v-lazy="item.avatarUrl" alt="头像">
								</van-col>
								<van-col span="20" class="friends_content" >
									<div>{{item.nickname}}</div>
									<div>{{item.signature}}</div>
								</van-col>
							</van-row>
						</div>
					</div>
				</div>
				
				<!-- 曾经播放 -->
				<div class="my_History" v-show="myListShow[2]">
					<!-- 关注 -->
					<div class="noitems">
						<span>曾经播放</span>
					</div>
					
					<div class="user_History">
						<div class="History_listbox">
							<van-row class="History_list" v-for="(item, index) in newHistory" :key="index" @click.native="play_music(item, index)">
								<van-col span="3" class="History_left">{{index + 1}}</van-col>
								<van-col span="15" class="History_center">
									<span class="History_name">{{item.al.name}}</span>
									<span class="History_user">{{item.ar[0].name}}</span>
								</van-col>
								<van-col span="6" class="History_right">
									<div><img src="../assets/Open/play.png" alt="播放"></div>
								</van-col>
							</van-row>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: "My",
		data() {
			return{
				active: 0,
				
				//个人信息
				personal_music: [],
				
				//关注的人
				people: [],
				
				//历史播放
				History: [],
				
				//传入store中已处理的历史播放记录
				newHistory: [],
				
				//列表
				myList: [
					{src: require("../assets/My/歌曲.png"), title: "我的歌单"},
					{src: require("../assets/My/用户.png"), title: "我的好友"},
					{src: require("../assets/My/动态.png"), title: "曾经播放"},
				],

				myListShow: [true,false,false,]								
			}
		},
		
		computed: {
			//用户登录状态
			load_show() {
				return this.$store.state.user
			},
			
			//用户头像
			head() {
				return this.$store.state.user_infor[0].avatarUrl
			},
			
			//关注
			follow() {
				return this.$store.state.user_infor[0].follows
			},
			
			//粉丝
			Fans() {
				return this.$store.state.user_infor[0].followeds
			},
			
			//用户名字
			head_name() {
				return this.$store.state.user_infor[0].nickname
			},
		},
		
		watch: {
			
		},
		
		created() {
			var cookieText = document.cookie;
			//获取要查找的 cookie的 name所在的下标
			var index = cookieText.indexOf(name + "=");
			if(index != -1){
				var endIndex = cookieText.indexOf(";", index);	//查找指定的cookie的结束为止
				// 如果等于-1，证明没有找到;号，则把末尾设置为字符串的末尾
				endIndex = (endIndex == -1 ? cookieText.length : endIndex);
				//把想要的cookie的value截取出来
				var value = cookieText.substring(index + (name + "=").length, endIndex);
				//因为存储的时候使用了url编码，所以查到的东西需要url解码
				let cookie = decodeURIComponent(value)
			}
			
			//判断是否登陆 https://music.163.com/song/media/outer/url?id=223960.mp3
			if(this.$store.state.user_infor.length == 0) {
				return
			}else{
				//个人信息
				this.axios({
					type: "GET",
					url: "http://localhost:3000/user/playlist?uid=" + this.$store.state.user_infor[0].userId
				}).then((r)=> {
					this.personal_music.push(r.data.playlist)
				});

				//关注的人
				this.axios({
					type: "GET",
					url: 'http://localhost:3000/user/follows?uid=' + this.$store.state.user_infor[0].userId
				}).then((r)=> {
					this.people.push(r.data.follow)
					console.log("关注的人this.people", this.people)
				});

				//历史播放记录
				this.axios({
					type: "GET",
					url: 'http://localhost:3000/user/record?uid=' + this.$store.state.user_infor[0].userId + '&type=0'
				}).then((r)=> {
					this.History.push(r.data.allData)
					for(var i = 0; i < r.data.allData.length; i++) {
						this.newHistory.push(r.data.allData[i].song) 
					}
				});
			}
			
		},
		
		methods: {
			Gopath(param) {
				this.$router.push(param)
			},
			
			GoList(param) {
				this.$router.push(param)
			},

			//切换列表
			changeList(info) {
				if(info == this.active) {
					return
				}else {
					this.myListShow[this.active] = false
					this.active = info
					this.myListShow[info] = true
				}
			},

			play_music(item, index) {
				let list = this.newHistory
				this.$store.dispatch("PushMusic", {list, item, index})
			}
		},
		
		components: {
			
		}
	}
</script>

<style lang="less" scoped>
	.my {
		position: relative;
		
	}
	.Not_logged_box {

		.Not_logged_img {
			width: 90%;
			margin: 25% auto 0;
			text-align: center;
		}

		.Not_logged_text{
			width: 100%;
			margin: 0.7rem auto 0;

			p{
				text-align: center;
				font-size: 16PX;
			}
		}

		.load_btn {
			width: 90%;
			margin: 0 auto;

			.btn{
				width: 4rem;
				height: .8rem;
				margin: 0 auto;
				text-align: center;
				line-height: .8rem;
				font-size: 14PX;
				border-radius: 15px;
				border: 1px solid #CCC;
				background-color: white;
			}
		}
	}

	.user_box {
		width: 100%;
		height: 7rem;
		background-image: url("../assets/Loading/user_bg.jpeg");
		background-size: cover;
		border-top: 0.1px solid rgba(0, 0, 0, 0);
		border-radius: 18px 18px 0 0;
		background-size: cover;
		position: relative; 

		.head_box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.user_head{
			width: 8em;
			height: 8em;
			border-radius: 50%;
			border: 6px solid rgba(255, 255, 255, 0.5);
			margin: 0 auto;
			overflow: hidden;

			img{
				width: 100%;
				height: 100%;
			}
		}

		.user_name {

			div{
				color: white;
				font-size: 15PX;
				margin: 0.1rem auto 0;
				text-align: center;
			}

			div:nth-child(2){
				font-size: 12PX;
				color: rgb(220, 220, 220); 
			}
		}
	}

	.classification {
		width: 90%;
		height: 12vh;
		border: 1px solid #CCC;
		background-color: white;
		border-radius: 10px;
		position: absolute;
		left: 50%;
		bottom: -6vh;
		transform: translate(-50%);
		margin: 0 auto;
		overflow: hidden;
		z-index: 2;

		.my_listBox {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-between;

			.my_list {
				width: 33.33333%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.my_content {
					width: 1rem;
					height: 1rem;

					img {
						width: 100%;
						height: 100%;
					}
				}
				
				.my_listNm {
					margin-top: .1rem;
					color: red;
				}

				.my_listNmRed {
					margin-top: .1rem;
					color: black;
				}
			}
		}
	}
	
	.content {
		width: 100%;
		border: 1px solid rgba(0, 0, 0, 0);
		background-color: white;

		.active {
			width: 99%;
			height: 48vh;
			margin-top: 6vh;
			overflow-y: scroll;
			
				
			.my_music {
				width: 90%;
				margin: 0.1rem auto;
					
					.User_music {
						font-family: KaiTi;
						width: 100%;
						margin: 0 auto;
						color: white;

						.vant_row{
							margin-top: 0.2rem;
						}

						.User_musicimg {
							display: inline-block;

							img {
								width: 100%;
								height: 100%;
								border-radius: 5px;
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
								font-size: 16PX;
								color: black;
							}

							div:nth-child(2){
								height: 50%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size: 13PX;
								color: black;
							}
						}
					}	
			}
		}
	}
	
	//我的关注
	.my_friends {
		width: 90%;
		margin: 0.1rem auto;
	}

	.user_friends {
		width: 100%;
		border-radius: 15px;
		margin: 0 auto;
		font-family: KaiTi;
	}

	.my_friends .friends_list{
		width: 100%;
		border-radius: 15px;
		margin: 0 auto;
		font-family: KaiTi;
	}

	.friends_img {
		display: inline-block;

		img {
			width: 100%;
			height: 100%;
			border-radius: 5px;
		}
	}

	.friends_list .friends_row {
		margin-top: 0.2rem;
	}
	
	.my_friends .friends_list .friends_content {
		height: 1.4rem;
		display: inline-block;
		line-height: 0.7rem;
		padding-left: .2rem;

		div:nth-child(1){
			height: 50%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 16PX;
			color: black;
		}

		div:nth-child(2){
			height: 50%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 13PX;
			color: black;
		}
	}
	
	//历史播放
	.my_History {
		width: 90%;
		margin: 0.1rem auto;
	}

	.History_listbox{
		width: 100%;
		border: 1px solid white;
		border-radius: 15px;
		margin: 0 auto;
		font-family: KaiTi;

		.History_list {
			width: 100%;
			height: 1.5rem;
			margin-top: 0.2rem;
		}

		.History_left{
			height: 100%;
			line-height: 1.5rem;
			font-size: 19PX;
			text-align: center;
			color: rgb(146, 146, 146);
		}

		.History_center{
			height: 100%;
			line-height: calc(~"1.5rem / 2");

			.History_name{
				display: block;
				height: 50%;
				font-size: 15PX;
				font-weight: 540;
				overflow: hidden;    
				text-overflow: ellipsis;      
				white-space: nowrap;
			}

			.History_user{
				display: block;
				height: 50%;
				color: rgb(146, 146, 146);
				font-size: 12PX;
				overflow: hidden;    
				text-overflow: ellipsis;      
				white-space: nowrap;
			}
		}

		.History_right {
			height: 100%;

			div{
				width: 100%;
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
	
	//推荐栏
	.noitems{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		margin: 0 auto;

		span{
			color: rgba(51, 51, 51, 0.6);
			font-size: 0.32rem;
			position: relative;
			border-radius: 15%;
		}

		span::after,
		span::before{
			content: "";
			position: absolute;
			z-index: 1;
			pointer-events: none;
			background-color: #ccc;
			height: 1px;
			width: 3.5rem;
			top: 50%;
		}

		span::after {
			left: 1.5rem;
		}

		span::before {
			right: 1.5rem;	
		}
	}
	
</style>
