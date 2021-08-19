<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <h2>{{ $t('introduction_title') }}</h2>
        <br />
        <p>
          {{ $t('introduction') }}
        </p>
        <br />
        <p>
          <a @click="login()">
              Login / Register
          </a>
        </p>
      </v-col>
      <v-col cols="12" sm="12" md="6">
       
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n>
{
  "en": {
    "introduction_title": "Hello",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec nibh sit amet diam dictum malesuada sit amet sed dui. Nam sit amet neque a purus condimentum dignissim. Nulla facilisi. Nunc feugiat a lorem ut ornare. Cras suscipit libero vitae ipsum viverra malesuada vitae eget purus. Mauris at cursus velit.",
    "new_user_intro": "Nunc feugiat a lorem ut ornare. Cras suscipit libero vitae ipsum viverra malesuada vitae eget purus. Mauris at cursus velit.",

    "title": "Login",
    "excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    "login": "Login",
    "signup": "Signup",
    "need_an_account": "Need an account?",
    "forgot_password": "Forgot your password?",
    "home": "Home", 
    "or_login_with": "Or, login with:"
  },
  "fr": {
    "introduction_title": "Bonjour",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec nibh sit amet diam dictum malesuada sit amet sed dui. Nam sit amet neque a purus condimentum dignissim. Nulla facilisi. Nunc feugiat a lorem ut ornare. Cras suscipit libero vitae ipsum viverra malesuada vitae eget purus. Mauris at cursus velit.",
    "new_user_intro": "Nunc feugiat a lorem ut ornare. Cras suscipit libero vitae ipsum viverra malesuada vitae eget purus. Mauris at cursus velit.",
    "title": "Login",
    "excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.",
    "login": "Login",
    "signup": "Signup",
    "need_an_account": "Need an account?",
    "forgot_password": "Forgot your password?",
    "home": "Home", 
    "or_login_with": "Or, login with:"
  }
}
</i18n>

<script>
  // https://demo.wpwebelite.com/woocommerce-social-login/my-account/
import { ValidationProvider, ValidationObserver } from 'vee-validate';
export default {
  layout: 'inset',
  middleware: 'no-auth',
  head (){
    return {
      title: 'Yukon Student Financial Portal - Login',
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
    ValidationObserver
  },
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      message: false,
      recaptchaVerifier: false,
      recaptchaWidgetId: false
    }
  },
  mounted() {
    const self = this;
    /*
    this.$store.dispatch('users/logout')
    window.localStorage.removeItem("albumboutique")
    this.$nextTick(() => {
      // Start Firebase invisible reCAPTCHA verifierthis.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      self.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //self.sendSMS();
        },
      });
      self.recaptchaVerifier.render().then((widgetId) => {
        self.recaptchaWidgetId = widgetId;
      });
    });
    */
  },
  methods: {
    login() {
      this.$auth.loginWith('auth0')
    }
  }
}
</script>