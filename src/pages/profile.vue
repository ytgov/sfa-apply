<template>
  <v-container fluid>
    <h2 class="text-h4 mb-7">{{ $t('title') }}</h2>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>

    
    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <legend class="text-h5">{{ $t('legends.personal_details') }}</legend>

          <ValidationProvider name="firstName" rules="required|max:10" tag="span" v-slot="{ errors, valid }">
            <TextField
              name="firstName"
              v-model="profile.firstName"
              label="First name (required)"
              :errors="errors"
              :valid="valid"
            />
          </ValidationProvider>

          <ValidationProvider name="lastName" rules="required|max:10" tag="span"  v-slot="{ errors, valid }">
            <TextField
              name="lastName"
              v-model="profile.lastName"
              label="Last name (required)"
              :error="errors"
              :valid="valid"
            />
          </ValidationProvider>
   
          <ValidationProvider name="email" rules="required|email"  tag="span"  v-slot="{ errors, valid }">
            <TextField
              name="email"
              v-model="profile.email.value"
              label="Email (required)"
              :error="errors"
              :valid="valid"
            />
          </ValidationProvider>

          <ValidationProvider name="phone" rules="required|phone" tag="span" v-slot="{ errors, valid }">
            <TextField
              name="phone"
              v-model="profile.phone"
              label="Phone Number"
              :error="errors"
              :valid="valid"
            />
          </ValidationProvider>

          <ValidationProvider name="sin" rules="required|max:9|min:9"  tag="span" v-slot="{ errors, valid }" >
            <SinNumber :value="profile.sin" />
          </ValidationProvider>
       
          <ValidationProvider name="dob" rules="required" tag="span" v-slot="{ errors, valid }"  >
            <v-menu
              v-model="dobmenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"

            >
              <template v-slot:activator="{ on, attrs }">
                <TextField
                  v-model="profile.dob"
                  label="Date of Birth"
                  placeholder="YYYY-MM-DD"
                 
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  dense
                />
              </template>
              <v-date-picker
                v-model="profile.dob"
                @input="dobmenu = false"
                :error-messages="errors"
                :success="valid"
              ></v-date-picker>
            </v-menu>
            <span class="error">{{errors[0]}}</span>
          </ValidationProvider>
        </fieldset>
        <fieldset class="group">
          <legend class="text-h5">{{ $t('legends.address') }}</legend>
          <AddressSelector v-model="profile.address" :value="profile.address" />
        </fieldset>
    
        <fieldset>
          <v-btn color="primary" class="mr-5" type="submit" :disabled="!valid">
            {{ $t('buttons.save') }}
          </v-btn>
        </fieldset>
      </v-form>

      <v-banner outlined icon="mdi-alert-circle" class="problem mt-4" v-if="!valid">
        <h3>{{ $t('problem.title') }}</h3>
        <ul>
          <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
        </ul>
      </v-banner>
    </ValidationObserver>

  </v-container>
</template>

<i18n>
{
  "en": {
    "title": "Profile",
    "legends": {
      "personal_details": "Personal Details",
      "address": "Address"
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
    TextField,
    AddressSelector,
    SinNumber
  },
  computed: {
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        this.$store.commit('profile/SET')(values)
      }
    }
  },
  data() {
    return {
      valid: false,
      dobmenu: false
    };
  },
  mounted() {
    console.log(this.$validator)
  },
  methods: {
    submit() {
      alert('Valid Form')
      //this.$refs.observer.validate();
      //this.$store.dispatch('profile/SAVE')
    },
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
</style>


