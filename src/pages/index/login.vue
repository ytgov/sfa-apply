<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h2>{{ $t('introduction_title') }}</h2>
        <br />
        <p>
          {{ $t('introduction') }}
        </p>
        <br />
        <h4>
          New User 
        </h4>
        <p>
          <nuxt-link to="/create-account">
            <v-btn color="primary" class="mr-5">
              Create an Account
            </v-btn>
          </nuxt-link>
        </p>
      </v-col>
      <v-col>
        <h2>{{ $t('title') }}</h2>
        <br />
        <p>
          {{ $t('excerpt') }}
        </p>
        <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
          <v-form @submit.prevent="login" v-model="valid">
            <fieldset>
              <ValidationProvider name="Email" rules="required|email" tag="span" v-slot="{ errors, valid }">
                <v-text-field
                  v-model="email"
                  label="Email / Username"
                  :error-messages="errors"
                  :success="valid"
                />
              </ValidationProvider>
            </fieldset>
            <fieldset>
              <ValidationProvider name="Password" rules="required" tag="span" v-slot="{ errors, valid }">
                <v-text-field
                  type="password"
                  v-model="password"
                  label="Password"
                  :error-messages="errors"
                  :success="valid"
                />
              </ValidationProvider>
            </fieldset>
            <fieldset class="buttons">
              <v-btn color="primary" class="mr-5" type="submit" :disabled="!valid">
                {{$t('login')}}
              </v-btn>
            </fieldset>
            <fieldset class="options">
              <span> <nuxt-link to="/password-forgot">{{$t('forgot_password')}}</nuxt-link></span>
            </fieldset>
            <fieldset v-if="false">
              <br /><br />
              <h4>{{$t('or_login_with')}}</h4>
            </fieldset>
            <section class="social" v-if="false">
              <a @click="providerSignUp('Google')">
                <img src="~/static/images/socialsignin/login.google_button.png" />
              </a>
              <a @click="providerSignUp('Facebook')">
                <img src="~/static/images/socialsignin/login.facebook_button.png" />
              </a>
              <a @click="providerSignUp('Twitter')"  v-if="false">
                <img src="~/static/images/socialsignin/login.twitter_button.png" />
              </a>
            </section>
          </v-form>
        </ValidationObserver>
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n>
{
  "en": {
    "introduction_title": "Good Afternoon",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec nibh sit amet diam dictum malesuada sit amet sed dui. Nam sit amet neque a purus condimentum dignissim. Nulla facilisi. Nunc feugiat a lorem ut ornare. Cras suscipit libero vitae ipsum viverra malesuada vitae eget purus. Mauris at cursus velit.",

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
    "introduction_title": "Good Afternoon",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec nibh sit amet diam dictum malesuada sit amet sed dui. Nam sit amet neque a purus condimentum dignissim. Nulla facilisi. Nunc feugiat a lorem ut ornare. Cras suscipit libero vitae ipsum viverra malesuada vitae eget purus. Mauris at cursus velit.",

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
  head: {
    title: 'Yukon Student Financial Portal - Login',
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
    login () {
      this.$store.commit('authenticated', true)
      /*
      this.$nuxt.$loading.start()
      this.message = false
      
      this.$store.dispatch('users/signInWithEmail', {
        email: this.email,
        password: this.password
      }).then(
        response => {
          this.message = { type: "success", text: 'Logging In' }
          this.$router.push('/');
          this.$nuxt.$loading.finish()
        },
        error => {
          this.password = ''
          this.message = { type: "error", text: error }
          this.$nuxt.$loading.finish()
        }
      )
      */
    },
    providerSignUp(provider) {
      /*
      this.$nuxt.$loading.start()
      this.message = false
      
      this.$store.dispatch('users/signInWithProvider', { provider }).then(
        response => {
          this.message = { type: "success", text: 'Logging In' }
          this.$router.push('/');
          this.$nuxt.$loading.finish()
        },
        error => {
          this.password = ''
          this.message = { type: "error", text: error }
          this.$nuxt.$loading.finish()
        }
      )
      */
    }
  }
}
</script>

