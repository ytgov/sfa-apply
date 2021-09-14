export const strict = false

export const state = () => ({
  menu_open: false,
  token: false
})


export const getters = {
  menu_open(state) {
    return state.menu_open
  },
  token(state) {
    return state.token
  }
}

export const mutations = {
  TOGGLE_MENU(state) {
    state.menu_open = !state.menu_open
  },
  TOGGLE_MENU_OFF(state) {
    state.menu_open = false
  },
  SET_TOKEN(state, token) {
    state.token = token
  }
}


export const actions = {
  nuxtServerInit ({ commit, dispatch }, {app, req, redirect}) {
    //console.log("RUNNING GLOBAL SERVER INIT.")
  },
  nuxtClientInit ({ commit, dispatch }, {app, req, redirect, route}) {
    console.log("RUNNING GLOBAL CLIENT INIT.");
    commit('user/SET_STATE')
    
    /*
    return getUserStatus({ commit, dispatch }).then(async () => {
      //await dispatch('user/init')
    }).catch(() => {
      redirect('/login')
    })
    */ 
  }
}
