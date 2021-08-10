<template>
  <v-container fluid>
    <h2>Residence.</h2>

    <section>
      <Question>
        {{ $t('have_you_been_out_of_territory_4_months') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.residence.have_you_been_out_of_territory_4_months" 
        :value="profile.residence.have_you_been_out_of_territory_4_months" 
      />
    </section>
    <section v-if="profile.residence.have_you_been_out_of_territory_4_months=='Yes'">
      <Question>
        {{ $t('will_you_be_resident_before_classes_start') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.residence.will_you_be_resident_before_classes_start" 
        :value="profile.residence.will_you_be_resident_before_classes_start" 
      />
    </section>

    <section v-if="profile.residence.have_you_been_out_of_territory_4_months=='Yes' && profile.residence.will_you_be_resident_before_classes_start">
      <Question>
        {{ $t('have_you_been_out_of_territory_12_months') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.residence.have_you_been_out_of_territory_12_months" 
        :value="profile.residence.have_you_been_out_of_territory_12_months" 
      />
    </section>
    <section v-if="profile.residence.have_you_been_out_of_territory_4_months=='Yes' && profile.residence.will_you_be_resident_before_classes_start && profile.residence.have_you_been_out_of_territory_12_months">
      <Question>
        {{ $t('do_you_file_with_cra_as_yukon_citizen') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.residence.do_you_file_with_cra_as_yukon_citizen" 
        :value="profile.residence.do_you_file_with_cra_as_yukon_citizen" 
      />
    </section>
  </v-container>
</template>



<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import Buttons from '~/components/forms/Buttons.vue';
import RadioList from '~/components/forms/RadioList.vue';

export default {
  components: {
    Question,
    RadioList
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
      var is_valid =  
        this.profile.residence.have_you_been_out_of_territory_4_months == 'No' ||
        (
          this.profile.residence.have_you_been_out_of_territory_4_months == 'Yes' &&
          this.profile.residence.will_you_be_resident_before_classes_start &&
          this.profile.residence.have_you_been_out_of_territory_12_months &&
          this.profile.residence.do_you_file_with_cra_as_yukon_citizen 
        )
      return is_valid
    }
  },
  mounted() {
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "have_you_been_out_of_territory_4_months": "Have you been out of the Yukon territory for over 4 months in the last two years?",
    "will_you_be_resident_before_classes_start": "Will you be a resident for at least 2 years before your classes will start?",
    "have_you_been_out_of_territory_12_months": "Have you been out of the Yukon territory for over 12 months in the last two years?",
    "do_you_file_with_cra_as_yukon_citizen": "Do you file with the CRA as a Yukon Citizen?"
  },
  "fr": {

  }
}
</i18n>
