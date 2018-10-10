import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import '../theme/index.css'
import Calculator from './components/Calculator.vue'
import { debug } from './utils/constants'
import common from './modules/common'

import {
  Button,
  Menu,
  MenuItem,
  Container,
  Header,
  Main,
  Footer,
  Radio,
  Row,
  Col,
  Input,
  Card
} from 'element-ui';

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.use(Button)
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Radio);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Card);

// 设置语言
locale.use(lang.zhCN)

// Vue.prototype.$ELEMENT = { size: '', zIndex: 3000 };

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/calculator'
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: Calculator,
    },
    {
      path: '/githubusers',
      name: 'githubusers',
      component: () => import('./components/GithubUsers')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (['calculator', "githubusers"].indexOf(to.name) > -1) {
    store.commit('common/save', { activeMenu: to.name })
  }
  next()
})

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    common
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
