<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('responsible_for_child') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.parent.responsible_for_child" 
        :value="eligability.parent.responsible_for_child" 
      />
    </section>

    <section v-if="eligability.parent.responsible_for_child">
      <Question>
        {{ $t('ever_been_a_single_parent') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.parent.ever_been_a_single_parent" 
        :value="eligability.parent.ever_been_a_single_parent" 
      />
    </section>

    <Buttons :valid="valid" :next="next" back="true" />
  </article>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Buttons from '~/components/forms/Buttons.vue';
import Question from '~/components/forms/Question.vue';
import RadioList from '~/components/forms/RadioList.vue';

export default {
  components: {
    Buttons,
    Question,
    RadioList
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
      var is_valid = (
          this.eligability.parent.responsible_for_child == 'No' 
        ) || (
          this.eligability.parent.responsible_for_child == 'Yes' 
          && this.eligability.parent.ever_been_a_single_parent
        )

      return is_valid
    },
    next() {
      return '/eligability/independent-student'
    }
  },
  mounted() {
    this.$emit('input', this.valid)
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
    "title": " Single Parent Student",
    "responsible_for_child": "Do you currently have physical custody and are responsible for supporting a child?",
    "ever_been_a_single_parent": "Have you ever been a single parent and your children are currently not in your care?"
  },
  "fr": {
    "title": " Single Parent Student",
    "responsible_for_child": "Do you currently have physical custody and are responsible for supporting a child?",
    "ever_been_a_single_parent": "Have you ever been a single parent and your children are currently not in your care?"
  }
}
</i18n>
