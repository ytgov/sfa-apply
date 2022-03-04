export default function ({ $axios, redirect }) {

/*
  $axios.interceptors.request.use(config => {
    config.headers.common = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    return config;
  });

  $axios.onRequest(config => {
    //config.headers.common['Authorization'] = '86823ecf-e64f-42d2-8ea7-a0984299328c';
    console.log('Axios CONFIG ', config)
  })
 */
  $axios.onResponse(response => {
    //config.headers.common['Authorization'] = '86823ecf-e64f-42d2-8ea7-a0984299328c';
    //console.log('Response', response)
    //return response
  })


  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })


}