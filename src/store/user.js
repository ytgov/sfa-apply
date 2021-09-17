import { firebase } from '@/services/firebase.js'


export const strict = false

const config = process.env.config

export const state = () => ({
  user: false,
  token: false,
  state: false,
  scope: 'openid profile email phone address'//'openid profile email phone address' // read:profile write:profile 
  // openid profile email phone address
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_STATE(state) {
    if (!state.state) {
      state.state = Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '').substr(0, 8)
    }
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  CLEAR(state) {
    state.user = false
  }
}

export const getters = {
  is_authenticated(state) {
    return !!state.user
  },
  user(state) {
    return state.user
  },
  login_url(state) {

    //return `${config.oauth.endpoint}/authorize?client_id=${config.oauth.clientID}&redirect_uri=${encodeURI(config.oauth.callbackURL)}&response_type=code&state=${state.state}`
    // &scope=${encodeURI(state.scope)}
  }
}


export const actions = {
  token({ dispatch, commit, state, rootGetters }, { code }) {
    var OauthUserToken = firebase.functions().httpsCallable('auth-token');
    return new Promise((resolve, reject) => {
      OauthUserToken({ code, state: state.state }).then((response) => {
        commit('SET_TOKEN', response.data.token)
        resolve(response.data)
      }).catch((error) => {
        console.log("User Token Error", error)
        reject(error)
      })
    })
  },
  /*
  async login({ commit }) {
    await axios.get(endpoints.LOGIN_URL).then(response => {
      commit("SET_USER", response.data);
    }).catch(() => {
      commit("CLEAR");
    });
  },
  async validate({ commit }) {
    await axios.get(endpoints.AUTH_CHECK_URL).then(response => {
      commit("SET_USER", response.data);
    }).catch(() => {
      commit("CLEAR");
    });
  },
  */
  async logout({ commit }) {
    return new Promise((resolve, reject) => {
      var user = firebase.auth().user
      if (user) {
        /*
        profiles.doc(user.uid).set({ 
          last_online: firebase.firestore.FieldValue.serverTimestamp(),
          online: false
        }, { merge: true })
        */
      } 
      resolve()
    })
    /*
    alert(endpoints.LOGOUT_URL)
    await axios.get(endpoints.LOGOUT_URL).then((response) => {
      commit("CLEAR");
    }).catch(err => {
      console.error(err);
    });
    */
  }
}
