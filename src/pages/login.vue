<template>
  <article data-layout="inset">
    <section>
      <h2>Login</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare. Cras suscipit libero vitae ipsum viverra malesuada vitae eget purus. Mauris at cursus velit.
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
            <ValidationProvider name="Password" rules="required|password" tag="span" v-slot="{ errors, valid }">
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
              Login
            </v-btn>
          </fieldset>
          <fieldset class="options">
            <span> Need an account? <nuxt-link to="/signup" v-if="false">Signup</nuxt-link> </span><br />
            <span> <nuxt-link to="/password-forgot">Forgot&nbsp;your&nbsp;password?</nuxt-link> | <nuxt-link to="/">Home</nuxt-link> </span>
          </fieldset>
          <fieldset>
            <br /><br />
            <h4>Or, login with:</h4>
          </fieldset>
          <section class="social">
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
    </section>
  </article>
</template>
<script>
  // https://demo.wpwebelite.com/woocommerce-social-login/my-account/
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  layout: 'inset',
  middleware: 'no-auth',
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
      /*
      this.$nuxt.$loading.start()
      this.message = false
      
      this.$store.dispatch('users/signInWithEmail', {
        email: this.email,
        password: this.password
      }).then(
        response => {
          this.message = { type: "success", text: 'Logging In' }
          this.$router.push('/manage/dashboard');
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
          this.$router.push('/manage/dashboard');
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