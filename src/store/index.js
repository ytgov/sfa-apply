export const strict = false

export const state = () => ({
  menu_open: false
})


export const getters = {
  menu_open(state) {
    return state.menu_open
  }
}

export const mutations = {
  TOGGLE_MENU(state) {
    state.menu_open = !state.menu_open
  }
}


export const actions = {
  nuxtServerInit ({ commit, dispatch }, {app, req, redirect}) {
    //console.log("RUNNING GLOBAL SERVER INIT.")
  },
  nuxtClientInit ({ commit, dispatch }, {app, req, redirect, route}) {
    console.log("RUNNING GLOBAL CLIENT INIT.");
    /*
    return getUserStatus({ commit, dispatch }).then(async () => {
      //await dispatch('user/init')
    }).catch(() => {
      redirect('/login')
    })
    */ 
  }
}
