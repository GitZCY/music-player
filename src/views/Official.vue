<template>
    <div class="official">
		
       <div class="Box">
			<div class="bg" ref="Topbar">
				<div class="Topbar">
					<div class="Topbar_img">
						<img src="../assets/music/左箭头.png" alt="返回" @click="Goback()">
					</div>
				</div>
			</div>
			
			<div class="introduce_box" :style="{backgroundImage: 'url(' + url + ')'}">
			
			</div>
			
			<div class="Playall">
				<van-row class="play_box">
					<van-col span="3" class="play_btn">
						<img src="../assets/BottomBar/播放.png" alt="播放全部" @click="play_music(musics[0][0], 0)">
					</van-col>
					<van-col span="13" class="play_text">
						播放全部
						<span>(共{{count}}首)</span>
					</van-col>
				</van-row>
			</div>
			
			<div class="BottomBar">
				<van-row class="music_list" v-for="(item, index) in musics[0]" :key="index" @click.native="play_music(item, index)">
					<van-col span="3" class="music_left">{{index + 1}}</van-col>
					<van-col span="15" class="music_center">
						<span class="music_name">{{item.name}}</span>
						<span class="music_user">{{item.ar[0].name}} - {{item.al.name}}</span>
					</van-col>
					<van-col span="6" class="music_right">
						<div><img src="../assets/Open/play.png" alt="播放"></div>
					</van-col>
				</van-row>
			</div>
	   </div>
	   
    </div>
</template>

<script>
    import {Dialog} from 'vant'
    export default {
        name: 'official',

        data() {
            return {
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
				
				//推荐人及头像
				Recommend_user: "",
				Recommend_userimg: "",

				//编辑推荐介绍（无剪切）
				Recommend_nosplit: "",
				
				//当前歌单歌曲数
				count: "",
				
				//bgc_url
				url: "",
            }
        },

        methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(scrollTop > 20){
					this.$refs.Topbar.style.backgroundColor = "#87ceeb";
				}
				if(scrollTop < 20){
					this.$refs.Topbar.style.backgroundColor = "rgba(255, 255, 255, 0)";
				}
		   },
		   
			Goback() {
			   this.$router.go(-1);
			   window.removeEventListener("scroll", this.handleScroll, true)
			},
		   
			play_music(item, index) {
				let list = this.musics[0]
				this.$store.dispatch("PushMusic", {list, index, item})
			}
        },
		
		mounted() {
			 window.addEventListener('scroll', this.handleScroll, true)
		},
		
        computed: {
            //获取仓库的歌曲，用来遍历
            song_sheet() {
                return this.$store.state.song_sheet[0]
            },
			
        },
		
        created() {
			let id = this.$route.params.pid
			this.url = this.$route.params.url
			
			//请求歌单
            this.axios({
                type: "GET",
                url: "http://localhost:3000/playlist/detail?id=" + id 
            }).then(response => {
				//当前歌单信息
				this.CurrentList.push(response.data)
				
				//所有歌单内歌曲
				this.musics.push(response.data.playlist.tracks)
				
				//当前歌单图片
				this.bgc_url = response.data.playlist.coverImgUrl
				
				//当前歌单编辑推荐栏
				let Recom = response.data.playlist.description
				this.Recommend_split = Recom.split("。")[0]
				
				//推荐栏name
				this.Recommend_name = response.data.playlist.name
				
				//推荐栏推荐人及头像
				this.Recommend_user = response.data.playlist.creator.nickname
				this.Recommend_userimg = response.data.playlist.creator.avatarUrl
				
				//未剪切编辑推荐栏
				this.Recommend_nosplit = response.data.playlist.description
				
				//当前歌单歌曲数
				this.count = response.data.playlist.tracks.length
				
            }).catch(() => {
                console.log("榜单请求超时")
            })
        },
		
		updated() {
			
		},
		
        components: {
            [Dialog.name]: Dialog
        },
    }
</script>

<style lang="less" scoped>
	.List{
		padding-bottom: 1.6rem;
	}
	.bg{
		width: 100%;
		height: 1.5rem;
		position: fixed;
		top: 0;
		left: 0;
		transition: all 0.5s;
	}
	.Topbar {
		height: 1.5rem;
		width: 90%;
		font-family: KaiTi;
		padding-top: .1rem;
		background-color: rgba(255, 255, 255, 0);
		margin: 0 auto;
		.Topbar_img{
			width: 15%;
			height: 100%;
			float: left;
			img{
				float: left;
				width: .9rem;
				height: .9rem;
				margin-top: calc(~"50% - .9rem / 2");
			}
		}
		.Topbar_name{
			width: 85%;
			height: 100%;
			display: inline-block;
			float: left;
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
		background-size: cover;
		// background: linear-gradient(to top right, #AEDD81 0%, #AEDD81 25%, #6BC235 90%);
		// background: linear-gradient(to top right, #C7EDE9 0%, #C7EDE9 25%, #AFD7ED 90%);
		// background: linear-gradient(to top right, #FEC180 0%, #FEC180 25%, #FF8993 90%);
		// background: linear-gradient(to top right, #D0FFAE 0%, #87ceeb 25%, #34EBE9 90%);
		position: relative;
		z-index: -1;
		.content{
			width: 90%;
			height: 17vh;
			position: absolute;
			top: 50%;
			left: 50%;
			margin: calc(~"-17vh / 2") calc(~"-90vw / 2");
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
				float: left;
				.top_sp,
				.center_sp,
				.bottom_sp {
					height: 33.33333%;
					padding-left: .3rem;
				}
				.top_sp {
					color: white;
					font-size: 15PX;
					font-weight: 550;
				}
				.center_sp{
					color: rgba(240, 240, 240, 1);
					font-size: 12PX;
					padding-bottom: 0.08rem;
					.first,
					.two {
						display: inline-block;
					}
					.first {
						width: 12%;
						height: 100%;
						line-height: 1rem;
						float: left;
					}
					.two {
						width: 85%;
						height: 100%;
						padding-left: .15rem;
						padding-top: 0.04rem;
						line-height: 1rem;
						float: left;
					}
					img{
						width: 100%;
						height: 100vm;
						border-radius: 50%;
						vertical-align: middle;
					}
				}
				.bottom_sp{
					line-height: calc(~"17vh / 3 / 2");
					word-break: break-all;
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
		margin-top: -.6rem;
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
</style>
