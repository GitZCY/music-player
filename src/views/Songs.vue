<template>
	<div class="songs">
		<div class="Ranking_Box">
			<div class="Official">
				<div class="introduce">官方榜</div>
			</div>
			<div class="lists">
				<van-row class="songs_list_fw" v-for="(item, index) in splic_list_fw" :key="index" @click.native="Gopath({name: 'official', params: {pid : item.id, url: item.coverImgUrl}})">
					<van-col span="7">
						<img v-lazy="item.coverImgUrl" :alt="item.name">
					</van-col>
					<van-col span="17" class="list_music_box">
						<div class="list_nusic_top">1.{{item.tracks[0].first}} - {{item.tracks[0].second}}</div>
						<div class="list_nusic_center">2.{{item.tracks[1].first}} - {{item.tracks[1].second}}</div>
						<div class="list_nusic_bottom">3.{{item.tracks[2].first}} - {{item.tracks[2].second}}</div>
					</van-col>
				</van-row>
			</div>
		</div>
		
		<div class="Recommend_box">
			<div class="Official">
				<div class="introduce ">更多</div>
			</div>
			<div class="Recommend_lists">
				<van-row class="songs_list" gutter="15">
					<van-col span="8" v-for="(item, index) in splic_list" :key="index" class="songs_col" @click.native="Gopath({name: 'List', params: {pid : item.id}})">
						<div class="song_img">
							<img v-lazy="item.coverImgUrl" alt="">
						</div>
							
						<div class="song_text">{{item.name}}</div>
					</van-col>
				</van-row>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "songs",
		
		data() {
			return {
				//所有榜单列表
				list: [],
				
				//剪切过后的榜单(前四)
				splic_list_fw: [],
				
				//剪切过后的榜单(之后)
				splic_list: []
			}
		},
		
		methods: {
			Gopath(info) {
				this.$router.push(info)
			}
		},
		
		created() {
			this.axios({
				type: "GET",
				url: "http://localhost:3000/toplist/detail",
			}).then((r) => {
				this.list.push(r.data.list)
				this.splic_list.push(r.data.list)
				
				this.splic_list_fw = this.list[0].slice(0, 4)
				this.splic_list = this.list[0].slice(4)
			}).catch(()=> {
				console.log("请求超时")
			})
		},
		
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.Ranking_Box {
		width: 100%;
	}
	
	.Official {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		padding-left: .1rem;
		.introduce {
			width: 100%;
			height: 1rem;
			line-height: 1rem;
			font-size: 14PX;
			font-weight: 545;
		}
	}
	
	.lists {
		width: 90%;
		margin: 0 auto;

		.songs_list_fw{
			width: 100%;
			height: 15.812%;
			margin-top: .3rem;

			img{
				width: 100%;
				height: 100%;
				vertical-align: middle;
				border-radius: 10px;
			}
		}

		.list_music_box{
			height: 100%;

			div{
				width: 100%;
				height: 33.33333%;
				line-height: calc(~"2.6rem / 3");
				padding-left: .2rem;
				overflow: hidden;    
				text-overflow: ellipsis;      
				white-space: nowrap;
			}
		}
	}
	
	.Recommend_box {
		width: 100%;
		margin-top: .8rem;

		.Recommend_introduce {
			width: 90%;
			height: 100%;
			margin: 0 auto;
			padding-left: .1rem;
		}

		.Recommend_lists {
			width: 90%;
			margin: 0 auto;

			.songs_list{

				.songs_col {
					padding-top: .4rem;
					display: flex;
					flex-direction: column;
					align-items: center;

					.song_img {
						
						img{
							width: 100%;
							height: 100%;
							border-radius: 10px;
						}
					}

					.song_text{
						width: 100%;
						height: 2em;
						overflow: hidden;    
						text-overflow: ellipsis;      
						white-space: nowrap;
					}
				}

				
			}
		}
	}
</style>