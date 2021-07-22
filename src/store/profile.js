export const strict = false

var defaultData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  sin: '',
  citizenship: {
    is_canadian_citizen: false,
    are_you_a_perminent_resident: false,
    are_you_a_protected_person: false,
    are_you_registered_as_indian: false
  },
  scolorship: {
    is_high_school_student: false,
    is_high_school_graduate: false,
    is_pursuing_aviation: false
  }
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
