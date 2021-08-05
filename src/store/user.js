export const strict = false

const config = process.env.config

export const state = () => ({
  user: false,
  state: false,
  scope: 'openid'//'openid profile email phone address' // read:profile write:profile 
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
    return `${config.oauth.issuer}oauth/v2/authorize?client_id=${config.oauth.clientID}&redirect_uri=${encodeURI(config.oauth.callbackURL)}&response_type=code&state=${state.state}`
    // &scope=${encodeURI(state.scope)}
  }
}


export const actions = {
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
  async logout({ commit }) {
    alert(endpoints.LOGOUT_URL)
    await axios.get(endpoints.LOGOUT_URL).then((response) => {
      commit("CLEAR");
    }).catch(err => {
      console.error(err);
    });
  }
}
