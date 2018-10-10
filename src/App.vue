<template>
  <div id="app">
    <el-container direction='vertical'>
      <el-header>
        <el-menu mode="horizontal"
          active-text-color='#4caf50'
          :default-active='activeMenu'>
          <el-menu-item v-for="(menu, key) in menus" :key='key' :index='key'>
            <router-link :to="'/'+key">{{menu}}</router-link>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>s j m</el-footer>
    </el-container>

  </div>
</template>

<script>
import { menus } from './utils/constants'

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      menus,
    }
  },
  beforeCreate: function() {
  },
  computed: {
    activeMenu: {
      get: function () {
        return this.$store.state.common.activeMenu
      },
      set: function (val) {
        this.$store.commit('common/save', { activeMenu: val })
      }
    },

  },
  // watch: {
  //   $route(to, from) {
  //     console.log(to, from);
  //   }
  // },
  // beforeRouteUpdate(to, from, next){
  //   console.log(to, from, next,'to, from, next');
  // }
}
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  /* text-align: center; */
  min-height: 100vh;
}
a {
  text-decoration: none;
}
.el-container {
  height: 100vh;
}
.el-menu-item {
  a {
    display: block;
  }
}
.el-main {
  min-height: calc(~'100vh - 120px');
  overflow: auto;
  background: #fafafa;
}
.el-footer {
  text-align: center;
  border-top: 1px solid #e9e9e9;
  line-height: 60px;
  // box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
