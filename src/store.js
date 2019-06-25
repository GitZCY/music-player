import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //用户登录状态数据
    user: false,
    user_infor: [],

    //主页路由的index
    Home_index: 1,

    //当前歌单内歌曲
    song_sheet: [],

    //当前播放歌曲的index
    index: 0,

    //当前播放的歌曲
    music: [],

    //播放状态
    play: true,

    //音量的value
    voice_size: 30,

    //播放器
    show_route: false,

    //是否显示底部播放器
    bottom_Show: true
  },

  getters: {
    //传出当前歌曲信息
    information_img(state) {
      return state.music.al.picUr;
    }
  },

  mutations: {
    //改变主页的index
    change_home_index(state, index) {
      state.Home_index = index;
    },

    //调节音量(tim是vue中传过来的参数)
    Change_voice(state, tim) {
      state.voice_size = tim;
    },

    //插入歌单歌曲  记录当前播放歌曲及下标
    Push_music(state, value) {
      //插入歌曲
      if (value.list.length > 1) {
        state.song_sheet = [];
        state.song_sheet.push(...value.list);
        state.index = value.index;
      } else {
        if (this.state.song_sheet.length == 0) {
          state.song_sheet.push(...value.list);
          state.index = state.song_sheet.length - 1;
        } else {
          for (let i = 0; i < this.state.song_sheet.length; i++) {
            if (this.state.song_sheet[i].id == value.list[0].id) {
              console.log("重复");
              return;
            }
          }
          state.song_sheet.push(...value.list);
          state.index = state.song_sheet.length - 1;
        }
      }
      //记录歌曲及下标
      state.music = value.item;
    }
  },

  actions: {
    //改变主页index
    ChangeHomeIndex(context, index) {
      context.commit("change_home_index", index);
    },

    //调节音量(tim是vue中传过来的参数)
    ChangeVoice(context, tim) {
      context.commit("Change_voice", tim);
    },

    //插入歌单歌曲
    PushMusic(context, value) {
      context.commit("Push_music", value);
    }
  }
});
