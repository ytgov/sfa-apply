export default function({ store, redirect, route, $auth }) {
  if (process.client) {


   console.log("Auth", $auth)
    //var is_authenticated = store.dispatch['users/validate'];

    if ($auth.loggedIn) {
      /*
       store.dispatch['profile/GET'].then((profile)=>{
          store.commit('profile/SET', profile)
       })
       */
    } else {
      //redirect('/login')
    }
  }
}