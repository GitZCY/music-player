<template>
	<div id="app">
		<transition name="slide-fade">
			<router-view v-if="!show_route"></router-view>
		</transition>
		
		<div v-show="show_route">
			<!-- 蒙层 -->
			<div class="div_bg" ref="bgc" >
		
			</div>
		
			<div class="div_topbg">
			
			</div>

			<!-- 头部位置 --> 
			<van-row class="head">
				<div class="head_box">
					<van-col span="4"><img src="../src/assets/music/左箭头.png" alt="返回" class="back" @click="Goback()"></van-col>
					<van-col span="20" class="two-van-col">
						<div class="center_font">
							<span>{{this.information.name}}</span>
							<span v-if="information.ar">{{this.information.ar[0].name}}</span>
						</div>
					</van-col>
				</div>	
			</van-row>
		
			<!-- 唱片 -->
			<transition>
				<div class="Record_one" ref="record" @click="move_Lyric()" v-show="show">
						
				</div>
			</transition>
		
			<!-- 歌词界面 音量-->
			<transition>
				<div class="voice" v-show="!show">
					<van-slider v-model="voice_value" :min="0" :max="100" active-color="#f44" @change="ChangeVoice()" class="Progres_bar">
						<div slot="button" class="custom-button">
							<div class="btn_voice">
								<img src="../src/assets/play/猫爪.png">
							</div>
						</div>
					</van-slider>
				</div>
			</transition>
			<transition>
				<div class="Lyric" ref="Ly" @click="move_Record()" v-show="!show">
					<div class="tex">
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p v-if="newlrc" v-for="(item, index) in newlrc" :key="index" class="lrc_list" :class="[item.time == lrc_time ? 'lrc_text' : null]" :ref="[item.time == lrc_time ? 'lrcText' : null]">{{item.lrcCN}}</p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
					</div>
				</div>
			</transition>
		
			<!-- 页脚 -->
			<div class="foot">
				<!-- 收藏,下载,评论图标 -->
				<transition>
					<van-row v-show="show">
						<van-col span="6" v-for="(item, index) in URL" :key="index">
							<img :src="item.url" :alt="item.alt" class="img_icon">
						</van-col>
					</van-row>
				</transition>
		
				<!-- 播放  :src="'https://music.163.com/song/media/outer/url?id=' + this.information.id + '.mp3'"-->
				<audio ref="control" :src="'https://music.163.com/song/media/outer/url?id=' + this.information.id + '.mp3'">
					<source ref="playMusic"></source>
				</audio>
		
				<!-- 进度条 -->
				<div class="Progress">
					<div class="left">
						<span>
							<span ref="Minute_left">00</span>:<span ref="Second_left">00</span>
						</span>
					</div>
					
					<div class="center">
						<van-slider v-model="value" :min="0" :max="100" active-color="#f44" @change="ChangeTime" class="Progres_bar">
							<div slot="button" class="custom-button">
								<div class="btn_music">
									<img src="../src/assets/play/猫爪.png">
								</div>
							</div>
						</van-slider>
					</div>
					
					<div class="right">
						<span>
							<span v-html="Minute_right">00</span>:<span v-html="second_right">00</span>
						</span>
					</div>
				</div>
		
				<div class="play_music">
					<van-row>
			
						<van-col span="8">
							<img src="../src/assets/play/上一首.png" alt="上一首" class="bign_icon" @click="last_one()">
						</van-col>
			
						<van-col span="8">
							<img src="../src/assets/play/暂停.png" alt="播放" @click="changeplay()" ref="play_icon">
						</van-col>
			
						<van-col span="8">
							<img src="../src/assets/play/下一首.png" alt="下一首" class="bign_icon" @click="next_one()">
						</van-col>
			
					</van-row>
				</div>
		
			</div>
		</div>
		
		<van-row class="BottomBar"  v-show="bottom_Show">
			<div @click.stop="changeIsShow()" class="click_box">
				<van-col span="4" class="head_list">
					<div class="head_img" ref="bottomImg"></div>
				</van-col>
		
				<van-col span="13" class="tex">
					<div class="music_name">{{this.information.name}}</div>
					<div class="music_lrc">{{this.lrc_content}}</div>
				</van-col>
		
				<van-col span="7">
					<van-row>
						<van-col span="12">
							<div class="left_btn">
								<img src="../src/assets/BottomBar/暂停.png" alt="" ref="leftBtn" @click.stop="changeplay()">
							</div>
						</van-col>
						<van-col span="12" >
							<div class="right_btn">
								<img src="../src/assets/BottomBar/播放列表.png" alt="播放列表" @click.stop="Music_list()">
							</div>
						</van-col>
					</van-row>
				</van-col>
				
			
			</div>
		</van-row>
		
		<van-popup v-if="show_list" v-model="show_list" position="bottom" :overlay="true" class="MusicList">
			<div class="list_content">
				<span>播放列表 ({{this.$store.state.song_sheet.length}})</span>
				<div class="del" @click="deleteAll()"><img src="./assets/delete/垃圾桶.png" alt="删除"></div>
			</div>
			
			<div v-for="(item, index) in this.$store.state.song_sheet" :key="index" class="list_music">
				<span @click="replace_music(item, index)">{{item.name}}</span>
				<div class="dele" @click="dele_one(item, index)"><img src="./assets/delete/删除.png" alt="删除" ></div>
			</div>
		</van-popup>
	
  </div>
