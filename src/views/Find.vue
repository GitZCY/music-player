<template>
	<div class="find">
		<div :class="{she: true, big_seach: big}">
			<div class="big_null"></div>
			<div :class="[big ? 'Outer' : null]">
				<div :class="[big ? 'big_seach_box' : 'seach_box']" ref="aaa">
					<div :class="[big ? 'big_seach_inp' : 'seach']">
						<input type="text" @click="seach_focus()" @input="changeInp()" v-model="value">
						
						<div v-show="big" :class="[big ? 'big_seach_img' : null]">
							<img src="../assets/BottomBar/搜索.png" alt="搜索" @click="seach()">
						</div>
					</div>
					
					<div v-show="!big" :class="[big ? null : 'seach_img']">
						<img src="../assets/BottomBar/搜索.png" alt="搜索">
					</div>
					
					<div v-show="big" class="cancel" @click="cancel_all()">取消</div>
				</div>
			</div>
			
			<van-tabs v-show="classification" type="card" class="Columns" @click="demo">
				
				<van-tab title="单曲">
					<div class="single_box">
						
						<van-row class="single_head" v-for="(item, index) in seachResult_single" :key="index" @click.native="play_music(item)">
							<van-col span="21" class="single_left">
								<span class="sp_name">{{item.name}}</span>
								<span class="sp_introduce">{{item.artists[0].name}} {{item.artists[1] ? "/ " + item.artists[1].name : null}} - {{item.album.name}}</span>
							</van-col>
							<van-col span="3" class="single_right">
								<img src="../assets/Open/play.png" alt="播放">
								<!-- <img src="../assets/BottomBar/播放.png" alt="播放"> -->
							</van-col>
						</van-row>
						<div class="moreAndMore" @click="seach(true)">加载更多. . .</div>
						
					</div>
				</van-tab>
				
				<van-tab title="歌手">
					<div class="singer_box">
						
						<van-row class="singer_head" v-for="(item, index) in seachResult_singer" :key="index" @click.native="details(item)">
							<van-col span="4" class="singer_left">
								<img v-lazy="item.img1v1Url" alt="头像">
							</van-col>
							<van-col span="20" class="singer_right">
								<span class="singer_name">{{item.name}}</span>
							</van-col>
						</van-row>
						
					</div>
				</van-tab>
				
				<!-- 歌手详情弹出层 -->
				<van-popup v-model="show" position="bottom" :overlay="false" class="Popup" overlay>
					<div class="popup_head" v-if="show">
						<div class="popup_name">{{item_name}}简介</div>
						<span class="popup_content">{{seachResult_Works[0].briefDesc ? seachResult_Works[0].briefDesc : "这个人什么都没留下"}}</span>
					</div>
					<div class="popup_works" v-if="show">
						<div class="works_name">{{seachResult_Works[0].introduction[0] ? seachResult_Works[0].introduction[0].ti='' ? "展示" : seachResult_Works[0].introduction[0].ti : "ta还没展示哦"}}</div>
						<span class="works_list">{{seachResult_Works[0].introduction[0] ? seachResult_Works[0].introduction[0].txt : "这个人什么都没留下"}}</span>
					</div>
				</van-popup>
				
				<van-tab title="专辑">
					<div class="Album_box">
						
						<van-row class="Album_head" v-for="(item, index) in seachResult_Album" :key="index">
							<van-col span="4" class="Album_left">
								<img v-lazy="item.picUrl" alt="头像">
							</van-col>
							<van-col span="20" class="Album_right">
								<span class="Album_name_top">{{item.name}}</span>
								<span class="Album_name_bottom">{{item.artists[0].name}}{{item.artists[1] ? "/" + item.artists[1].name : null}} </span>
							</van-col>
						</van-row>
						
					</div>
				</van-tab>
				
				<van-tab title="歌单">
					<div class="songSheet_box">
						
						<van-row class="songSheet_head" v-for="(item, index) in seachResult_songSheet" :key="index" @click.native="Gopath({name: 'List', params: {pid : item.id}})">
							<van-col span="4" class="songSheet_left">
								<img v-lazy="item.coverImgUrl" alt="头像">
							</van-col>
							<van-col span="20" class="songSheet_right">
								<span class="songSheet_name_top">{{item.name}}</span>
								<span class="songSheet_name_bottom">{{item.trackCount}}首 by {{item.creator.nickname}}, 播放{{item.playCount > 100000 ?  parseFloat(item.playCount / 10000).toFixed(2) + "万次" : item.playCount + "次"}}</span>
							</van-col>
						</van-row>
						
					</div>
				</van-tab>
			</van-tabs>
			
			<div v-show="isShow" class="record_box">
				<van-row class="record_top_box">
					<van-col span="22" class="record_top_left">历史纪录</van-col>
					<van-col span="2" class="record_top_right">
						<img src="../assets/delete/删除.png" alt="删除" @click="dele()">
					</van-col>
				</van-row>
				
				<p class="record_list">
					<span v-for="(item, index) in Sear_record" :key="index" @click="click_sp(item)">{{item}}</span>
				</p>
			</div>
			
			<div v-show="isShow" class="Hot">
				<div class="Hot_introduce">热搜榜</div>
				<div class="Hot_introduce_list">
					 <van-row class="Hot_list" v-for="(item, index) in hotMusic[0]" :key="index" @click.native="Hot_seach(item)">
						<van-col span="3" class="Hot_left">{{index + 1}}</van-col>
						<van-col span="21" class="Hot_center">
							<span class="Hot_name">{{item.first}}</span>
						</van-col>
					</van-row>
				</div> 
			</div>
			
		</div>
		
		<van-swipe :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item, index) in banners[0]" :key="index">
				<img v-lazy="item.pic" class="auto-img">
			</van-swipe-item>
		</van-swipe>
		
		<!-- 推荐 -->
		<div class="noitems" >
			<span>推荐歌单</span>
		</div>
		
		<!-- 推荐歌单栏 -->
		<div class="Type_noitems">
			
			<div class="Open">
				<img src="../assets/Open/加号.png" alt="展开" @click="plus()" :class="[up ? 'img_active' : null]">
			</div>
			
			<div class="set_noitems">
				<div class="img_box">
					<div class="img_list" v-for="(item, index) in noitems_six" :key="index" @click="Gopath({name: 'List', params: {pid : item.id}})">
						<div class="image_v">
							<img v-lazy="item.picUrl" alt="图片">
						</div>
						<div class="list_name">
							{{item.name}}
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
		<div v-if="rotate" class="bgc_box" @click="back">
			<div class="more_music_box">
				<div :class="{more_music : true, opact : opact}">
					<div class="more_list" v-for="(item, index) in noitems" :key="index" @click="Gopath({name: 'List', params: {pid : item.id}})">
						<div class="more_image">
							<img v-lazy="item.picUrl" alt="图片">
						</div>
						<div class="more_name">
							{{item.name}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import Seach from "../views/Seach.vue";
	import { Swipe, SwipeItem, Tab, Tabs, Dialog, Popup} from 'vant';
	export default {
		name: "find",
		
		data() {
			return {
				rotate: false,

				opact: false,

				//轮播图
				banners: [],
				
				//推荐歌单全部歌曲
				noitems: [],
				
				//推荐歌单前六首 及加载更多
				noitems_six: [],
				
				//热搜榜
				hotMusic: [],
				
				//搜索结果单曲
				seachResult_single: [],
				
				//搜索结果歌手
				seachResult_singer: [],
				
				//歌手详情
				seachResult_Works: [],
				
				//歌手详情中名字
				item_name: '',
				
				//搜索结果专辑
				seachResult_Album: [],
				
				//搜索结果歌单
				seachResult_songSheet: [],
				
				//搜索记录
				Sear_record: [],
				
				//当前搜索的url
				active: "",
				
				//点击加号
				up: false,
				
				//显示搜索列表
				big: false,
				
				// 历史纪录及热搜榜
				isShow: false,
				
				//分类列表
				classification: false ,
				
				//input里的value
				value: '',
				
				//搜索栏下分类栏
				list: 1,
				
				//设置歌曲下标
				index: 0,
				
				//歌手详情弹出层
				show: false,
			}
		},
		
		methods: {
			demo(index, title) {
				if(index == 0 && title == "单曲") {
					// if(this.seachResult_single.length == 0) {
						this.list = 1
						this.seach(0, 1)
					// }
				}
				if(index == 1 && title == "歌手") {
					// if(this.seachResult_singer.length == 0) {
						this.list = 100
						this.seach(0, 100)
					// }
				}
				if(index == 2 && title == "专辑") {
					// if(this.seachResult_Album.length == 0) {
						this.list = 10
						this.seach(0, 10)
					// }
				}
				if(index == 3 && title == "歌单") {
					this.list = 1000
					this.seach(0, 1000)
				}
			},
			
			//歌手详情
			details(item) {
				this.axios({
					type: "GET",
					url: "http://localhost:3000/artist/desc?id=" + item.id
				}).then((r)=>{
					this.seachResult_Works = []
					this.seachResult_Works.push(r.data)
					this.item_name = item.name
					this.show = !this.show
				}).catch(()=>{
					console.log("请求超时")
				})
			},
			
			//单机搜索框
			seach_focus() {
				this.big = true
				this.isShow = true
				if(this.hotMusic.length != 0) {
					return
				}else{
					//请求热搜榜
					this.axios({
						type: "GET",
						url: "http://localhost:3000/search/hot"
					}).then((r) => {
						this.hotMusic.push(r.data.result.hots)
					})
				}
			},
			
			//搜索按钮
			seach(flag) {
				let leng = flag ? this.seachResult_single.length : 0
				
				let num = this.list
				if(this.value.length == 0) {
					return
				}
				
				if(!flag){
					this.seachResult_single = [] 
				}
				
				this.axios({
					type: "GET",
					url: "http://localhost:3000/search?keywords=" + this.value + "&type=" + num + "&offset=" + leng
				}).then((r)=> {
					if(num == 1) {
						if(flag) {
							this.seachResult_single.push(...(r.data.result.songs))
						}else {
							this.seachResult_single = []
							this.seachResult_single.push(...(r.data.result.songs))
						}	
					}
					if(num == 100) {
						this.seachResult_singer = []
						this.seachResult_singer.push(...(r.data.result.artists))
					}
					if(num == 10) {
						this.seachResult_Album = []
						this.seachResult_Album.push(...(r.data.result.albums))
					}
					if(num == 1000) {
						this.seachResult_songSheet = []
						this.seachResult_songSheet.push(...(r.data.result.playlists))
					}
					
					this.isShow = false
					this.classification = true
					this.Search_record()
				}).catch(()=>{
					console.log("请求超时")
				})
			},
			
			//搜索记录
			Search_record() {
				let record = this.Sear_record
				let Local_record = JSON.parse(localStorage.getItem("Seach")) 
				if(Local_record == null) {
					this.Sear_record.push(this.value)
					localStorage.setItem("Seach", JSON.stringify(this.Sear_record))
				}else {
					for(let i = 0; i < Local_record.length; i++) {
						if(this.value == Local_record[i]) {
							return
						}
					}
					this.Sear_record = []
					this.Sear_record.push(...(JSON.parse(localStorage.getItem("Seach"))))
					this.Sear_record.push(this.value)
					localStorage.setItem("Seach", JSON.stringify(this.Sear_record))
				}
			},
			
			//清空搜索记录
			dele() {
				if(this.Sear_record.length == 0) {
					return
				}
				Dialog.confirm({
					message: '确定清空全部历史纪录？'
				}).then(() => {
					this.Sear_record = []
					localStorage.removeItem("Seach")
				}).catch(() => {
					
				});
			},
			
			//点击历史纪录
			click_sp(item) {
				this.value = item
				this.seach()
			},
			
			//监听搜索按钮改变
			changeInp() {
				if(this.value.length == 0) {
					this.isShow = true
					this.classification = false
				}
			},
			
			//播放音乐
			play_music(item) {
				let list = this.seachResult_single
				let index = this.index
				this.axios({
					type: "GET",
					url: "http://localhost:3000/song/detail?ids=" + item.id
				}).then((r)=> {
					let list = r.data.songs
					let item = r.data.songs[0]
					this.$store.dispatch("PushMusic", {list, index, item})
					this.index++
				}).catch(()=>{
					console.log("请求超时")
				})
			},
			
			Gopath(info) {
				this.$router.push(info)
			},
			
			plus() {
				this.rotate = true
				setTimeout(() => {
					this.opact = true
				}, 300);
			},
			
			back() {
				this.rotate = false
				this.opact = false
			},

			Hot_seach(item) {
				this.value = item.first
				this.seach()
			},
			
			//点击取消搜索
			cancel_all() {
				this.big = false
				this.isShow = false
				this.classification = false
				this.value = ''
			},
			
			//监听推荐列表滚动事件
			list_scoll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(scrollTop > 20){
					this.$refs.Topbar.style.backgroundColor = "#6BC235";
				}
				if(scrollTop < 20){
					this.$refs.Topbar.style.backgroundColor = "rgba(255, 255, 255, 0)";
				}
			}
		},
		
		computed: {
			Data() {
				return new Date(this.seachResult_Album[0].publishTime) 
			},

		},
		
		created() {
			//拿取本地存储
			let loc = JSON.parse(localStorage.getItem("Seach"))
			if(loc != null) {
				this.Sear_record.push(...(JSON.parse(localStorage.getItem("Seach"))))
			}
			
			//轮播图url
			let Rotation_URL = "http://localhost:3000/banner?type=2"
			//推荐歌单url
			let Noitems_URL = "http://localhost:3000/personalized"
			
			this.axios({
				type: "GET",
				url: Rotation_URL
			}).then((res)=> {
				this.banners.push(res.data.banners)
			})
			
			this.axios({
				type: "GET",
				url: Noitems_URL
			}).then((res)=> {
				let arr = res.data.result
				this.noitems.push(...(res.data.result))
				this.noitems_six.push(...(arr.splice(0, 6)))
			}).catch(()=> {
				console.log("请求超时")
			})
			
		},
		
		mounted() {

		},
		
		components: {
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[Dialog.name]: Dialog,
			[Popup.name]: Popup,
		}
	}
