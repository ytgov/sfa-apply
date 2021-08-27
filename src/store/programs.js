export const strict = false

var program_validations = {
  yukon_excellence_award: (eligability) => {
    return (
        eligability.citizenship.is_canadian_citizen=='Yes' ||
        eligability.citizenship.are_you_a_perminent_resident=='Yes' 
      ) 
      && (
        eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
        && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      )
  },
  yukon_grant: (eligability) => {
    return (
        eligability.citizenship.is_canadian_citizen=='Yes' ||
        eligability.citizenship.are_you_a_perminent_resident=='Yes' 
      ) && (
        eligability.studies.time != 'Part-time'
      ) && (
        !['Upgrade', 'Certificate', 'Degree'].includes(eligability.program.what_type_of_program)
        && eligability.program.at_least_three_weeks == 'Yes'
      ) && (
        eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      ) && (
        eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
        && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      )
  },
  student_training_allowance: (eligability) => {
    return (
      eligability.citizenship.is_canadian_citizen=='Yes' ||
      eligability.citizenship.are_you_a_perminent_resident=='Yes' 
    ) && (
      eligability.studies.time != 'Part-time'
    ) && (
      eligability.residence.have_you_been_out_of_territory_12_months != 'Yes'
    ) && (
      eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes' &&
      ['Yukon College', 'Alcan Air'].includes(eligability.program.post_secondary_enrolled_in)
    ) && (
      eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
    )
  },
  army_yukon_scholorship: (eligability) => {
    return (
      eligability.scholorship.is_high_school_student != 'Yes'
      && !invalid_citizenship(eligability)
    )
  },
  nicolas_john_hararch_scoloarship: (eligability) => {
    return ( 
        eligability.scholorship.is_high_school_graduate == 'Yes'
        && eligability.scholorship.is_pursuing_aviation == 'Yes'    
      ) && (
        eligability.residence.have_you_been_out_of_territory_12_months != 'Yes'
      ) && !invalid_citizenship(eligability)
  },
  yukon_art_society_scolorship: (eligability) => {
    return (
        eligability.scholorship.is_high_school_graduate == 'Yes'
        && eligability.scholorship.are_you_entering_visual_arts == 'Yes' 
        && !invalid_citizenship(eligability)
      ) 
  },
  huskies_cb_radio_club_scolarship: (eligability) => {
    return (
        eligability.scholorship.is_high_school_graduate == 'Yes' 
        && eligability.scholorship.enrolled_vocational == 'Yes' 
        && !invalid_citizenship(eligability)
      ) 
      
  },
  canada_student_loan_parttime_eligability: (eligability) => {
    return (
      eligability.studies.time == 'Part-time'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligability)
    ) 
  },
  canada_student_grant_parttime_eligability: (eligability) => {
    return (
      eligability.studies.time == 'Part-time'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligability)
    )
  },
  canada_student_loan_parttime_students_with_dependants: (eligability) => {
    return (
      eligability.studies.time == 'Part-time'
      && eligability.program.at_least_three_weeks == 'Yes'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligability)
    )
  },
  canada_student_grant_parttime_students_with_disabilities: (eligability) => {
    return (
      eligability.studies.time == 'Part-time'
      && eligability.program.at_least_three_weeks == 'Yes'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && eligability.disabilities.perminent_disability == 'Yes'
      && !invalid_citizenship(eligability)
      
    )
  },
  canada_student_grant_parttime_services_and_equipment_for_students_with_disabilities: (eligability) => {
    return (
      eligability.studies.time == 'Part-time'
      && eligability.program.at_least_three_weeks == 'Yes'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && eligability.disabilities.perminent_disability == 'Yes'
      && eligability.disabilities.service_equipment == 'Yes'
      && !invalid_citizenship(eligability) 
    )
  },
  canada_student_loan_fulltime_eligability: (eligability) => {
    return (
      eligability.studies.time == 'Full-time'
      && eligability.program.at_least_three_weeks == 'Yes'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligability)
    )
  },
  canada_student_grant_fulltime_eligability: (eligability) => {
    return (
      eligability.studies.time == 'Full-time'
      && eligability.program.at_least_three_weeks == 'Yes'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligability)
    )
  },
  canada_student_loan_fulltime_students_with_dependants: (eligability) => {
    return (
      eligability.studies.time == 'Full-time'
      && eligability.program.at_least_three_weeks == 'Yes'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligability)
    )
  },
  canada_student_grant_fulltime_students_with_disabilities: (eligability) => {
    return (
      eligability.studies.time == 'Full-time'
      && eligability.program.at_least_three_weeks == 'Yes'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && eligability.disabilities.perminent_disability == 'Yes'
      && !invalid_citizenship(eligability)
    )
  },
  canada_student_grant_fulltime_services_and_equipment_for_students_with_disabilities: (eligability) => {
    return (
      eligability.studies.time == 'Full-time'
      && eligability.program.at_least_three_weeks == 'Yes'
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && eligability.disabilities.perminent_disability == 'Yes'
      && eligability.disabilities.service_equipment == 'Yes'
      && !invalid_citizenship(eligability) 
    )
  },
  canada_student_loans_and_grants_skills_boost_top_up: (eligability) => {
    return (
      eligability.studies.time == 'Full-time'
      && !['Masters', 'Doctorate', 'None of These'].includes(eligability.program.what_type_of_program)
      && eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes'
      && eligability.dependant_student_juristiction.has_family_maintained_home == 'Yes'
      && eligability.singleparentjuristiction.most_recently_in_yukon == 'Yes'
      && !invalid_citizenship(eligability)
    )
  }
}



var invalid_citizenship = (eligability) => {
  return (
    eligability.citizenship.is_canadian_citizen=='No' &&
    eligability.citizenship.are_you_a_perminent_resident=='No' &&
    eligability.citizenship.are_you_a_protected_person=='No' &&
    eligability.citizenship.are_you_registered_as_indigenous=='No'
  ) 
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
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Part-time Services and Equipment for Students with Disabilities',
        fr: 'Canada Student Grant - Part-time Services and Equipment for Students with Disabilities'
      },
      qualified: 'canada_student_grant_parttime_services_and_equipment_for_students_with_disabilities'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'loan',
      name: {
        en: 'Canada Student Loan - Full-time Eligability',
        fr: 'Canada Student Loan - Full-time Eligability'
      },
      qualified: 'canada_student_loan_fulltime_eligability'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Full-time Eligability',
        fr: 'Canada Student Grant - Full-time Eligability'
      },
      qualified: 'canada_student_grant_fulltime_eligability'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'loan',
      name: {
        en: 'Canada Student Loan - Full-time Students with Dependants',
        fr: 'Canada Student Loan - Full-time Students with Dependants'
      },
      qualified: 'canada_student_loan_fulltime_students_with_dependants'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Full-time Students with Disabilities',
        fr: 'Canada Student Grant - Full-time Students with Disabilities'
      },
      qualified: 'canada_student_grant_fulltime_students_with_disabilities'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'grant',
      name: {
        en: 'Canada Student Grant - Full-time Services and Equipment for Students with Disabilities',
        fr: 'Canada Student Grant - Full-time Services and Equipment for Students with Disabilities'
      },
      qualified: 'canada_student_grant_fulltime_services_and_equipment_for_students_with_disabilities'
    },
    {
      group: 'Canada Student Loan Programs',
      type: 'grant',
      name: {
        en: 'Canada Student Loans and Grants - Skills Boost Top Up',
        fr: 'Canada Student Loans and Grants - Skills Boost Top Up'
      },
      qualified: 'canada_student_loans_and_grants_skills_boost_top_up'
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