</template>

<script>
	import lrc from './utils/lrc.js';
	import {mapState, mapGetters} from "vuex";
	import { Popup, Slider, Toast, Dialog} from 'vant';
	import BScroll from 'better-scroll';
	export default {
		name: 'app',
			data() {
				return {
				newlrc: [],
				
				//本地存储的歌曲信息
				allMusic: [],
					
				URL: [
						{url: require("../src/assets/music/收藏.png"), alt: "收藏"},
						{url: require("../src/assets/music/下载.png"), alt: "下载"},
						{url: require("../src/assets/music/评论.png"), alt: "评论"},
						{url: require("../src/assets/music/省略.png"), alt: "省略"}
					],
					
				//音乐的value
				value: 0,
						
				//音量的value
				voice_value: 0,
						
				//音乐总秒数
				time: "",
						
				//是否显示唱片
				show: true,
				
				//弹出层播放列表
				show_list: false,
				
				//清空播放列表
				dele_list: false,
				
				//复制本地仓库歌单
				copy_music: [],

				//当前时间歌词
				lrc_content: '',

				//当前时间，用来滚动
				lrc_time: '',

			}
		},
		methods: {
			Goback() {
				this.$store.state.show_route = !this.$store.state.show_route
				this.$store.state.bottom_Show = !this.$store.state.bottom_Show
				this.show = true
			},
			
			ChangeTime() {
				let time = this.information.dt / 1000
				if(isNaN(this.value)) {
					return
				}
				this.$refs.control.currentTime = this.value / 100 * time

				this.Progress_change()
				console.log(this.lrc_content)
				console.log(this.lrc_time)
			},
			
			//改变歌音量
			ChangeVoice(){
				let tim = this.voice_value
			
				if(isNaN(tim)) {
					return
				}
				this.$store.dispatch("ChangeVoice", tim)
				this.$refs.control.volume = tim / 100
			},
			
			changeIsShow(){
				this.$store.state.show_route = !this.$store.state.show_route
				this.$store.state.bottom_Show = !this.$store.state.bottom_Show
			},
						
			//设置音量
			set_voic() {
				let voic = this.$store.state.voice_size
				this.$refs.control.volume = voic / 100
				this.voice_value = voic
			},
					
			//进度条
			Progress_change() {
				let el = this.$refs.control
				let time = this.information.dt / 1000

				el.addEventListener("timeupdate", ()=> { 
					let val = el.currentTime / time * 100
					this.value = val

					//播放进度条左侧时间Math.round  newlrc
					let Minute = parseInt(el.currentTime / 60)
					let Second = parseInt(el.currentTime % 60)
					this.$refs.Minute_left.innerHTML = Minute >= 10 ? Minute : "0" + Minute
					this.$refs.Second_left.innerHTML = Second >= 10 ? Second : "0" + Second
					
					for(let i = 0; i < this.newlrc.length; i++) {
						if(el.currentTime >= this.newlrc[i].time) {
							this.lrc_content = this.newlrc[i].lrcCN
							this.lrc_time = this.newlrc[i].time
						}
					}
					this.scroll.scrollToElement(document.querySelector(".lrc_text"), 500, false, true)
				});
			},
					
	        //上一首  this.$store.state.song_sheet
	        last_one() {
				let index = this.$store.state.index
				if(index <= 0) {
					this.$store.state.music = []
					this.$store.state.music = this.$store.state.song_sheet[this.$store.state.song_sheet.length - 1]
					this.$store.state.index = this.$store.state.song_sheet.length -1
					this.changeHome()
				}else{
					this.$store.state.music = []
					this.$store.state.music = this.$store.state.song_sheet[this.$store.state.index - 1]
					this.$store.state.index = this.$store.state.index - 1
					this.changeHome()
				}
	        },
					
	        //下一首
	        next_one() {
				let index = this.$store.state.index
				if(index >= this.$store.state.song_sheet.length -1) {
					this.$store.state.music = []
					this.$store.state.music = this.$store.state.song_sheet[0]
					this.$store.state.index = 0
					this.changeHome()
				}else{
					this.$store.state.music = []
					this.$store.state.music = this.$store.state.song_sheet[this.$store.state.index + 1]
					this.$store.state.index = this.$store.state.index + 1
					this.changeHome()
				}
	        },
	  
	        //更换歌曲
	        changeHome() {
				//背景图
				this.$refs.bgc.style.backgroundImage = "url(" + this.information.al.picUrl + ")"
				this.$refs.record.style.backgroundImage = "url(" + this.information.al.picUrl + ")"
	  
				//音乐播放地址
				this.$refs.play_icon.src = require("../src/assets/play/暂停.png")
				this.$store.play = 1

				//进度条方法
				this.Progress_change()
			},
					
			//音乐歌词
			request_url() {
				let URL = "http://localhost:3000/lyric?id=" + this.information.id
				this.axios({
					type: "GET",
					url: URL,
				}).then(r => {
					let arr = lrc.lrcFormat(r.data.lrc.lyric)
					this.newlrc = arr

					this.lrc_content = this.newlrc[0].lrcCN
					this.lrc_time = this.newlrc[0].time

					//进度条方法
					this.Progress_change()
				}).catch(()=> {
					this.newlrc = []
					this.$refs.lrc_p.innerHTML = "暂无歌词"
				})
			},
			
			//点击播放按钮
			changeplay() {
				if(this.$store.state.play) {
					this.$store.state.play = false
					//底部栏按钮
					this.$refs.leftBtn.src =  require("./assets/BottomBar/播放.png")
					//更改蒙层内按钮
					this.$refs.play_icon.src = require("../src/assets/play/播放.png")
					this.$refs.play_icon.alt = "播放"
					//暂停音乐
					this.$refs.control.pause()
				}else {
					this.$store.state.play = true
					//底部栏按钮
					this.$refs.leftBtn.src =  require("./assets/BottomBar/暂停.png")
					//更改蒙层内按钮
					this.$refs.play_icon.src = require("../src/assets/play/暂停.png")
					this.$refs.play_icon.alt = "暂停"
					//播放音乐
					this.$refs.control.play()
				}
			},
			
			//点击列表按钮
			Music_list() {
				this.show_list = !this.show_list
			},
			
			//点击列表删除按钮
			deleteAll() {
				Dialog.confirm({
					message: '确定清空播放列表?'
				}).then(() => {
					this.$store.state.song_sheet = []
					this.$store.state.music = []
					this.$store.state.index = 0
					this.show_list = false
				}).catch(() => {
					
				});
			},
			
			//点击列表歌曲切换歌曲
			replace_music(item, index) {
				this.$store.state.music = item
				this.$store.state.index = index
			},
			
			//点击删除一首歌
			dele_one(item, index) {
				if(index < this.$store.state.index) {
					this.$store.state.index--
				}
				else if(this.$store.state.song_sheet.length == 1) {
					this.$store.state.song_sheet = []
					this.$store.state.music = []
					this.$store.state.index = 0
					this.show_list = false
				}
				else if(index == this.$store.state.index) {
					this.$store.state.music = this.$store.state.song_sheet[index + 1]
				}
				this.$store.state.song_sheet.splice(index, 1)
			},
			
	        //点击唱片显示歌词
	        move_Lyric() {
				this.show = !this.show
	        },
	  
	        //点击歌词显示唱片
	        move_Record() {
				this.show = !this.show
			},
		},
	  
		computed: {
			//当前播放歌曲信息
	  		information() {
				return this.$store.state.music
			},
						
			//当前歌单列表
			song_sheet() {
				return this.$store.state.song_sheet
			},
						
			//是否显示播放界面
			show_route() {
				return this.$store.state.show_route
			},
						
			//是否显示底部界面
			bottom_Show() {
				return this.$store.state.bottom_Show
			},
						
			// 音乐总时长 (分，秒)
			Minute_right() {
				let total_min = parseInt(this.information.dt / 1000 / 60)
				return total_min >= 10 ? total_min : "0" + total_min
			},
						
			// 音乐总时长 (分，秒)
			second_right() {
				let sec = Math.round(this.information.dt / 1000)
				let total_sec = Math.round(sec % 60)
				return total_sec >= 10 ? total_sec : "0" + total_sec
			},
		},
				
		watch: {
			show_route(n, o){
				//设置音量
				this.set_voic()
				
				//获取歌词
				this.request_url()
												
				//进度条方法
				this.Progress_change()

				this.$refs.record.style.backgroundImage = "url(" + this.information.al.picUrl + ")"
				this.$refs.bgc.style.backgroundImage = "url(" + this.information.al.picUrl + ")"
			},
						
			//歌单列表发生变化
			song_sheet(n, o) {
				if(this.song_sheet.length == 0) {
					this.$store.state.bottom_Show = false
				}else {
					if(this.$store.state.play) {
						this.$refs.control.volume = this.$store.state.voice_size / 100
						this.$refs.control.autoplay = "autoplay"
					}
					// 显示bottombar
					this.$store.state.bottom_Show = true
				}
			},
						
			//监听歌曲变化
			information(n, o) {
				if(this.$store.state.song_sheet.length == 0) {
					return
				}
				//改变图片
				this.$refs.bottomImg.style.backgroundImage = "url(" + this.information.al.picUrl + ")" 
				//改变歌词
				this.request_url()
				//播放音乐地址
				this.$refs.control.src = "https://music.163.com/song/media/outer/url?id=" + this.information.id +".mp3"
								
				this.$refs.leftBtn.src =  require("./assets/BottomBar/暂停.png")
				this.$refs.play_icon.src =  require("./assets/play/暂停.png")
				this.$store.state.play = true
				
				this.$refs.control.volume = this.$store.state.voice_size / 100
				this.$refs.control.autoplay = "autoplay"
			},

			show(n, o) {
				if(!this.show) {
					this.scroll.scrollToElement(document.querySelector(".lrc_text"), 500, false, true)
				}
			},
		},
				
		created() {
			this.voice_value = this.$store.state.voice_size
			if(this.$store.state.music.length == 0) {
				this.$store.state.bottom_Show = false
			}
		},
	  
		mounted() {
			//歌词
			this.scroll = new BScroll(this.$refs.Ly ,{
				click: true,
			})
			
			// 播放完之后播放下一首
			let T = this
			this.$refs.control.addEventListener("ended", function () {   //当播放完一首歌曲时也会触发
				T.next_one()
			});
		},
	  
		components: {
			[Popup.name]: Popup,
			[Slider.name]: Slider,
			[Toast.name]: Toast,
			[Dialog.name]: Dialog,
		},
	  
	}
