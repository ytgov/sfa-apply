export default function(context) {
  //console.log("Context", context)
  var { store, redirect, route, $auth } = context
  if (process.client) {

   
    if (!$auth.loggedIn) {
       console.log("MIDDLEWARE NOT LOGED IN", $auth.loggedIn)
      if (!['/login', '/login/', '/logout', '/password', '/oidc/callback', '/oidc/callback/'].includes(route.path)) {
        redirect('/login')
      }
    }
  }
}