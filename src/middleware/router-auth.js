export default function({ store, redirect, route }) {
  if (process.client) {
    var is_authenticated = store.dispatch['users/validate'];

    if (is_authenticated) {
       store.dispatch['profile/GET'].then((profile)=>{
          store.commit('profile/SET', profile)
       })
    } else {
       //redirect('/login')
    }
  }
}