<template>

  <div class="Music">
    <!-- 蒙层 -->
    <div class="div_bg" ref="bgc">

    </div>
    <div class="div_topbg">

    </div>

    <!-- 头部位置 -->
    <van-row class="head">
      <van-col span="4" ><img src="../assets/music/左箭头.png" alt="返回" class="back" @click="Goback()"></van-col>
      <van-col span="16" class="two-van-col">
        <div class="center_font">
          <span>{{this.information[0].name}}</span>
          <span>{{this.information[0].ar[0].name}}</span>
        </div>
      </van-col>
      <van-col span="4"><img src="../assets/music/分享.png" alt="分享" class="share"></van-col>
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
                      <img src="../assets/play/猫爪.png">
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
          <p v-for="(item, index) in newlrc[0]" :key="index">{{item}}</p>
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
            <img :src="item.url" :alt="item.alt" class="img_icon" @click="demo()">
          </van-col>
        </van-row>
      </transition>

      <!-- 播放 -->
      <audio ref="control" autoplay>
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
                <img src="../assets/play/猫爪.png">
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
            <img src="../assets/play/上一首.png" alt="上一首" class="bign_icon" @click="last_one()">
          </van-col>

          <van-col span="8">
            <img src="../assets/play/暂停.png" alt="播放" @click="discharge()" ref="play_icon">
          </van-col>

          <van-col span="8">
            <img src="../assets/play/下一首.png" alt="下一首" class="bign_icon" @click="next_one()">
          </van-col>

        </van-row>
      </div>

    </div>
  </div>

</template>

