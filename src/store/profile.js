export const strict = false

var defaultData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  sin: ''
}

export const state = () => ({
  profile: Object.assign({}, defaultData)
})

export const getters = {
  GET(state) {
    return state.profile
  }
}

export const mutations = {
  SET(state, profile) {
    state.profile = profile
  },
  CLEAR(state) {
    state.profile = Object.assign({}, defaultData)
  }
}

export const actions = {
  async fetch({ commit }) {
    await axios.get('').then(response => {
      commit("SET", response.data);
    }).catch(() => {
      commit("CLEAR");
    });
  },
}
