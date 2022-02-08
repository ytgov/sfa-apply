<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('have_you_been_out_of_territory_4_months') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.residency.have_you_been_out_of_territory_4_months" 
        :value="eligibility.residency.have_you_been_out_of_territory_4_months" 
      />
    </section>
    <section v-if="eligibility.residency.have_you_been_out_of_territory_4_months=='Yes'">
      <Question>
        {{ $t('will_you_be_resident_before_classes_start') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.residency.will_you_be_resident_before_classes_start" 
        :value="eligibility.residency.will_you_be_resident_before_classes_start" 
      />
    </section>

    <section v-if="eligibility.residency.have_you_been_out_of_territory_4_months=='Yes' && eligibility.residency.will_you_be_resident_before_classes_start">
      <Question>
        {{ $t('have_you_been_out_of_territory_12_months') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.residency.have_you_been_out_of_territory_12_months" 
        :value="eligibility.residency.have_you_been_out_of_territory_12_months" 
      />
    </section>
    <section v-if="eligibility.residency.have_you_been_out_of_territory_4_months=='Yes' && eligibility.residency.will_you_be_resident_before_classes_start && eligibility.residency.have_you_been_out_of_territory_12_months">
      <Question>
        {{ $t('do_you_file_with_cra_as_yukon_citizen') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.residency.do_you_file_with_cra_as_yukon_citizen" 
        :value="eligibility.residency.do_you_file_with_cra_as_yukon_citizen" 
      />
    </section>

    <section v-if="eligibility.residency.have_you_been_out_of_territory_4_months=='Yes' && eligibility.residency.will_you_be_resident_before_classes_start && eligibility.residency.have_you_been_out_of_territory_12_months && eligibility.residency.do_you_file_with_cra_as_yukon_citizen">
      <Question>
        {{ $t('valid_yukon_health_insurance') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.residency.valid_yukon_health_insurance" 
        :value="eligibility.residency.valid_yukon_health_insurance" 
      />
    </section>

    <section v-if="eligibility.residency.have_you_been_out_of_territory_4_months=='Yes' && eligibility.residency.will_you_be_resident_before_classes_start && eligibility.residency.have_you_been_out_of_territory_12_months && eligibility.residency.do_you_file_with_cra_as_yukon_citizen && eligibility.residency.valid_yukon_health_insurance">
      <Question>
        {{ $t('drivers_lisence_another_juristiction') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.residency.drivers_lisence_another_juristiction" 
        :value="eligibility.residency.drivers_lisence_another_juristiction" 
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
    eligibility: {
      get() {
        return this.$store.getters['eligibility/GET']
      },
      set(values) {
        return this.$store.commit('eligibility/SET', values)
      }
    },
    valid() {
      var is_valid =  
        this.eligibility.residency.have_you_been_out_of_territory_4_months == 'No' ||
        (
          this.eligibility.residency.have_you_been_out_of_territory_4_months == 'Yes' &&
          this.eligibility.residency.will_you_be_resident_before_classes_start &&
          this.eligibility.residency.have_you_been_out_of_territory_12_months &&
          this.eligibility.residency.do_you_file_with_cra_as_yukon_citizen 
        )
      return is_valid
    },
    next() {
      return '/eligibility/program'
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
    "title": "Residency",
    "have_you_been_out_of_territory_4_months": "Have you been living outside of the Yukon for more than 4 months while not in school full-time?",
    "will_you_be_resident_before_classes_start": "Will you be a resident for at least 2 years before your classes will start?",
    "have_you_been_out_of_territory_12_months": "Have you been out of the Yukon territory for over 12 months in the last two years?",
    "do_you_file_with_cra_as_yukon_citizen": "Do you file with the CRA as a Yukon Citizen?",
    "valid_yukon_health_insurance": "Do you have valid Yukon health care insurance",
    "drivers_lisence_another_juristiction": "Do you have a drivers lisence form another juristiction?"
  },
  "fr": {
    "title": "Residency",
    "have_you_been_out_of_territory_4_months": "Have you been living outside of the Yukon for more than 4 months while not in school full-time?",
    "will_you_be_resident_before_classes_start": "Will you be a resident for at least 2 years before your classes will start?",
    "have_you_been_out_of_territory_12_months": "Have you been out of the Yukon territory for over 12 months in the last two years?",
    "do_you_file_with_cra_as_yukon_citizen": "Do you file with the CRA as a Yukon Citizen?",
    "valid_yukon_health_insurance": "Do you have valid Yukon health care insurance",
    "drivers_lisence_another_juristiction": "Do you have a drivers lisence form another juristiction?"
  }
}
</i18n>
