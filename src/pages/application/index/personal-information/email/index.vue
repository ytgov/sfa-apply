<template>
  <article>
    <h2>{{ $t('title') }}</h2>


    <section v-if="profile.email.value && !profile.email.use_existing">
      <div class="email">
        {{profile.email.value||'No email address on file.'}}
      </div>
    </section>

    <section v-if="profile.email.value && !profile.email.use_existing">
      <Question>
        {{ $t('would_you_like_to_use_existing_address') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.email.use_existing" 
        :value="profile.email.use_existing" 
      />
    </section>

    <section v-else>
      <Question>
        {{ $t('enter_your_email_address') }}
      </Question>

      <input type="text" v-model="profile.email.value" placeholder="Email Address" class="input" />
    </section>
    <section v-if="profile.email.value && valid">
      <Checkbox v-model="profile.email.is_primary">
         {{ $t('is_primary_email_address') }}
      </Checkbox>
    </section>


    <Buttons :valid="valid" :next="next" />

  </article>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Buttons from '~/components/forms/Buttons.vue';
import Question from '~/components/forms/Question.vue';
import RadioList from '~/components/forms/RadioList.vue';
import Checkbox from '~/components/forms/Checkbox.vue';


export default {
  components: {
    Buttons,
    Question,
    RadioList,
    Checkbox
  },
  computed: {
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        return this.$store.commit('profile/SET', values)
      }
    },
    valid() {
      var is_valid = this.validateEmail(this.profile.email.value)
      return is_valid
    },
    next() {
      return '/application/personal-information/address/perminent'
    }
  },
  mounted() {
    this.$emit('input', this.valid)

    if (!this.profile.email.value) {
      this.profile.email.use_existing = true
      this.profile.email.value = ''
    } else {
      this.profile.email.use_existing = false
    }
  },
  watch: {
    valid(to, from) {
      this.$store.commit('profile/SET', this.profile)
      this.$emit('input', this.valid)
    }
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Email Address",
    "would_you_like_to_use_existing_address": "Would you like to use your existing email address?",
    "enter_your_email_address": "Enter your email address:",
    "is_primary_email_address": "This is my primary email address?"
  },
  "fr": {
    "title": "Email Address",
    "would_you_like_to_use_existing_address": "Would you like to use your existing email address?",
    "enter_your_email_address": "Enter your email address:",
    "is_primary_email_address": "This is my primary email address?"
  }
}
</i18n>


<style lang="scss" scoped>

.email, .input {
  width: 100%;
  background: #efefef;
  padding: 1rem;
  border: solid 1px #ccc;
  font-size: 1.1em;
  margin: 1rem 0;
  margin-bottom: 3rem;

}
</style>
