import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import '../theme/index.css'
import Calculator from './components/Calculator.vue'
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
  Input
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

// 设置语言
locale.use(lang.zhCN)

// Vue.prototype.$ELEMENT = { size: '', zIndex: 3000 };

Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/calculator' },
    { path: '/calculator', component: Calculator,
      // children: [
      //   {
      //     path: 'base',
      //     component:
      //   }
      // ]
    },
  ]
})
// router.beforeEach((t,f,n) => {
//   console.log('t,f,n',t,f,n);
// })


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
