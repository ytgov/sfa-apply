<template>
  <article data-layout="application">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>

    <div class="balance" v-if="profile.address.at_school">
      <div>Address:</div> 
      <div>
        {{profile.address.at_school}}  

        <div style="margin-top: 1rem;">
          <a @click="update()" class="update">Update</a>
        </div>
      </div> 
    </div>

    <section v-if="updating || !profile.address.at_school">
      <h4>Enter New Address</h4>
      <AddressSelector v-model="profile.address.at_school" :value="profile.address.at_school" />
    </section>
    <Buttons :valid="valid" :next="next" :back="true" />
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
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        return this.$store.commit('profile/SET', values)
      }
    },
    valid() {
      var is_valid = this.profile.address.at_school!=''

      return is_valid
    },
    next() {
      return '/application/documents'
    }
  },
  data() {
    return {
      updating: false
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
  },
  methods: {
    update() {
      this.updating = true;
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Address / While at School"
  },
  "fr": {
    "title": "Address / While at School"
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

.update {
  text-transform: uppercase;
  color: #fff;
  background:#244C5A;
  text-decoration: none;
  padding: 0.25rem  1rem;
  font-size: 1rem;
}
</style>
