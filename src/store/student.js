//import API from '~/plugins/api.js';

export const strict = false

var defaultProfile = {
  "STUDENT_ID":1,
  "FIRST_NAME":"Ottilie",
  "LAST_NAME":"Mohr",
  "INITIALS":"D.",
  "VENDOR_ID":"CDAASMANNATH",
  "YUKON_ID":"699750702",
  "SIN":772586349,
  "NATIONAL_ID":null,
  "CSL_LETTER_DATE":null,
  "CSL_WARN_CODE":null,
  "LANGUAGE_ID":1,
  "BIRTH_DATE":"1981-07-04T00:00:00.000Z",
  "HOME_ADDRESS1":"7241 Antonette Isle North Mittiestad, DC, 51204",
  "HOME_ADDRESS2":null,
  "BIRTH_CITY_ID":1,
  "BIRTH_COUNTRY_ID":1,
  "HOME_CITY_ID":1,
  "BIRTH_PROVINCE_ID":3,
  "HOME_PROVINCE_ID":3,
  "HOME_COUNTRY_ID":1,
  "HOME_PHONE":"1-279-210-0288 x492",
  "HOME_POSTAL_CODE":"Y1A 5T8",
  "HOME_EMAIL":"okuneva.skylar@hotmail.com",
  "LOCATOR_NUMBER":"20071150",
  "MAILING_ADDRESS1":null,
  "MAILING_ADDRESS2":null,
  "MAILING_CITY_ID":null,
  "MAILING_PROVINCE_ID":null,
  "MAILING_COUNTRY_ID":1,
  "MAILING_POSTAL_CODE":null,
  "PRE_FUNDED_YEAR":2001,
  "PRE_FUNDING_YEARS_USED":2,
  "SCHOOL_EMAIL":null,
  "SCHOOL_PHONE":null,
  "CREATED_BY":"SFAADMIN",
  "CREATED_DATE":"2002-07-29T16:54:45.000Z",
  "UPDATED_BY":"SFAADMIN",
  "UPDATED_DATE":"2017-04-06T11:32:29.000Z",
  "HIGH_SCHOOL_FINAL_GRADE":"12",
  "PARENT_MAILING_ADDRESS1":"54 Fireweed Drive",
  "PARENT_MAILING_ADDRESS2":null,
  "PARENT_MAILING_CITY_ID":1,
  "PARENT_MAILING_PROVINCE_ID":3,
  "PARENT_MAILING_COUNTRY_ID":1,
  "PARENT_MAILING_POSTAL_CODE":"Y1A 5T8",
  "PARENT_TELEPHONE":"667-4663",
  "PRE_OVER_AWARD":0,
  "PRE_YEA_AWARDS_USED":0,
  "EDUCATION_LEVEL_ID":5,
  "HIGH_SCHOOL_ID":4,
  "HIGH_SCHOOL_LEFT_YEAR":1999,
  "HIGH_SCHOOL_LEFT_MONTH":6,
  "SEX":1,
  "SPOUSE_HS_END_MONTH":null,
  "SPOUSE_HS_END_YEAR":null,
  "USER_NAME":null,
  "USER_PASSWORD":null,
  "IS_ACTIVE_FLG":null,
  "IS_FIRST_LOGON_FLG":null,
  "LAST_PW_CHG_DATE":null,
  "LAST_LOGON_DATE":null,
  "PREVIOUS_LAST_NAME":null,
  "YEA_EXPIRY_DATE":"2009-06-30T00:00:00.000Z",
  "ADJ_YG_FUNDING_WEEKS":null,
  "ADJ_STA_UPGRADING_WEEKS":null,
  "ADJ_OUTSIDE_TRAVEL_CNT":null,
  "CHECKED_FOR_YTID_FLG":"No",
  "INDIGENOUS_LEARNER":null,
  "CROWN_WARD_FLG":null
}

export const state = () => ({
  list: [],
  profile: Object.assign({}, defaultProfile)
})

export const getters = {
  list(state) {
    return state.list
  }, 
  GET(state) {
    return state.profile
  }
}

export const mutations = {
  POPULATE(state, values) {
    state.list = values
  },
  SET(state, profile) {
    state.profile = profile
  },
  CLEAR(state) {
    state.profile = Object.assign({}, defaultProfile)
  }
}

export const actions = {
  async init({ commit }, { app }) {
    await app.$api.get('/Students/1').then(response => {
      if (response.data.length) {
        console.log("Response", response)
        commit('SET', response.data) 
      }
    }).catch((error) => {
      console.error(error)
      commit('CLEAR') 
    });
  }
}


