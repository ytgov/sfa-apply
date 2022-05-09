<template>
  <section v-if="student">
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t('legends.income') }}</legend>
            
            <table class="standard" cellpadding="0" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Comments</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item, key in income">
                  <td >
                    <input type="text" v-model="income[key].type" placeholder="Type" />
                  </td>
                  <td >
                    <input type="text" v-model="income[key].amount" placeholder="0.00" />
                  </td>
                  <td>
                    <input type="text" v-model="income[key].comments" placeholder="Comments" />
                  </td>
                  <td>
                    <a @click="remove(key)">
                      Remove
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <p class="buttons">
              <v-btn class="blue small" @click="add()">Add income</v-btn>
            </p> 
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
  </section>
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
      return '/application/onboarding/parents'
    }
  },
  data() {
    return {
      income: []
    }
  },
  mounted() {
    this.income = this.student.CSFA_INCOME||[]

    
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligibility/SET', this.eligibility)
      this.$emit('input', this.valid)
    }
  },
  methods: {
    add() {
      this.income.push({
        type: '',
        amount: '',
        comments: ''
      })
    },
    remove(key) {
      if (key > -1) {
        this.income.splice(key, 1); // 2nd parameter means remove one item only
      }
    }
  }
}
</script>


<i18n>
{
  "en": {
    "legends": {
      "income": "CSFA Income" 
    },
    "buttons": {
      "save": "Save consent release"
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
      "income": "Libération du consentement" 
    },
    "buttons": {
       "save": "Enregistrer la libération du consentement"
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
