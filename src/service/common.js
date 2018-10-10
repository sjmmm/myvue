import request from './request'

export const searchGithubUsers = (kw) => {
  console.log('====================================');
  console.log('kw',kw);
  console.log('====================================');
  return request(`https://api.github.com/search/users`, { params: { q: kw } })
}

