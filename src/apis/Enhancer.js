const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

const { APIWrapper } = require('../structures')

module.exports = class Enhancer extends APIWrapper {
  constructor () {
    super({ name: 'enhancer' })
  }

  getUser (user) {
    return this.request('users', { user })
  }

  getGroup (group) {
    return this.request('groups', { group })
  }

  request (endpoint, params) {
    return fetch(
      `${process.env.ENHANCER_API_URL}/${endpoint}?${new URLSearchParams(
        params
      ).toString()}`
    ).then((response) => response.json())
  }
}
