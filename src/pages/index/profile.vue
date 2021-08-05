<template>
  <v-container fluid>
    <h1>{{ $t('title') }}</h1>

    <v-banner icon="mdi-cash-register">
      <h2>{{ $t('help.title') }}</h2>
      <p>
        {{ $t('help.details') }}
      </p>
      
    </v-banner>

    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <legend>{{ $t('legends.personal_details') }}</legend>

          <ValidationProvider name="firstName" rules="required|max:10" tag="span" v-slot="{ errors, valid }">
            <v-text-field
              v-model="profile.firstName"
              label="First name (required)"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider name="lastName" rules="required|max:10" tag="span"  v-slot="{ errors, valid }">
            <v-text-field
              v-model="profile.lastName"
              label="Last name (required)"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
   
          <ValidationProvider name="email" rules="required|email"  tag="span"  v-slot="{ errors, valid }">
            <v-text-field
              v-model="profile.email"
              label="Email (required)"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider name="phone" rules="required|phone" tag="span" v-slot="{ errors, valid }">
            <v-text-field
              v-model="profile.phone"
              label="Phone Number"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider name="sin" rules="required|max:9|min:9"  tag="span" v-slot="{ errors, valid }" >
            <v-text-field
              v-model="profile.sin"
              label="Sin Number"
              :error-messages="errors"
              :success="valid"
              maxlength="9"
            />
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
                <v-text-field
                  v-model="profile.dob"
                  label="Date of Birth"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
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
          <legend>{{ $t('legends.address') }}</legend>
          <AddressSelector v-model="profile.address" :value="profile.address" />
        </fieldset>
    
        <fieldset>
          <v-btn color="primary" class="mr-5" type="submit" :disabled="!valid">
            {{ $t('buttons.save') }}
          </v-btn>
        </fieldset>
      </v-form>

      <v-banner outlined icon="mdi-alert-circle" class="problem mt-4" v-if="invalid">
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
      "title": "title",
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
      "title": "Titre",
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

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    AddressSelector
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
