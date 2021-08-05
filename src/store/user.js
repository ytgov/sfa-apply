export const strict = false

const endpoints = process.env.endpoints
const config = process.env.config

export const state = () => ({
  user: false
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
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
    var state = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);

    return `${config.oauth.issuer}oauth/v2/authorize?client_id=${config.oauth.clientID}&redirect_uri=${encodeURI(config.oauth.callbackURL)}&response_type=code&scope=openid&state=${state}`
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
