<template>
  <article>
    <h2>{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('do_you_have_existing_alias') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.tombstone.has_existing_alias" 
        :value="profile.tombstone.has_existing_alias" 
      />
    </section>

    <section>
      Displays Alias
    </section>

    <section v-if="profile.scolorship.is_high_school_student=='Yes'">
      <Question>
        {{ $t('are_you_a_high_school_graduate') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.scolorship.is_high_school_graduate" 
        :value="profile.scolorship.is_high_school_graduate" 
      />
    </section>
    <section v-if="profile.scolorship.is_high_school_student=='Yes' && profile.scolorship.is_high_school_graduate">
      <Question>
        {{ $t('are_you_pursuing_aviation') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.scolorship.is_pursuing_aviation" 
        :value="profile.scolorship.is_pursuing_aviation" 
      />
    </section>

    <Buttons :valid="valid" :next="next" />
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
    ...mapGetters({

    }),
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
        this.profile.scolorship.is_high_school_student == 'No' ||
        (
          this.profile.scolorship.is_high_school_student == 'Yes' 
          && this.profile.scolorship.is_high_school_graduate == 'Yes'
          && this.profile.scolorship.is_pursuing_aviation
        )
      )
      return is_valid;
    },
    next() {
      return '/application/personal-information/email'
    }
  },
  mounted() {
    this.$emit('input', this.valid)
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
    "do_you_have_existing_alias": "Do you have an existing alias?"
  },
  "fr": {
    "title": "Tombstone",
    "do_you_have_existing_alias": "Do you have an existing alias?"
  }
}
</i18n>
