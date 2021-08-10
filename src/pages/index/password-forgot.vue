<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h2>Forgot your password</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div v-if="!success"> 
          <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
            <v-form @submit.prevent="forgot_password" v-model="valid">
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
              <fieldset class="buttons">
                <v-btn color="primary" class="mr-5" type="submit" :disabled="!valid">
                   Retrieve Password &gt;&gt;
                </v-btn>
                &nbsp;&nbsp;
                <nuxt-link to="/login">Back to login</nuxt-link>
              </fieldset>
            </v-form>
          </ValidationObserver>
        </div>
        <p v-else>
          An email has been sent to {{email}}.  Check your email and try and <nuxt-link to="/login">login again</nuxt-link>.
        </p>
      </v-col>
      <v-col>
        <p>
           Please provide the email address that you used when you signed up for your account. We will send you an email that will allow you to reset your password.
        </p>
        <p>
          We will send your User ID and a new temporary password to the email address we have in our system. If your email address has changed since you last logged in, please contact our office by email at <a href="mailto:sfa@gov.yk.ca">sfa@gov.yk.ca</a> or by calling 867-667-5929.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n>
{
  "en": {

  },
  "fr": {
    
  }
}
</i18n>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  layout: 'inset',
  middleware: 'no-auth',
  head() {
    return {
      title: 'Yukon Student Financial Portal - Forgot Password',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ],
    }
  },
  layout: 'inset',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      valid: false,
      success: false,
      message: false,
      email: ''
    }
  },
  methods: {
    forgot_password () {
      /*
      this.message = false
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('users/forgot_password', {
            email: this.email
          }).then(
            response => {
              this.success = true
              this.message = { type: "success", text: 'Success.' }
            },
            error => {
              this.message = { type: "error", text: error}
            }
          )
        }
      })
      */
    }
  }
}
</script>


