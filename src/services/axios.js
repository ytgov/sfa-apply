export default function ({ $axios, redirect }) {
  /*
  $axios.defaults.headers.common = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "X-API-Key": '86823ecf-e64f-42d2-8ea7-a0984299328c'
  };
  delete $axios.defaults.headers.common["Authorization"];
  */

  $axios.onRequest(config => {
    //config.headers.common['Authorization'] = '86823ecf-e64f-42d2-8ea7-a0984299328c';
    console.log('Axios CONFIG ', config)
  })



  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}


//import { cacheAdapterEnhancer } from "axios-extensions"
//import LRU from "lru-cache"
//const ONE_HOUR = 1000 * 60 * 60
/*
export default function({ $axios }, inject) {
  var api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, *'
      }
    }
  })

  api.setBaseURL('https://us-central1-yukon-gov-sfap.cloudfunctions.net/proxy-sfa/sfa');
  api.setHeader('Authorization', '86823ecf-e64f-42d2-8ea7-a0984299328c');
  
  api.onError(error => {
    console.error("API ERROR", error)
    
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    
  })

  inject('api', api)


  
  const defaultCache = process.server
    ? ssrContext.$axCache
    : new LRU({ maxAge: ONE_HOUR })

  const defaults = $axios.defaults
  // https://github.com/kuitos/axios-extensions
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: "useCache",
    defaultCache
  })

  $axios.onRequest((config) => {
    var token = store.getters['users/token'];
    if (token) {
      config.headers.common['x-access-token'] = token;
    }
  });

  $axios.onResponseError((error) => {
    const request = error.config;
    if (store.getters['users/token'] && error.response && error.response.status === 401 && !request.retry) {
      request.retry = true;
      $axios.get(`https://baseurl.com/umbraco/api/auth/refreshtoken?token=${store.getters['users/token']}`).then((response) => {
        store.state.userToken = response.data;
        return $axios(request);
      }).catch(async () => {
        await store.dispatch('logout');
        redirect('/');
      });
    }
  });
  
}
*/