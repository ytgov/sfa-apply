export const strict = false

export const state = () => ({
  profile: {
    firstName: '',
    lastName: '',
    tombstone: {
      has_existing_alias: false
    },
    email: {
      use_existing: false,
      value: false,
      new: false
    },
    address: {
      perminent: false,
      at_school: false
    },
    phone: '',
    dob: '',
    sin: '',
    atipp: {
      read_terms: false
    }
  }
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
    await api.get('/Students/1').then(response => {
      commit("SET", response.data);
    }).catch(() => {
      commit("CLEAR");
    });
  },
}
