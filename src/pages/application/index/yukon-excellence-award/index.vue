<template>
  <v-container fluid>
    <h2>{{ $t('title') }}</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>

    <div class="balance">
      <div>Balance:</div> <div>$0</div> 
    </div>

    <section>
      <Question>
        {{ $t('how_much_would_like_to_apply_for') }}
      </Question>

      <input type="text" v-model="profile.yukon_excellence_award.apply" placeholder="$0" class="input" />
    </section>

    <Buttons :valid="valid" :next="next" />
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import Buttons from '~/components/forms/Buttons.vue';
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
      var is_valid = true

      return is_valid
    },
    next() {
      return '/application/atipp'
    }
  },
  mounted() {
    this.$emit('input', this.valid)

    if (!this.profile.yukon_excellence_award.apply) {
      this.profile.yukon_excellence_award.apply = ''
    }
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

