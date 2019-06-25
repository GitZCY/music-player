import Vue from "vue";
import App from "./App.vue";
import "lib-flexible/flexible.js";
import router from "./router/router.js";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import Vant from "vant";
import {Button, Row, Col, Icon, Lazyload } from "vant";
Vue.use(Button).use(Row).use(Col).use(Icon).use(Lazyload);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
