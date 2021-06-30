export const strict = false

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
  async validate({ commit }) {
    await axios.get(AUTH_CHECK_URL).then(response => {
      commit("SET_USER", response.data);
    }).catch(() => {
      commit("CLEAR");
    });
  },
  async logout({ commit }) {
    await axios.get(LOGOUT_URL).then(() => {
      commit("CLEAR");
    }).catch(err => {
      console.error(err);
    });
  }
}