<script>
  import {mapState, mapGetters} from "vuex";
  import { Popup, Slider, Toast} from 'vant';
  import BScroll from 'better-scroll'

  export default {
    name: 'Music',

    data() {
      return {
        //当前歌曲信息
        information: [],
        //当前歌曲的下标
        index: "",
        //当前歌曲的名字
        // name: [],
        //歌曲播放地址和时间信息
        lrcTime: [],

        //歌词
        lrc: [],

        newlrc: [],

        //本地存储的歌曲信息
        allMusic: [],

        URL: [
          {url: require("../assets/music/收藏.png"), alt: "收藏"},
          {url: require("../assets/music/下载.png"), alt: "下载"},
          {url: require("../assets/music/评论.png"), alt: "评论"},
          {url: require("../assets/music/省略.png"), alt: "省略"}
        ],

        //音乐的value
        value: 0,

        //音量的value
        voice_value: 0,

        //音乐总秒数
        time: "",

        //判定是否在播放
        play: 1,

        //是否显示唱片
        show: true,
      }
    },

    methods: {
      Goback() {
        this.$router.go(-1)
      },

      ChangeTime() {
        let time = this.information[0].dt / 1000
        this.$refs.control.currentTime = this.value / 100 * time
      },

        //改变歌音量
      ChangeVoice(){
        let tim = this.voice_value
        this.$store.dispatch("ChangeVoice", tim)
        this.$refs.control.volume = this.$store.state.voice_size / 100
      },


      //上一首
      last_one() {
        let musicLength = this.allMusic[0]

        let index = this.index

        if(index <= 0) {
          this.information = []
          this.information.push(musicLength[musicLength.length - 1])
          this.index = musicLength.length - 1
          this.changeHome()
        }else{
          if(this.information[0] != null) {
            //清空当前存储歌曲的数组，重新push
            this.information = []
            this.information.push(musicLength[index-1])
            this.index = index - 1
            this.changeHome()
          }
        }

        // for (var i = 0; i < musicLength.length; i++) {
        // 	if(musicLength[i].name = this.information[0].name) {
        // 		console.log(i)
        // 		return
        // 	}else{
        //
        // 	}
        // }
      },

      //播放按钮
      discharge() {
        if(this.play) {
          this.play = 0
          //更改图标
          this.$refs.play_icon.src = require("../assets/play/播放.png")
          this.$refs.play_icon.alt = "播放"
          //暂停音乐
          this.$refs.control.pause()
        }else{
          this.play = 1
          //更改图标
          this.$refs.play_icon.src = require("../assets/play/暂停.png")
          this.$refs.play_icon.alt = "暂停"
          // 播放音乐
          this.$refs.control.play()
        }
      },

      //下一首
      next_one() {
        let musicLength = this.allMusic[0]
        let index = this.index
        if(index >= this.allMusic[0].length - 1) {
          this.information = []
          this.information.push(musicLength[0])
          this.index = 0
          this.changeHome()
        }else{
          if(this.information[0] != null) {
            //清空当前存储歌曲的数组，重新push
            this.information = []
            this.information.push(musicLength[index+1])
            this.index = index + 1
            this.changeHome()
          }
        }
      },

      //更换歌曲
      changeHome() {
        //背景图
        this.$refs.bgc.style.backgroundImage = "url(" + this.information[0].al.picUrl + ")"
        this.$refs.record.style.backgroundImage = "url(" + this.information[0].al.picUrl + ")"

        //音乐播放地址
        this.$refs.playMusic.src = "https://music.163.com/song/media/outer/url?id=" + this.information[0].id +".mp3"
        this.$refs.control.load()
        this.$refs.play_icon.src = require("../assets/play/暂停.png")
        this.play = 1

        //音乐歌词
        let URL = "http://localhost:3000/lyric?id=" + this.information[0].id
        this.axios({
            type: "GET",
            url: URL,
        }).then(lrc => {
            this.lrc = []
            this.newlrc = []
            // console.log(lrc.data.lrc.lyric)
            let tag = /\[([^\[\]]+)\]/
            this.lrc.push(lrc.data.lrc.lyric)
            // console.log("lrc ==> ", this.lrc)
            // console.log("lrc ==> ", this.lrc[0])
            this.newlrc.push(this.lrc[0].split(tag))
            // console.log(this.lrc[0])
            // console.log(this.newlrc[0])
            // for(var i = 0; i < this.newlrc[0].length; i++) {
            //  	console.log(this.newlrc[0][i])
            // }
        }).catch(()=> {
			console.log("请求超时")
		})
      },

      demo() {
        console.log(this.$refs.control.currentTime)
        this.$router.push({name: "Loading"})
      },

      //点击唱片显示歌词
      move_Lyric() {
        this.show = !this.show
        // this.flag = true
      },

      //点击歌词显示唱片
      move_Record() {
        this.show = !this.show
        // this.flag = false
      }
    },

    computed: {
		
		
        // 音乐总时长 (分，秒)
        Minute_right() {
            let total_min = parseInt(this.information[0].dt / 1000 / 60)
            return total_min >= 10 ? total_min : "0" + total_min
        },
        // 音乐总时长 (分，秒)
        second_right() {
            let sec = Math.round(this.information[0].dt / 1000)
            let total_sec = Math.round(sec % 60)
            return total_sec >= 10 ? total_sec : "0" + total_sec
        },

    },

    created() {
		//一进来保存从其他页面带过来的歌曲参数
		// let Params = this.$route.params
		// this.information.push(Params.item)
		// this.index = Params.index
		// // this.name.push(Params.name)
		// // console.log("Params=>", Params.item.id)
		// console.log(Params)
		console.log(this.$store.state.music)
		
		//拿取仓库歌单
		this.allMusic.push(this.$store.state.song_sheet[0])

		// this.axios({
		// 	type: "GET",
			// url: Params.request
		// }).then(response => {
		// 	console.log(response.data.playlist.tracks)
		// 	// this.allMusic.push(response.data)
		// })

		//设置当前歌曲时间
		this.time = Math.round(this.information[0].dt / 1000)

	},

    mounted() {
		//歌词
		let e = this.$refs.Ly
		let scrool = new BScroll(e ,{
			click: true,
		})

		let URL = "http://localhost:3000/lyric?id=" + this.information[0].id
		this.axios({
			type: "GET",
			url: URL,
		}).then(lrc => {
			// console.log(lrc.data.lrc.lyric)
			let tag = /\[([^\[\]]+)\]/
			this.lrc.push(lrc.data.lrc.lyric)
			// console.log("lrc ==> ", this.lrc)
			// console.log("lrc ==> ", this.lrc[0])
			this.newlrc.push(this.lrc[0].split(tag))
			// console.log(this.lrc[0])
			// console.log(this.newlrc[0])
			// for(var i = 0; i < this.newlrc[0].length; i++) {
			//  	console.log(this.newlrc[0][i])
			// }
		})

		//背景图
		this.$refs.bgc.style.backgroundImage = "url(" + this.information[0].al.picUrl + ")"
		this.$refs.record.style.backgroundImage = "url(" + this.information[0].al.picUrl + ")"
		//播放音乐
		this.$refs.playMusic.src = "https://music.163.com/song/media/outer/url?id=" + this.information[0].id +".mp3"

		//进度条(有函数作用域 直接拿，拿不到 this.$refs.control)
		let el = this.$refs.control
		let time = this.information[0].dt / 1000
		let T = this
		this.$refs.control.addEventListener("timeupdate", function () { //播放时间改变   这个会一直打印
			let val = el.currentTime / time * 100
			T.value = val

			//播放进度条左侧时间Math.round
			let Minute = parseInt(el.currentTime / 60)
			let Second = parseInt(el.currentTime % 60)
			T.$refs.Minute_left.innerHTML = Minute >= 10 ? Minute : "0" + Minute
			T.$refs.Second_left.innerHTML = Second >= 10 ? Second : "0" + Second

			//对应时间显示对应歌词
			// console.log(T.newlrc[0])
			// for(var i = 0; i < T.newlrc[0].length; i++) {
			// console.log(T.newlrc[0][i])
			// if(T.newlrc[0][i]) {
			//
			// }
			// }

		});

		//播放完之后播放下一首
		this.$refs.control.addEventListener("ended", function () {   //当播放完一首歌曲时也会触发
			T.next_one()
		});

		//设置音量
		let voic = this.$store.state.voice_size
		this.$refs.control.volume = voic / 100
		this.voice_value = voic
	},

    updated() {

    },

    components: {
		[Popup.name]: Popup,
		[Slider.name]: Slider,
		[Toast.name]: Toast,
    },

  }
</script>

<style lang="less" scoped>
  //蒙层
  .div_bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    background-attachment: fixed;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    -o-filter: blur(20px);
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
    padding-top: calc(~"1.7rem / 2 - 1.341333rem / 2");
    .two-van-col {
      padding: 0.1rem;
    }
    .center_font {
      color: white;
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
    .van-col {
      height: 1.333333rem;
    }
    .back {
      width: 0.8rem;
      height: 0.8rem;
      margin-top: calc(~"1.333333rem / 2 - 0.8rem / 2");
      margin-left: calc(~"1.667466rem / 2 - 0.8rem / 2");
    }
    .share {
      width: 1rem;
      height: 0.95rem;
      margin-left: calc(1.667466rem / 2 - 1rem / 2);
      margin-top: calc(1.333333rem / 2 - 0.95rem / 2);
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
    margin-left: -3.785066rem;
    top: 7.304399rem;
    margin-top: -3.785066rem;
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
    // box-shadow: inset 0px -25px 10px -15px rgba(255, 255, 255, 0.1);
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
</style>
