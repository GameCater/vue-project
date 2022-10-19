import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CATEGORY_LIST: [
                    "默认", "喜剧", "爱情", "动作", 
                    "科幻", "动画", "悬疑", "犯罪", 
                    "惊悚", "冒险", "音乐", "历史", 
                    "奇幻", "恐怖", "战争", "传记", 
                    "歌舞", "武侠", "情色", "灾难", 
                    "西部", "纪录片", "短片"
                  ],
    USER: null,
    USER_STATE: false
  },
  getters: {
  },
  mutations: {
    TAB_USER(state, user) {
      if (user) {
        state.USER = user;
        state.USER_STATE = true;
      } else {
        state.USER = null;
        state.USER_STATE = false;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
