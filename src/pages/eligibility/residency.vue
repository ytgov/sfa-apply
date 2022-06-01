<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>

        {{ $t('living_in_yukon_for_2_years') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.living_in_yukon_for_2_years" 
        :value="eligibility.residency.living_in_yukon_for_2_years" 
      />
    </section>
    <section v-if="eligibility.residency.living_in_yukon_for_2_years=='Yes'">
      <Question>
        {{ $t('did_you_move_during_2_years_more_4_months') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.did_you_move_during_2_years_more_4_months" 
        :value="eligibility.residency.did_you_move_during_2_years_more_4_months" 
      />
    </section>

    <section v-if="eligibility.residency.living_in_yukon_for_2_years=='No'">
      <Question>
        {{ $t('did_you_move_during_2_years_more_12_months') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.did_you_move_during_2_years_more_12_months" 
        :value="eligibility.residency.did_you_move_during_2_years_more_12_months" 
      />
    </section>
    <section v-if="maybe_resident">
      <Question>
        {{ $t('do_you_file_with_cra_as_yukon_citizen') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.do_you_file_with_cra_as_yukon_citizen" 
        :value="eligibility.residency.do_you_file_with_cra_as_yukon_citizen" 
      />
    </section>

    <section v-if="maybe_resident && eligibility.residency.do_you_file_with_cra_as_yukon_citizen">
      <Question>
        {{ $t('valid_yukon_health_insurance') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.residency.valid_yukon_health_insurance" 
        :value="eligibility.residency.valid_yukon_health_insurance" 
      />
    </section>

    <section v-if="maybe_resident && eligibility.residency.do_you_file_with_cra_as_yukon_citizen && eligibility.residency.valid_yukon_health_insurance">
      <Question>
        {{ $t('drivers_lisence_another_juristiction') }}
      </Question>

      <YesNoRadio
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
      var is_valid =  (
        !this.maybe_resident || 
        (
          this.maybe_resident &&
          (
            this.eligibility.residency.do_you_file_with_cra_as_yukon_citizen &&
            this.eligibility.residency.valid_yukon_health_insurance &&
            this.eligibility.residency.drivers_lisence_another_juristiction
          )
        )
      )
      return is_valid
    },
    next() {
      return this.localePath('/eligibility/program')
    },
    maybe_resident() {
      return this.eligibility.residency.living_in_yukon_for_2_years && (
        this.eligibility.residency.did_you_move_during_2_years_more_4_months == 'Yes' ||
        this.eligibility.residency.did_you_move_during_2_years_more_12_months == 'Yes'
      )
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
    "living_in_yukon_for_2_years": "Have you physically been living in Yukon for the two years immediately prior to starting your program?",
    "did_you_move_during_2_years_more_4_months": "During this 2-year period, were you away from Yukon for more than 4 months and less than 12 months? ",
    "did_you_move_during_2_years_more_12_months": "During this 2-year period, were you away from Yukon for more than 12 months?",


    "do_you_file_with_cra_as_yukon_citizen": "Do you file with the CRA as a Yukon Citizen?",
    "valid_yukon_health_insurance": "Do you have valid Yukon health care insurance",
    "drivers_lisence_another_juristiction": "Do you have a drivers lisence form another juristiction?"
  },
  "fr": {
    "title": "Lieu de résidence",
    "living_in_yukon_for_2_years": "Avez-vous habité à l’extérieur du Yukon pendant plus de quatre mois tout en n’étant pas aux études à temps plein?",
    "did_you_move_during_2_years_more_4_months": "Aurez-vous résidé au Yukon pendant au moins deux ans avant le début de vos cours?",
    "did_you_move_during_2_years_more_12_months": "Avez-vous habité à l’extérieur du territoire du Yukon pendant plus de 12 mois au cours des deux dernières années?",

    "do_you_file_with_cra_as_yukon_citizen": "Produisez-vous votre déclaration de revenus à titre de résident du Yukon auprès de l’ARC?",
    "valid_yukon_health_insurance": "Avez-vous une carte d’assurance-santé du Yukon valide?",
    "drivers_lisence_another_juristiction": "Êtes-vous titulaire d’un permis de conduire délivré ailleurs qu’au Yukon?"
  }
}
</i18n>
