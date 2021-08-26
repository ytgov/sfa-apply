export default function({ store, redirect, route, $auth }) {
  if (process.client) {


    if ($auth.loggedIn) {
      /*
      if (!store.getters['eligability/status'] && !route.path.includes('/eligability')) {
        redirect('/eligability')
      }
      */
      /*
       store.dispatch['profile/GET'].then((profile)=>{
          store.commit('profile/SET', profile)
       })
       */
    } else {
      if (!['/login', '/logout'].includes(route.path)) {
        redirect('/login')
      }
    }
  }
}