<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('responsible_for_child') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.parent.responsible_for_child" 
        :value="eligibility.parent.responsible_for_child" 
      />
    </section>

    <section v-if="eligibility.parent.responsible_for_child">
      <Question>
        {{ $t('ever_been_a_single_parent') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.parent.ever_been_a_single_parent" 
        :value="eligibility.parent.ever_been_a_single_parent" 
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
import YesNoRadio from '~/components/forms/YesNoRadio.vue';

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    YesNoRadio
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
      var is_valid = (
          this.eligibility.parent.responsible_for_child == 'No' 
        ) || (
          this.eligibility.parent.responsible_for_child == 'Yes' 
          && this.eligibility.parent.ever_been_a_single_parent
        )

      return is_valid
    },
    next() {
      if (this.eligibility.parent.responsible_for_child == 'Yes') {
        return this.localePath('/eligibility/single-parent-juristiction')
      }
      return this.localePath('/eligibility/independent-student')
    }
  },
  mounted() {
    this.$emit('input', this.valid)
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
    "title": "Single parent student",
    "responsible_for_child": "Do you currently have physical custody and are responsible for supporting a child?",
    "ever_been_a_single_parent": "Have you ever been a single parent and your children are currently not in your care?"
  },
  "fr": {
    "title": "Étudiant chef de famille monoparentale",
    "responsible_for_child": "Avez-vous actuellement la garde physique d’un enfant et la responsabilité de subvenir à ses besoins?",
    "ever_been_a_single_parent": "Avez-vous déjà été chef de famille monoparentale et votre ou vos enfants ne sont plus actuellement à votre charge?"
  }
}
</i18n>