</script>

<style lang="less" scoped>
    #app{
		margin: 0 auto;
		height: 100%;
    }
	body{
		margin: 0;
		padding: 0;
	}
	.auto-img{
		width: 100%;
		display: block;
	}
	
	//动画
	.slide-fade-enter-active {
		transition: all 0.4s ease-out;
		opacity: 1;
	}
	.slide-fade-leave-active {
		transition: all 0.4s cubic-bezier(2.0, 0.5, 0.8, 1.0);
		opacity: 1;
	}
	.slide-fade-enter,
	.silde-fade-leave-to{
		transform: translateY(100px);
		opacity: 0.1;
	}
	
	.BottomBar {
		width: 100%;
		height: 1.6rem;
		border-top: 1px solid #E6E6E6;
		position: fixed;
		background-color: rgba(255, 255, 255, 0.93);
		bottom: 0;
		left: 0;
		z-index: 300;
		
		.click_box {
			height: 100%;
		}

		.head_list{
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
				background-size: cover;
			}
		}

		.tex{
			height: 100%;

			.music_name,
			.music_lrc {
				height: 50%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: flex;
				align-items: center;
			}

			.music_name {
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
	
		//蒙层
		.div_bg {
			position: absolute;
			height: 100%;
			width: 100%;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center center;
			background-attachment: fixed;
			filter: blur(20px);
			z-index: -5;
		}
		.div_topbg {
			position: absolute;
			height: 100%;
			width: 100%;
			background-color: rgba(144, 144, 144, 0.6);
			opacity: 0.7;
			z-index: -4;
		}
	
		//头部
		.head {
			padding-top: .3rem;
			display: flex;
			align-items: center;

			.head_box {
				width: 90%;
				height: 100%;
				margin: 0 auto;
				display: flex;
				align-items: center;
			}

			.center_font {
				color: white;

				span{
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				span:nth-child(1){
					display: block;
					font-size: 16PX;
					font-weight: 600;
				}

				span:nth-child(2){
					display: block;
					font-size: 12PX;
					margin-top: 0.1rem;
				}
			}

			.back {
				width: 0.8rem;
				height: 0.8rem;
			}

			.share {
				width: 1rem;
				height: 0.95rem;
			}
		}
	
		//唱片
		.Record_one {
			background-size: cover;
			z-index: -2;
			width: 4.366666rem;
			height: 4.366666rem;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -75%);
			border: 1.6rem solid black;
			border-radius: 50%;
		}
	
		//音量
		.voice {
			width: 7.995735rem;
			margin: 0.7rem auto 0;

			.btn_voice {
				width: 0.5rem;
				height: 0.5rem;

				img{
					width: 100%;
					height: 100%;
				}
			}
		}
	
		//歌词
		.Lyric {
			width: 100%;
			height: 11.317066rem;
			transform-style: preserve-3d;
			text-align: center;
			overflow: hidden;
			margin-top: .5rem;

			.tex {
				width: 100%;

				p{
					width: 100%;
					height: 25px;
					line-height: 25px;
					font-size: 14px;
					margin: 0;
					text-align: center;
				}
			}

			.lrc_list {
				padding-top: .1rem; 
				white-space: nowrap;
				overflow: hidden;
			}

			.lrc_text {
				color: red;
				font-size: 16px;
			}
		}
	
		//唱片歌词动画
		.v-enter,
		.v-leave-to {
			opacity: 0;
		}
		.v-enter-active,
		.v-leave-active {
			transition: all 0.5s;
		}
		
		// 页脚
		.foot {
			//icon栏
			width: 100%;
			position: fixed;
			bottom: 0;
			margin-bottom: 1rem;

			.img_icon {
				display: block;
				width: 0.746666rem;
				height: 0.746666rem;
				margin: 0 auto;
			}

			//进度条栏
			.Progress {

				width: 8.995735rem;
				height: 1rem;
				margin: 0 auto;
				margin-top: 0.6rem;

				.left {
					width: 10%;
					height: 100%;
					line-height: 1rem;
					float: left;
				}

				.center {
					width: 6.533333rem;
					height: 100%;
					display: inline-block;
					margin-left: calc(~"7.195735rem / 2 - 6.533333rem / 2 ");

					.Progres_bar {
						width: 6.533333rem;
						height: 0.036666rem;
						background-color: white;
						margin-top: calc(~"1rem / 2 - 0.036666rem / 2");
					}

					.btn_music{
						width: 0.5rem;
						height: 0.5rem;

						img{
							width: 100%;
							height: 100%;
						}
					}
				}

				.right {
					width: 10%;
					height: 100%;
					float: right;
					line-height: 1rem;
					text-align: right;
				}
			}
	
			//播放按钮栏
			.play_music {
				width: 100%;
				height: 1.333333rem;
				margin-top: .3rem;

				.van-row {
					height: 100%;
				
					.van-col {
						height: 100%;
					}
				}

				.bign_icon {
					width: 0.8rem;
					height: 0.8rem;
					vertical-align: middle;
					margin-top: calc(~"1.333333rem / 2 - 0.8rem / 2");
				}

				img[alt="上一首"] {
					float: right
				}

				img[alt="播放"],
				img[alt="暂停"] {
					width: 1.7rem;
					height: 1.7rem;
					margin: 0 auto;
					margin-top:  calc(~"1.333333rem / 2 - 1.7rem / 2");
					display: block;
				}
			}
		}
		
		//弹出层
		.MusicList {
			height: 65vh;
			overflow-y: scroll;
			border-top-right-radius: 15px;
			border-top-left-radius: 15px;
		}

		.list_content {
			width: 100%;
			line-height: 1rem;
			font-size: 16PX;
			font-weight: 600;
			padding-left: 0.3rem;
			height: 1rem;
			border-bottom: 1px solid #929292;

			span {
				display: inline-block;
				width: 85%;
				height: 100%;
			}

			.del {
				display: inline-block;
				width: 10%;
				float: right;
				padding-right: 0.35rem;

				img {
					width: 0.8rem;
					height: 0.8rem;
					vertical-align: middle;
				}
			}
		}

		.list_music {
			width: 100%;
			height: 0.8rem;
			margin-top: 0.2rem;
			padding-left: 0.3rem;
			font-size: 15PX;
			line-height: 0.8rem;

			span {
				display: inline-block;
				width: 85%;
				height: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.dele {
			width: 10%;
			float: right;
			padding-right: 0.3rem;
			
			img{
				width: .7rem;
				height: .7rem;
				vertical-align: middle;
			}
		}
</style>
