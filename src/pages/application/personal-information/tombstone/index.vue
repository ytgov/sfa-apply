<template>
  <article data-layout="application">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section v-if="profile.tombstone.alias">
      <p>You have an existing alias? <strong>{{profile.tombstone.alias}}</strong></p>
    </section>

    <section v-if="profile.tombstone.alias">
      <Question>
        {{ $t('use_existing_alias') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.tombstone.use_existing_alias" 
        :value="profile.tombstone.use_existing_alias" 
      />
    </section>

    <section v-if="!profile.tombstone.alias || profile.tombstone.use_existing_alias == 'No'">
      <Question>
        {{ $t('what_is_your_sin_number') }}
      </Question>
      <ValidationProvider name="SIN" rules="sin"  tag="span" v-slot="{ errors, valid }" >
        <SinNumber 
          name="SIN"
          v-model="profile.sin" 
          :value="profile.sin" 
          :errors="errors" 
          :valid="valid" 
          class="limit"
        />
      </ValidationProvider>

    </section>

    <section v-if="(!profile.tombstone.alias || profile.tombstone.use_existing_alias == 'No') && profile.sin">
      <Question>
        {{ $t('what_is_your_birthday') }}
      </Question>

      <div class="limit">
        <DateSelector 
          v-model="profile.dob" 
          :value="profile.dob" 
        />
      </div>
    </section>

    <Buttons :valid="valid" :next="next" :back="true" />
  </article>
</template>



<script>
import { mapMutations, mapGetters } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Buttons from '~/components/forms/Buttons.vue';
import Question from '~/components/forms/Question.vue';
import RadioList from '~/components/forms/RadioList.vue';
import SinNumber from '~/components/forms/SinNumber.vue';
import DateSelector from '~/components/forms/DateSelector.vue';

export default {
  components: {
    ValidationProvider,
    Buttons,
    Question,
    RadioList,
    SinNumber,
    DateSelector
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
      var is_valid = (
        this.profile.tombstone.alias && this.profile.tombstone.use_existing_alias == 'Yes'
        || (
          !this.profile.tombstone.alias
          && (this.valid_sin && this.profile.sin)
          && this.profile.dob
        )
      )
      return is_valid;
    },
    valid_sin() {
      return this.profile.sin.length == 9
    },
    next() {
      return '/application/personal-information/address/permanent'
      //return '/application/personal-information/email'
    }
  },
  watch: {
    valid(to, from) {
      this.$store.commit('profile/SET', this.profile)
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Tombstone",
    "use_existing_alias": "Do you want to use your existing?",
    "what_is_your_sin_number": "What is your sin number?",
    "what_is_your_birthday": "What is your birthday?"
  },
  "fr": {
    "title": "Tombstone",
    "use_existing_alias": "Do you want to use your existing?",
    "what_is_your_sin_number": "What is your sin number?",
    "what_is_your_birthday": "What is your birthday?"
  }
}
</i18n>

<style lang="scss" scoped>
.limit {
  width: 70%;
  @media only screen and (max-width: 640px) {
    width: 100%;
  }
}
</style>
