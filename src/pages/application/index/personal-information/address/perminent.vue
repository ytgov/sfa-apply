<template>
  <article>
    <h2>{{ $t('title') }}</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>

    <div class="balance" v-if="profile.address.perminent">
      <div>Address:</div> 
      <div>
        {{profile.address.perminent}}  
      </div> 
    </div>

    <h4>Enter New Address</h4>
    <AddressSelector v-model="profile.address.perminent" :value="profile.address.perminent" />

    <Buttons :valid="valid" :next="next" />
  </article>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import Buttons from '~/components/forms/Buttons.vue';
import RadioList from '~/components/forms/RadioList.vue';
import AddressSelector from "~/components/forms/AddressSelector.vue";


export default {
  components: {
    Buttons,
    Question,
    RadioList,
    AddressSelector
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
      var is_valid = this.profile.address.perminent!=''

      return is_valid
    },
    next() {
      return  '/application/personal-information/address/while-at-school'
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
    "title": "Perminent Address"
  },
  "fr": {
    "title": "Perminent Address"
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
</style>
