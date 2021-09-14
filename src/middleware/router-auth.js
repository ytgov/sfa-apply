export default function(context) {
  //console.log("Context", context)
  var { store, redirect, route, $auth } = context
  if (process.client) {

    
    if ($auth.loggedIn) {
      //commit('token', $auth.strategy.token.get())
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
      if (!['/login', '/login/', '/logout', '/password', '/oidc/callback', '/oidc/callback/'].includes(route.path)) {
        redirect('/login')
      }
    }
  }
}