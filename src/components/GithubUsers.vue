<style scoped lang='less'>
.githubUsers {
  width: 600px;
  margin: 0 auto;
}
.results {
  .item {
    margin: 12px 0;
  }
  .image {
    width: 100px;
    border-radius: 4px;
  }
}
</style>

<template>
  <div class="githubUsers">

      <el-input v-model="searchKey" placeholder="请输入" @keyup.enter.native="searchGithubUsers"></el-input>

      <div class="results">
        <el-card class="item" v-for="(item, i) in githubList" :key='i' :body-style="{ padding: '6px' }">
          <el-row>
            <el-col :span='5'>
              <img :src="item.avatar_url" class="image">
            </el-col>
            <el-col :span='19'>
              <a :href="item.html_url" target="_blank" rel="noopener noreferrer">{{item.login}}</a>
            </el-col>
          </el-row>
        </el-card>
      </div>

  </div>
</template>

<script>
// https://developer.github.com/v3/search/#search-users

export default {
  name: 'GithubUsers',
  beforeCreate: function() {
  },

  props: {

  },
  data() {
    return {
      searchKey: '',
    }
  },
  computed: {
    githubList: function() {
      return this.$store.state.common.githubList
    }
  },
  watch: {

  },
  methods: {
    searchGithubUsers: function(e) {
      this.$store.dispatch({ type: 'common/searchGithubUsers', kw: e.target.value })
    }
  }
}
</script>

