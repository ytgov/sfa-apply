export const strict = false

var program_validations = {
  yukon_excellence_award: (eligability) => {
    return true
  },
  yukon_grant: (eligability) => {
    return true
  },
  student_training_allowance: (eligability) => {
    return true
  },
  army_yukon_scholorship: (eligability) => {
    return eligability.scholorship.is_high_school_student == 'Yes'
  },
  nicolas_john_hararch_scoloarship: (eligability) => {
    return ( eligability.scholorship.is_high_school_student == 'Yes' 
          && eligability.scholorship.is_high_school_graduate == 'Yes'
        ) && eligability.scholorship.is_pursuing_aviation == 'Yes'
  },
  yukon_art_society_scolorship: (eligability) => {
    return eligability.scholorship.is_high_school_student == 'Yes' && 
          eligability.scholorship.is_high_school_graduate == 'Yes' 
  },
  huskies_cb_radio_club_scolarship: (eligability) => {
    return eligability.scholorship.is_high_school_student == 'Yes' && 
          eligability.scholorship.is_high_school_graduate == 'Yes' 
  },
  canada_student_loan_parttime_eligability: (eligability) => {
    return eligability.studies.time == 'Part-time'
  },
  canada_student_grant_parttime_eligability: (eligability) => {
    return eligability.studies.time == 'Part-time'
  },
  canada_student_loan_parttime_students_with_dependants: (eligability) => {
    return eligability.studies.time == 'Part-time'
  },
  canada_student_grant_parttime_students_with_disabilities: (eligability) => {
    return eligability.studies.time == 'Part-time'
  },
}

export const state = () => ({
  list: [
     {
      group: 'Yukon Territory Programs',
      type: 'scholarship',
      name: {
        en: 'Yukon Excellence Award',
        fr: 'Yukon Excellence Award'
      },
      qualified: "yukon_excellence_award"
    },
    {
      group: 'Yukon Territory Programs',
      type: 'scholarship',
      name: {
        en: 'Yukon Grant',
        fr: 'Yukon Grant'
      },
      qualified: "yukon_grant"
    },
    {
      group: 'Yukon Territory Programs',
      type: 'scholarship',
      name: {
        en: 'Student Training Allowance',
        fr: 'Student Training Allowance'
      },
      qualified: "student_training_allowance"
    },
    {
      group: 'Scholarships',
      type: 'scholarship',
      name: {
        en: 'Army Yukon Scolorship',
        fr: 'Army Yukon Scolorship'
      },
      qualified: "army_yukon_scholorship"
    },
    {
      group: 'Scholarships',
      type: 'scholarship',
      name: {
        en: 'Nicolas John Hararch Scoloarship',
        fr: 'Nicolas John Hararch Scoloarship'
      },
      qualified: "nicolas_john_hararch_scoloarship"
    },
    {
      group: 'Scholarships',
      type: 'scholarship',
      name: {
        en: 'Yukon Art Society Scolorship',
        fr: 'Yukon Art Society Scolorship'
      },
      qualified: "yukon_art_society_scolorship"
    },
    {
      group: 'Scholarships',
      type: 'scholarship',
      name: {
        en: 'Huskies CB Radio Club Scolarship',
        fr: 'Huskies CB Radio Club Scolarship'
      },
      qualified: 'huskies_cb_radio_club_scolarship'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'loan',
      name: {
        en: 'Canada Student Loan - Part-time Eligability',
        fr: 'Canada Student Loan - Part-time Eligability'
      },
      qualified: 'canada_student_loan_parttime_eligability'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Part-time Eligability',
        fr: 'Canada Student Grant - Part-time Eligability'
      },
      qualified: 'canada_student_grant_parttime_eligability'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'loan',
      name: {
        en: 'Canada Student Loan - Part-time Students with Dependants',
        fr: 'Canada Student Loan - Part-time Students with Dependants'
      },
      qualified: 'canada_student_loan_parttime_students_with_dependants'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Part-time Students with Disabilities',
        fr: 'Canada Student Grant - Part-time Students with Disabilities'
      },
      qualified: 'canada_student_grant_parttime_students_with_disabilities'
    }
  
  ]
})

export const getters = {
  list(state) {
    return state.list
  },
  validation: (state) => (slug, eligability) => {
    return program_validations[slug](eligability)
  },
  eligable: (state, getters, rootGetters) => (eligability) => {
    return _.filter(state.list, (o) =>  {
      try { 
        return getters['validation'](o.qualified, eligability) == true
      } catch(error) {
        console.error(error)
        return false
      }
    });
  },
  ineligable: (state, getters, rootGetters) => (eligability) => {
    return _.filter(state.list, (o) =>  {
      try { 
        return getters['validation'](o.qualified, eligability) == false
      } catch(error) {
        console.error(error)
        return false
      }
    });
  },
  count(state) {
    return state.list.length
  }
}

export const mutations = {

}

export const actions = {

}



