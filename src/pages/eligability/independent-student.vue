<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('out_of_school') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.independentstudent.out_of_school" 
        :value="eligability.independentstudent.out_of_school" 
      />
    </section>

    <section v-if="eligability.independentstudent.out_of_school=='Yes'">
      <Question>
        {{ $t('in_labour_force') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.independentstudent.in_labour_force" 
        :value="eligability.independentstudent.in_labour_force" 
      />
    </section>
    
    <section v-if="eligability.independentstudent.out_of_school=='No' || eligability.independentstudent.out_of_school ">
      <Question>
        {{ $t('supporting_parent') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.independentstudent.supporting_parent" 
        :value="eligability.independentstudent.supporting_parent" 
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
          this.eligability.independentstudent.out_of_school &&
          this.eligability.independentstudent.supporting_parent 
        ) 

      return is_valid
    },
    next() {
      return '/eligability/dependant-student-juristiction'
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
    "title": "Independent Student",
    "out_of_school": "Have you been out of school for 4 or more years?",
    "in_labour_force": "Have you been in the labour force for at least two 12 month periods?",
    "supporting_parent": "Do you have no supporting parent/guardian or other supporting relative due to death or dissapearance?"
  },
  "fr": {
    "title": "Independent Student",
    "out_of_school": "Have you been out of school for 4 or more years?",
    "in_labour_force": "Have you been in the labour force for at least two 12 month periods?",
    "supporting_parent": "Do you have no supporting parent/guardian or other supporting relative due to death or dissapearance?"
  }
}
</i18n>
