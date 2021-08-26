<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('have_you_been_out_of_territory_4_months') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.residence.have_you_been_out_of_territory_4_months" 
        :value="eligability.residence.have_you_been_out_of_territory_4_months" 
      />
    </section>
    <section v-if="eligability.residence.have_you_been_out_of_territory_4_months=='Yes'">
      <Question>
        {{ $t('will_you_be_resident_before_classes_start') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.residence.will_you_be_resident_before_classes_start" 
        :value="eligability.residence.will_you_be_resident_before_classes_start" 
      />
    </section>

    <section v-if="eligability.residence.have_you_been_out_of_territory_4_months=='Yes' && eligability.residence.will_you_be_resident_before_classes_start">
      <Question>
        {{ $t('have_you_been_out_of_territory_12_months') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.residence.have_you_been_out_of_territory_12_months" 
        :value="eligability.residence.have_you_been_out_of_territory_12_months" 
      />
    </section>
    <section v-if="eligability.residence.have_you_been_out_of_territory_4_months=='Yes' && eligability.residence.will_you_be_resident_before_classes_start && eligability.residence.have_you_been_out_of_territory_12_months">
      <Question>
        {{ $t('do_you_file_with_cra_as_yukon_citizen') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.residence.do_you_file_with_cra_as_yukon_citizen" 
        :value="eligability.residence.do_you_file_with_cra_as_yukon_citizen" 
      />
    </section>

    <Buttons :valid="valid" :next="next" :back="true" />
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
      var is_valid =  
        this.eligability.residence.have_you_been_out_of_territory_4_months == 'No' ||
        (
          this.eligability.residence.have_you_been_out_of_territory_4_months == 'Yes' &&
          this.eligability.residence.will_you_be_resident_before_classes_start &&
          this.eligability.residence.have_you_been_out_of_territory_12_months &&
          this.eligability.residence.do_you_file_with_cra_as_yukon_citizen 
        )
      return is_valid
    },
    next() {
      return '/eligability/program'
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
    "title": "Residence",
    "have_you_been_out_of_territory_4_months": "Have you been out of the Yukon territory for over 4 months in the last two years?",
    "will_you_be_resident_before_classes_start": "Will you be a resident for at least 2 years before your classes will start?",
    "have_you_been_out_of_territory_12_months": "Have you been out of the Yukon territory for over 12 months in the last two years?",
    "do_you_file_with_cra_as_yukon_citizen": "Do you file with the CRA as a Yukon Citizen?"
  },
  "fr": {
    "title": "Residence",
    "have_you_been_out_of_territory_4_months": "Have you been out of the Yukon territory for over 4 months in the last two years?",
    "will_you_be_resident_before_classes_start": "Will you be a resident for at least 2 years before your classes will start?",
    "have_you_been_out_of_territory_12_months": "Have you been out of the Yukon territory for over 12 months in the last two years?",
    "do_you_file_with_cra_as_yukon_citizen": "Do you file with the CRA as a Yukon Citizen?"
  }
}
</i18n>
