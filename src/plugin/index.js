import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import Vue from 'vue';

const MyPlugin = Object.create(null);
MyPlugin.install = function(Vue, option) {
  // 添加全局axios
  Vue.prototype.$axios = axios;
}

Vue.use(ElementUI)
Vue.use(MyPlugin)