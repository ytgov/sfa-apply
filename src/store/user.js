export const strict = false

const endpoints = process.env.endpoints

console.log('ENDPOINTS', endpoints)

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
