<template>
  <v-container fluid v-if="profile">
    <h2 class="text-h4 mb-7">{{ $t('title') }}</h2>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t('legends.personal_details') }}</legend>

            <ValidationProvider name="FIRST_NAME" rules="required|max:10" tag="span" v-slot="{ errors, valid }">
              <TextField
                name="FIRST_NAME"
                v-model="profile.FIRST_NAME"
                label="First name (required)"
                :errors="errors"
                :valid="valid"
              />
            </ValidationProvider>

            <ValidationProvider name="LAST_NAME" rules="required|max:10" tag="span"  v-slot="{ errors, valid }">
              <TextField
                name="LAST_NAME"
                v-model="profile.LAST_NAME"
                label="Last name (required)"
                :error="errors"
                :valid="valid"
              />
            </ValidationProvider>
     
            <ValidationProvider name="HOME_EMAIL" rules="required|email"  tag="span"  v-slot="{ errors, valid }">
              <TextField
                name="HOME_EMAIL"
                v-model="profile.HOME_EMAIL"
                label="Email (required)"
                :error="errors"
                :valid="valid"
              />
            </ValidationProvider>

            <ValidationProvider name="HOME_PHONE" rules="required|phone" tag="span" v-slot="{ errors, valid }">
              <TextField
                name="HOME_PHONE"
                v-model="profile.HOME_PHONE"
                label="Phone Number"
                :error="errors"
                :valid="valid"
              />
            </ValidationProvider>

            <ValidationProvider name="SIN" rules="sin"  tag="span" v-slot="{ errors, valid }" >
              <SinNumber 
                name="SIN"
                v-model="profile.SIN" 
                :value="profile.SIN" 
                :errors="errors" 
                :valid="valid" 
              />
            </ValidationProvider>
         
            <ValidationProvider name="BIRTH_DATE" rules="date" tag="span" v-slot="{ errors, valid }"  >
              <DateSelector 
                name="BIRTH_DATE"
                label="Birth Date"
                v-model="profile.BIRTH_DATE" 
                :value="profile.BIRTH_DATE" 
                :errors="errors" 
                :valid="valid" 
              />
            </ValidationProvider>
          </fieldset>
          <fieldset>
            <v-btn color="primary" class="mr-5" type="submit" :disabled="!valid">
              {{ $t('buttons.save') }}
            </v-btn>


          </fieldset>
        </fieldset>
        <fieldset class="group">
          <fieldset>
            <legend class="text-h5">{{ $t('legends.address') }}</legend>
            <AddressSelector v-model="profile.HOME_ADDRESS1" :value="profile.HOME_ADDRESS1" />
          </fieldset>
          <fieldset>
            <legend class="text-h5">{{ $t('legends.address_at_school') }}</legend>
            <AddressSelector v-model="profile.HOME_ADDRESS2" :value="profile.HOME_ADDRESS2" />
          </fieldset>
        </fieldset> 

        <v-banner outlined icon="mdi-alert-circle" class="problem mt-4" v-if="invalid">
          <h3>{{ $t('problem.title') }}</h3>
          <ul>
            <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
          </ul>
        </v-banner>
      </v-form>
    </ValidationObserver>
    <BlackoutNotice ref="blackout" />
  </v-container>
</template>

<i18n>
{
  "en": {
    "title": "Profile",
    "legends": {
      "personal_details": "Personal Details",
      "address": "Address",
      "address_at_school": "Address at School"
    },
    "buttons": {
      "save": "Save"
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
    "title": "Profil",
    "legends": {
      "personal_details": "Détails personnels",
      "address": "Adresse"
    },
    "buttons": {
      "save": "Sauver"
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

<script>
import { mapMutations, mapGetters } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import AddressSelector from "~/components/forms/AddressSelector.vue";
import SinNumber from "~/components/forms/SinNumber.vue";
import TextField from "~/components/forms/TextField.vue";
import DateSelector from '~/components/forms/DateSelector.vue';

import BlackoutNotice from "~/components/BlackoutNotice.vue";

export default {
  head (){
    return {
      title: 'Yukon Student Financial Portal - Profile',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ],
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    BlackoutNotice,
    TextField,
    DateSelector,
    AddressSelector,
    SinNumber,
  },
  computed: {
    profile: {
      get() {
        return this.$store.getters['student/GET']
      },
      set(values) {
        this.$store.commit('student/SET')(values)
      }
    }
  },
  /*
  async fetch({ store, app }) {
    //await console.log(app.$api)
    await store.dispatch('student/init', { app })
  },
  */
  data() {
    return {
      valid: false
    };
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        
        this.$refs.blackout.open({
          text: 'Saved',
          timeout: true
        })
        await this.$store.commit('student/SET', this.profile)
      } 
    }
  }
};
</script>

<style lang="scss" scoped>
div.container {
 

  form {
    padding: 3rem;
    display: grid;
    grid-template-columns: 6fr 6fr;
    grid-template-rows: auto;

    grid-gap: 1rem 3rem;
    > fieldset {
      &:nth-of-type(1) {
        grid-column: 1;
      }
      &:nth-of-type(2) {
        grid-column: 2;
        margin-top: 0;
      }
      &:nth-of-type(3) {
        grid-column: 1/3;
        grid-row: 2;
      }
      > fieldset {
        border: none;
      }
    }
  }



  @media only screen and (max-width: 768px) {
    padding: 0;
    form {
      padding: 1rem;
      grid-template-rows: auto auto auto;
      grid-gap: 1rem 2rem;
      > fieldset {
        grid-column:  1/3 !important;
        &:nth-of-type(1) {
          grid-row: 1 !important;
        }
        &:nth-of-type(2) {
          grid-row: 2 !important;
        }
        &:nth-of-type(3) {
          grid-row: 3 !important;
        }
      }
    }
  }
}


.v-input input {
  max-height: 30px !important;
}


input,
textarea,
select {
  &.error {
    border: solid 1px #cc0000;
    background-color: #FFcccc !important;
  }
}
</style>


