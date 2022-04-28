<template>
  <v-container fluid v-if="student">
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t('legends.csfa-accomodation') }}</legend>

            <p>
              Enter your accomodations information:
            </p>
            <table class="form" cellpadding="0" cellspacing="0" width="100%">
  
              <tbody v-for="item, key in accomodations">
                <tr>
                  <td colspan="4">
                    <h3>{{accomodations[key].heading}}</h3>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" class="checkboxes">
                    <div>
                      <label><input type="radio" value="Living at Parents" v-model="accomodations[key].values.living"/> Living at Parents</label>
                      <label><input type="radio" value="Living on Own" v-model="accomodations[key].values.living"/> Living on Own</label>
                      <label><input type="radio" value="Both" v-model="accomodations[key].values.living"/> Both</label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>
                    <input type="text" placeholder="" />
                  </td>
                  <td>Province</td>
                  <td>
                    <input type="text"  placeholder="" />
                  </td>
                </tr>
                <tr v-if="['Living at Parents', 'Both'].includes(accomodations[key].values.living)">
                  <td colspan="3">Amount of Rent paid to parents</td>
                  <td>
                    <input type="text" v-model="accomodations[key].values.rent_to_parents" placeholder="0.00" />
                  </td>
                </tr>
                <tr v-if="['Living on Own', 'Both'].includes(accomodations[key].values.living)">
                  <td colspan="3">I own my own home</td>
                  <td>
                    <input type="checkbox" v-model="accomodations[key].values.own_home" value="true" />
                  </td>
                </tr>
                <tr>
                  <td colspan="3">Bus Service Available?</td>
                  <td>
                    <input type="checkbox" v-model="accomodations[key].values.bus_service" value="true" />
                  </td>
                </tr>
                <tr v-if="!accomodations[key].values.bus_service">
                  <td colspan="3">Distance form school/work (km)</td>
                  <td>
                    <input type="text" v-model="accomodations[key].values.rent_to_parents" placeholder="0" /> 
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </fieldset>

        <v-banner outlined icon="mdi-alert-circle" class="problem mt-4 error" v-if="invalid && errors.length" style="padding-right: 1rem;">
          <h3>{{ $t('problem.title') }}</h3>
          <br />
          <ul>
            <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
          </ul>
        </v-banner>
      </v-form>
    </ValidationObserver>

    <Buttons :valid="valid" :next="next" back="true" />
  </v-container>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import AddressSelector from "~/components/forms/AddressSelector.vue";
import SinNumber from "~/components/forms/SinNumber.vue";
import TextField from "~/components/forms/TextField.vue";
import RadioField from "~/components/forms/RadioField.vue";
import DateSelector from '~/components/forms/DateSelector.vue';
import SelectField from '~/components/forms/SelectField.vue';
import BlackoutNotice from "~/components/utils/BlackoutNotice.vue";

import Buttons from '~/components/forms/Buttons.vue';
import Question from '~/components/forms/Question.vue';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BlackoutNotice,
    TextField,
    RadioField,
    SelectField,
    DateSelector,
    AddressSelector,
    SinNumber,
    Buttons,
    Question
  },
  computed: {
    student: {
      get() {
        return this.$store.getters['student/GET']
      },
      set(values) {
        this.$store.commit('student/SET')(values)
      }
    },
    valid() {
      var is_valid = true
      return is_valid
    },
    next() {
      return '/application/onboarding/csfa-income'
    }
  },
  data() {
    return {
      accomodations: [],
      purposes: []
    }
  },
  mounted() {
    this.accomodations = this.student.ACCOMODATIONS||[
      {
        heading: 'Pre-study Accomodation',
        values: {
          living: '',
          comments: ''
        }
      },
      {
        heading: 'Study Accomodation',
        values: {
          living: '',
          comments: ''
        }
      }

    ]
    
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligibility/SET', this.eligibility)
      this.$emit('input', this.valid)
    }
  }
}
</script>




<i18n>
{
  "en": {
    "legends": {
      "csfa-accomodation": "CFSA Accomodation" 
    },
    "buttons": {
      "save": "Save statistical information"
    },
    "help": {
      "title": "Need help?",
      "details": "Help text can go in here to make the form more"
    },
    "problem": {
      "title": "There is a problem"
    }  
  },
  "fr": {
    "legends": {
      "csfa-accomodation": "Information statistique" 
    },
    "buttons": {
      "save": "Enregistrer les informations statistiques"
    },
    "help": {
      "title": "Need help?",
      "details": "Le texte d'aide peut aller ici pour rendre le formulaire plus"
    },
    "problem": {
      "title": "Il ya un problème"
    }
  }
}
</i18n>
