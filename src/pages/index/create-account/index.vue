<template>
  <v-container fluid>
    <h1>{{ $t('title') }}</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.
    </p>


    <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
      <v-form @submit.prevent="submit" v-model="valid">
        <fieldset class="group">
          <legend>{{ $t('legends.account_details') }}</legend>

          <ValidationProvider name="email" rules="required|email"  tag="span"  v-slot="{ errors, valid }">
            <v-text-field
              v-model="email"
              label="Email (required)"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
          
          <ValidationProvider name="password" rules="required|password" tag="span" v-slot="{ errors, valid }">
            <v-text-field
              v-model="password"
              label="Password"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider name="password_confirm" rules="required|password" tag="span" v-slot="{ errors, valid }">
            <v-text-field
              v-model="password_confirm"
              label="Password Confirm"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
        </fieldset>
        <fieldset>
          <h4>Collection and Usage of Information</h4>
          <p>
            we are collecting this personal information... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam turpis ex, convallis fermentum odio non, iaculis interdum dui. In vel mauris nunc.
          </p>
          <p>
            <a>Read Full ATIPP Act</a>
          </p>
        </fieldset>
        <fieldset>
          <v-btn color="primary" class="mr-5" type="submit" :disabled="!valid">
            {{ $t('buttons.create_account') }}
          </v-btn>
           <v-btn color="secondary" class="mr-5" type="reset">
            {{ $t('buttons.cancel') }}
          </v-btn>
        </fieldset>
        <fieldset>
          <br />
          <br />
          <p>
            Already have an account? <nuxt-link to="/login">Login</nuxt-link>
          </p>
          <p>
            Need Help? <nuxt-link to="/contact">Contact Us</nuxt-link>
          </p>
        </fieldset>
      </v-form>

      <br />

      <v-banner outlined icon="mdi-alert-circle" class="problem mt-4" v-if="invalid && errors.length>0">
        <h3>{{ $t('problem.title') }}</h3>
        <ul>
          <li v-for="error in errors" v-if="error[0]">{{ error[0] }}</li>
        </ul>
      </v-banner>
    </ValidationObserver>

  </v-container>
</template>



<script>
import { mapMutations, mapGetters } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import AddressSelector from "~/components/forms/AddressSelector.vue";

export default {
  head: {
    title: 'Yukon Student Financial Portal - Create Account',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ],
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    AddressSelector
  },
  data() {
    return {
      valid: false,
      dobmenu: false,
      email: '',
      password: '',
      password_confirm: ''
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

<i18n>
{
  "en": {
    "title": "Create Account",
    "legends": {
      "account_details": "Account Details"
    },
    "buttons": {
      "create_account": "Create Account",
      "cancel": "Cancel"
    },
    "help": {
      "title": "Help Title",
      "details": "Help text can go in here to make the form more"
    },
    "problem": {
      "title": "There is a problem"
    }
  },
  "fr": {
    "title": "Create Account",
    "legends": {
      "account_details": "Account Details"
    },
    "buttons": {
      "create_account": "Create Account",
      "cancel": "Cancel"
    },
    "help": {
      "title": "Help Title",
      "details": "Help text can go in here to make the form more"
    },
    "problem": {
      "title": "There is a problem"
    }
  }
}
</i18n>
