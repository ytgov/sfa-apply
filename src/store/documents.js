export const strict = false

export const state = () => ({
  list: []
})

export const getters = {
  list(state) {
    return state.applications
  }
}

export const mutations = {
  POPULATE(state, documents) {
    state.documents = documents
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
