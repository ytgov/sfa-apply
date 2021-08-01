export const strict = false

export const state = () => ({
  list: [
  	{
  		text: 'You have started an application that has not been submitted.',
  		link: {
  			text: 'Continue to application',
  			url: '/application'
  		}
  	}
  ]
})

export const getters = {
  list(state) {
    return state.list
  }
}

export const mutations = {
  SET(state, alert) {
    state.list.push(alert)
  }
}

export const actions = {

}



