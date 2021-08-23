export const strict = false

export const state = () => ({
  list: [
    {
      date: '2020/21',
      name: {
        en: 'High School Transcript',
        fr: 'Relevé de notes du secondaire'
      },
      status: 'VERIFIED'
    },
    {
      date: '2020/21',
      name: {
        en: 'Letter of Acceptance',
        fr: 'Lettre d\'acceptation',
      },
      status: 'UPLOADING'
    },
    {
      date: '2020/21',
      name: {
        en: 'Spouse Income Tax (2018)',
        fr: 'Impôt sur le revenu du conjoint (2018)'
      },
      status: 'PENDING'
    },
    {
      date: '2020/21',
      name: {
        en: 'Student Income Tax (2018)',
        fr: 'Impôt sur le revenu des étudiants (2018)'
      },
      status: 'PENDING'
    }
  ]
})

export const getters = {
  list(state) {
    return state.list
  }
}

export const mutations = {
  POPULATE(state, documents) {
    state.list = documents
  }
}

export const actions = {

}
