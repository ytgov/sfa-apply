<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>

    <div class="balance">
      <div>Balance:</div> <div>${{balance}}</div> 
    </div>

    <section>
      <Question>
        {{ $t('how_much_would_like_to_apply_for') }}
      </Question>

      <Currency v-model="eligability.yukon_excellence_award.apply" :value="eligability.yukon_excellence_award.apply" :max="balance"/>
    </section>

    <Buttons :valid="valid" :next="next" back="true" />
  </article>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import Buttons from '~/components/forms/Buttons.vue';
import RadioList from '~/components/forms/RadioList.vue';

import Currency  from '~/components/forms/Currency.vue';

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    Currency
  },
  computed: {
    eligability: {
      get() {
        return this.$store.getters['eligability/GET']
      },
      set(values) {
        return this.$store.commit('eligability/SET', values)
      }
    },
    valid() {
      var is_valid = true

      return is_valid
    },
    next() {
      return '/eligability/scholarship'
    },
    balance() {
      return 1023;
    }
  },
  mounted() {
    this.$emit('input', this.valid)

    if (!this.eligability.yukon_excellence_award.apply) {
      this.eligability.yukon_excellence_award.apply = ''
    }
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligability/SET', this.eligability)
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Yukon Excellence Award",
    "how_much_would_like_to_apply_for": "How much funding would you like to apply for?"
  },
  "fr": {
    "title": "Yukon Excellence Award",
    "how_much_would_like_to_apply_for": "How much funding would you like to apply for?"
  }
}
</i18n>

<style lang="scss" scoped>
.balance {
  display: flex;
  width: 100%;
  background: #efefef;

  border: solid 1px #ccc;
  margin: 1rem 0;
  margin-bottom: 3rem;

  > div {
    padding: 1rem;
     font-size: 1.1em;
  
  }

}

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

