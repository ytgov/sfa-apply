export const strict = false

var defaultData = {
  profile: {

  },
  documents: {
    
  }
}

export const state = () => ({
  application: Object.assign({}, defaultData),
  list: []
})

export const getters = {
  GET(state) {
    return state.application
  },
  list(state) {
    return state.applications
  }
}

export const mutations = {
  SET(state, application) {
    state.application = application
  },
  CLEAR(state) {
    state.application = Object.assign({}, defaultData)
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