</script>

<style lang="less" scoped>
	.van-swipe{
		width: 89%;
		height: 35vw;
		box-sizing: border-box;
		margin: 0 auto 0.4rem;
		border-radius: 0.4rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
		
	//推荐栏
	.noitems{
		width: 90%;
		height: 1rem;
		background-color: #EBEBEB;
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

	.Type_noitems {
		width: 90%;
		margin: 0 auto;

		.img_box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.img_list {
				width: 30%;
				margin-top: .3rem;
					
				.image_v {
					width: 100%;
					img {
						border-radius: 5px;
						width: 100%;
						height: 100%;
					}
				}
					
				.list_name {
					width: 100%;
					height: 2.5em;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical; 
				}
			}
		}
	}
	
	

	.Open{
		display: block;
		font-size: 14PX;
		text-align: center;
		overflow: hidden;
		margin-top: .3rem;
		img{
			width: 0.5rem;
			height: 0.5rem;
			vertical-align: middle;
			transition: all 0.5s;
		}
	}
	
	//推荐歌单点击加载更多
	
	
	//点击加号后旋转
	.img_active{
		transform: rotate(90deg) translateZ(0);
	}
	
	//搜索栏
	.seach_box {
		width: 90%;
		height: 5.5vw;
		border: 1px solid #708090;
		margin: 0.2rem auto 0.4rem;
		border-radius: 15px;
		overflow: hidden;
		transform: all 0.5s;
		
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
	
	.she {
		width: 100%;
		height: 100%;
		transition: all 0.5s;
	}
	
	.big_seach {
		width: 100%;
		height: 100vh;
		position: absolute;
		z-index: 100;
		top: 0;
		background-color: white;
		transition: all 0.5s;

		.big_null{
			width: 90%;
			height: 6vw;
			margin: 0.5rem 5% 0.5rem;
		}
		
		.Outer {
			width: 100%;
			height: 1.55rem;
			background: white; 
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
		}
		
		.big_seach_box {
			width: 90%;
			height: 6vw;
			margin: 0.5rem 5% 0.5rem;
			display: inline-block;
			position: fixed;
			transition: all 0.1s;
		}
		
		.big_seach_inp {
			width: 88%;
			height: 100%;
			border: 1px solid #708090;
			border-radius: 15px;
			float: left;

			input{
				width: 90%;
				height: 100%;
				border: none;
				font-size: 12PX;
				background-color: rgba(255, 255, 255, 0);
				padding: 0;
				padding-left: .1rem;
				float: left;
			}
			
			.big_seach_img {
				width: 0.45rem;
				height: 100%;
				display: inline-block;
				position: relative;

				img{
					width: 0.45rem;
					height: 0.45rem;
					vertical-align: middle;
					position: absolute;
					top: 50%;
					margin-top: calc(~"-0.45rem / 2");
					margin-left: 20%;
				}
			}
		}
		
		//分类列表栏
		.Columns {
			margin-top: 0.5rem;

			.single_box {
				width: 90%;
				height: 84.5vh;
				overflow: hidden;
				margin: 0.3rem auto 0;
				overflow-y: scroll;
				padding-bottom: 1.6rem;

				.single_head {
					width: 100%;
					height: 1.5rem;
					margin-top: 0.3rem;
					
					.single_left {
						height: 100%;
						line-height: calc(~"1.5rem / 2");
						
						.sp_name {
							display: block;
							height: 50%;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							font-size: 15PX;
							font-weight: 540;
						}
						
						.sp_introduce {
							display: block;
							height: 50%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							color: rgb(146, 146, 146);
							font-size: 12PX;
						}
					}
					
					.single_right {
						height: 100%;
						line-height: 1.5rem;
						img{
							width: 0.9rem;
							height: 0.9rem;
							vertical-align: middle;
						}
					}
				}
			}
			.moreAndMore {
				width: 100%;
				height: 1.3rem;
				line-height: 1.3rem;
				font-size: 15PX;
				font-weight: 500;
				letter-spacing: 0.1rem;
				text-align: center;
			}
		}
		
		//歌手栏
		.singer_box {
			width: 90%;
			height: 84.5vh;
			overflow: hidden;
			margin: 0.3rem auto 0;
			overflow-y: scroll;
		}
		
		.singer_head {
			width: 100%;
			height: 1.5rem;
			margin-top: 0.3rem;
		}
		
		.singer_left {
			height: 100%;
			
			img{
				width: 1.5rem;
				height: 1.5rem;
				border-radius: 50%;
				vertical-align: middle;
			}
		}
		
		.singer_right {
			height: 100%;
			line-height: 1.5rem;
			padding-left: 0.3rem;
			font-size: 14PX;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		
		.cancel {
			float: right;
			line-height: 5.8vw;
			padding-left: 0.06rem;
			font-size: 14PX;
			color: blue;
		}

		//歌手栏弹出层
		.Popup {
			height: 70vh;
			overflow-y: scroll;
		}

		.popup_head {
			width: 96%;
			margin: 0.2rem auto;
		}

		.popup_name,
		.works_name {
			padding-left: 0.3rem;
			border-left: 0.1rem solid red;
			font-size: 14PX;
			font-weight: 550;
		}

		.popup_content,
		.works_list {
			margin-top: 0.3rem;
			display: inline-block;
			font-size: 13PX;
			line-height: 0.5rem;
		}

		.popup_works {
			width: 96%;
			margin: 0.3rem auto;
		}
		
		//专辑栏
		.Album_box {
			width: 90%;
			height: 84.5vh;
			overflow: hidden;
			margin: 0.3rem auto 0;
			overflow-y: scroll;
		}

		.Album_head {
			width: 100%;
			height: 1.5rem;
			margin-top: 0.3rem;
		}

		.Album_left {
			height: 100%;

			img{
				width: 1.5rem;
				height: 1.5rem;
				border-radius: 8px;
			}
		}

		.Album_right {
			height: 100%;
			line-height: calc(~"1.5rem / 2");
			padding-left: 0.3rem;
		}

		.Album_name_top,
		.Album_name_bottom {
			display: block;
			height: 50%;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.Album_name_bottom {
			color: #929292;
			font-size: 12PX;
		}
		   
		//歌单栏
		.songSheet_box {
			width: 90%;
			height: 84.5vh;
			overflow: hidden;
			margin: 0.3rem auto 0;
			overflow-y: scroll;
		}

		.songSheet_head {
			width: 100%;
			height: 1.5rem;
			margin-top: 0.3rem;
		}

		.songSheet_left {
			height: 100%;

			img{
				width: 1.5rem;
				height: 1.5rem;
				border-radius: 8px;
			}
		}

		.songSheet_right {
			height: 100%;
			line-height: calc(~"1.5rem / 2");
			padding-left: 0.3rem;
		}

		.songSheet_name_top,
		.songSheet_name_bottom {
			display: block;
			height: 50%;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.songSheet_name_bottom {
			color: #929292;
			font-size: 12PX;
		}
		
		//历史纪录栏
		.record_box {
			width: 90%;
			margin: 0 auto;

			.record_top_left {
				height: 0.8rem;
				line-height: 0.8rem;
				font-size: 14PX;
				font-weight: 600;
			}

			.record_top_right {
				height: 0.8rem;

				img{
					width: 0.8rem;
					height: 0.8rem;
				}
			}
		}

		.record_list {
			width: 100%;
			margin-top: 0.2rem;
			white-space: nowrap;
			overflow-x: scroll;
			padding-bottom: 0.3rem;
			margin-bottom: 0;

			span{
				display: inline-block;
				background-color: #ccc;
				padding: 0.2rem;
				margin-left: 0.2rem;
				border-radius: 15px;
				font-size: 14PX;
			}

			span:nth-child(1){
				margin-left: 0;
			}
		}
		
		.Hot {
			width: 90%;
			margin: 0.5rem auto;

			.Hot_introduce {
				font-size: 14PX;
				font-weight: 600;
			}

			.Hot_introduce_list {

				.Hot_list{
					width: 100%;
					height: 1.5rem;

					.Hot_left{
						height: 100%;
						line-height: 1.5rem;
						font-size: 19PX;
						text-align: center;
						color: rgb(146, 146, 146);
					}

					.Hot_center{
						height: 100%;
						line-height: calc(~"1.5rem / 2");

						.Hot_name{
							display: block;
							line-height: 1.5rem;
							height: 100%;
							font-size: 15PX;
							font-weight: 540;
							overflow: hidden;    
							text-overflow: ellipsis;      
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
	
	.bgc_box {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.9);
		position: fixed;
		left: 0;
		top: 0;
	}

	.more_music_box {
		width: 90vw;
		height: 70vh;
		border: 1px solid white;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		border-radius: 15px;
		overflow-y: scroll;
		animation: more_music_box 0.3s;
	}

	@keyframes more_music_box {
		from {
			width: 0;
			height: 0;
		}
		to {
			width: 90vw;
			height: 70vh;
		}
	}

	.more_music {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		opacity: 0;
		transition: all 0.3s;

		.more_list {
			width: 30%;
			margin-top: .3rem;
			
			.more_image {
				width: 100%;
				img {
					border-radius: 5px;
					width: 100%;
					height: 100%;
				}
			}
				
			.more_name {
				width: 100%;
				height: 2.5em;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical; 
			}
		}
	}

	.opact {
		opacity: 1;
	}
</style>
