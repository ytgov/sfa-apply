
const environment = require('../../environments.js')

export default async (context, inject) => {
  var { $axios, redirect, store } = context
  //var token = context.app.$auth.strategy.token.get();
  console.log('TOKEN', store.getters['token'])
  const api = await $axios.create({
    baseURL: environment.config.api.base_url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': store.getters['token']
    }
  })
  inject('api', api)
}



/*
function tokenHandler(config, store) {
  console.log(store)
  if (store.getters['users/token']) {
    config.headers.common['x-access-token'] = store.getters['users/token'];
  }
  return config
}

API.interceptors.request.use(config => tokenHandler(config, store), function (error) {
    //return Promise.reject(error);
})
*/

/*
console.log(store)

export const API = axios.create({
  baseURL: "http://localhost:3000", //process.env.APIbaseUrl,
  //baseURL: "https://q4ihh659je.execute-api.us-east-1.amazonaws.com/dev",
  headers: {
    // Authorization: 'Bearer {token}'
  }
})


API.onRequest( (config, { store }) => {
  if (store.getters['users/token']) {
    config.headers.common['x-access-token'] = store.getters['users/token']
  }
})

API.interceptors.request.use(request => { store } => {
  if (store.getters['users/token']) {
    request.headers.common['x-access-token'] = store.getters['users/token']
  }
  return request
})
*/

/*
API.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

API.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})
*/