import { searchGithubUsers } from '@/service/common'


export default {
  namespaced: true,
  state: {
    activeMenu: 'calculator',
    githubTotal: 0,
    githubList: []
  },
  getters: {

  },
  mutations: {
    save(state, payload) {
      Object.keys(payload).map((key) => {
        state[key] = payload[key]
      })
    },
  },
  actions: {
    async searchGithubUsers({ commit }, { kw }) {
      console.log(kw);

      let data = await searchGithubUsers(kw)
      commit('save', { githubTotal: data.total_count, githubList: data.items })
    }
  },
}
