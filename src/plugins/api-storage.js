
const environment = require('../../environments.js')

export default async (context, inject) => {
  var { $axios, redirect, store } = context
  //var token = context.app.$auth.strategy.token.get();
  console.log('TOKEN', store.getters['token'])
  const api_storage = await $axios.create({
    baseURL: environment.config.api_storage.base_url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': store.getters['token']
    }
  })
  inject('api_storage', api_storage)
}
