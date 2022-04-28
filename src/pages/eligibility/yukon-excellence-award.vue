<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
    <p>
      You can earn Yukon Excellence Award in grades 10–12 when attending a Yukon high school.  This funding can be used towards tuition, compulsory fees and/or book costs to attend post-secondary education and training to a maximum of $3000. You can apply for the entire amount of the Yukon Excellence Awards earned or use a part each year. 
    </p>

    <div class="balance">
      <div>Balance:</div> <div>${{balance}}</div> 
    </div>

    <section>
      <Question>
        {{ $t('how_much_would_like_to_apply_for') }}
      </Question>

      <Currency v-model="eligibility.yukon_excellence_award.apply" :value="eligibility.yukon_excellence_award.apply" :max="balance"/>
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
    eligibility: {
      get() {
        return this.$store.getters['eligibility/GET']
      },
      set(values) {
        return this.$store.commit('eligibility/SET', values)
      }
    },
    valid() {
      var is_valid = true

      return is_valid
    },
    next() {
      return '/eligibility/scholarship'
    },
    balance() {
      return 1023;
    }
  },
  mounted() {
    this.$emit('input', this.valid)

    if (!this.eligibility.yukon_excellence_award.apply) {
      this.eligibility.yukon_excellence_award.apply = ''
    }
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligibility/SET', this.eligibility)
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Yukon excellence award",
    "how_much_would_like_to_apply_for": "How much funding would you like to apply for?"
  },
  "fr": {
    "title": "Yukon excellence award",
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

