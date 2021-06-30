<template>
   <article data-layout="inset">
    <section style="max-width: 450px;">
      <h2>Reset your password</h2>
      <p>
        One more step. Set a password for your account.
      </p>
    
      <ValidationObserver ref="observer" v-slot="{ invalid, errors }" >
        <v-form @submit.prevent="reset_password" v-model="valid">
          <fieldset>
            <ValidationProvider name="Old Password" rules="required|password" tag="span" v-slot="{ errors, valid }">
              <v-text-field
                type="password"
                v-model="oldpassword"
                label="Old Password"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>
          </fieldset>
          <fieldset>
            <ValidationProvider name="New Password" rules="required|password" tag="span" v-slot="{ errors, valid }">
              <v-text-field
                type="password"
                v-model="password"
                label="New Password"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>
          </fieldset>
          <fieldset>
            <ValidationProvider name="New Password Confirmation" rules="required|password" tag="span" v-slot="{ errors, valid }">
              <v-text-field
                type="password"
                v-model="confirmation"
                label="New Password Confirmation"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>
          </fieldset>
          <fieldset class="buttons">
            <v-btn color="primary" class="mr-5" type="submit" :disabled="!valid">
               Reset Password 
            </v-btn>
            <a @click="$router.go(-1)">
              Back
            </a>
          </fieldset>
        </v-form>
      </ValidationObserver>

    </section>
  </article>
</template>

<script>
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
      message: false,
      oldpassword: null,
      password: null,
      confirmation: null
    }
  },
  methods: {
    reset_password() {
      /*
      this.$nuxt.$loading.start()
      this.message = false
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('users/reset_password', {
            oldpassword: this.oldpassword,
            password: this.password,
            confirmation: this.confirmation
          }).then(
            response => {
              this.message = { type: 'success', text: 'Success! User verified.' }
              this.$router.push('/manage/dashboard')
              this.$nuxt.$loading.finish()
            },
            error => {
              this.message = { type: 'error', text: error }
            }
          )
        }
      })
      */
    }
  }
}
</script>