<template>
  <section>
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit">
        <fieldset class="group">
  
          <fieldset>
            <legend class="text-h5">{{ $t('legends.spouse') }}</legend>
            <table class="form" cellpadding="0" cellspacing="0" width="100%">
  
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td>
                    <input type="text" v-model="spouse.first_name" placeholder="" />
                  </td>
                  <td>Last Name</td>
                  <td>
                    <input type="text"  v-model="spouse.last_name"  placeholder="" />
                  </td>
                </tr>
                <tr>
                  <td>Initial</td>
                  <td>
                    <input type="text" v-model="spouse.initial"  placeholder="" />
                  </td>
                  <td>SIN</td>
                  <td>
                    <input type="text" v-model="spouse.sin"  placeholder="" />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          <fieldset>
            <legend class="text-h5">{{ $t('legends.study-period') }}</legend>
            <table class="form" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td colspan="3">Study employment status</td>
                  <td>
                    <select v-model="spouse.employment_status">
                      <option value="" selected>--SELECT--</option>
                      <option>Employed</option>
                      <option>Employed</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <fieldset>
            <legend class="text-h5">{{ $t('legends.post-secondary') }}</legend>
            <table class="form" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td colspan="3">In school from</td>
                  <td>
                    <DateSelector v-model="spouse.post_secondary"  />
                  </td>
                </tr>
                <tr>
                  <td colspan="3">In school until</td>
                  <td>
                    <DateSelector v-model="spouse.employment_information" />
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                   
                    <label>
                       <input type="checkbox" v-model="spouse.employment_information" value="true" />
                      Applying for canada student loan.
                    </label>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <fieldset>
            <legend class="text-h5">{{ $t('legends.employment-information') }}</legend>
            <table class="form" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr class="checkbox">
                  <td colspan="3">Living with spouse</td>
                  <td>
                    <input type="checkbox" v-model="spouse.living_with" value="true" />
                  </td>
                </tr>
                <tr class="checkbox">
                  <td colspan="3">Bus Service Available?</td>
                  <td>
                    <input type="checkbox" v-model="spouse.bus_service" value="true" />
                  </td>
                </tr>
                <tr class="checkbox" v-if="!spouse.bus_service">
                  <td colspan="3">Distance form school/work (km)</td>
                  <td>
                    <input type="text" v-model="spouse.distance_from_school" placeholder="0" /> 
                  </td>
                </tr>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </fieldset> 

        <v-banner outlined icon="mdi-alert-circle" class="problem mt-4 error" v-if="invalid" style="padding-right: 1rem;">
          <h3>{{ $t('problem.title') }}</h3>
          <br />
          <ul>
            <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
          </ul>
        </v-banner>
      </v-form>
    </ValidationObserver>

    <Buttons :valid="valid" :next="next" back="true" />
  </section>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import AddressSelector from "~/components/forms/AddressSelector.vue";
import SinNumber from "~/components/forms/SinNumber.vue";
import TextField from "~/components/forms/TextField.vue";
import DateSelector from '~/components/forms/DateSelector.vue';

import BlackoutNotice from "~/components/utils/BlackoutNotice.vue";

import Buttons from '~/components/forms/Buttons.vue';
import Question from '~/components/forms/Question.vue';
import RadioList from '~/components/forms/RadioList.vue';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BlackoutNotice,
    TextField,
    DateSelector,
    AddressSelector,
    SinNumber,
    Buttons,
    Question,
    RadioList
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
      return this.localePath('/application/documents')
    }
  },
  data() {
    return {
      spouse: {

      }
    }
  },
  mounted() {
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
      "spouse": "Spouse",
      "study-period": "Study period",
      "post-secondary": "Post secondary information",
      "employment-information": "Employment information"
    }
  },
  "fr": {
    "legends": {
      "spouse": "Spouse",
      "study-period": "Study period",
      "post-secondary": "Post secondary information",
      "employment-information": "Employment information"
    }
  }
}
</i18n>

