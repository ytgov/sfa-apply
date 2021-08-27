<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <p>
      Based on the information you provided:
    </p>
    
    <h4 class="text-h5 mb-3">You <strong>are eligable</strong> to apply for the following sources of funding:</h4>

    <div class="programs" v-if="eligable.length">
      <div v-for="program, index in eligable"  :key="index" :class="program.active?'active':''">
        <div>
          <Checkbox v-model="eligable[index].active" @click="toggleApplicationProgram(program)" />
        </div>
        <div>
          <strong>{{program.name[locale]}}</strong><br />
          <small>
            {{program.group}}
          </small>
        </div>
        <div>
          {{ $t(`types.${program.type}`) }}
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{ $t("none") }}</p>
    </div>

    <p>&nbsp;</p>

    <h4 class="text-h5 mb-3">You are not eligable to apply for:</h4>
    <div class="programs" v-if="ineligable.length" >
      <div v-for="program, index in ineligable"  :key="index" :class="program.active?'active':''">
        <div>
          <Checkbox  v-model="ineligable[index].active" @click="toggleApplicationProgram(program)"/>
        </div>
        <div>
          <strong>{{program.name[locale]}}</strong><br />
          <small>
            {{program.group}}
          </small>
        </div>
        <div>
          {{ $t(`types.${program.type}`) }}
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{ $t("none") }}</p>
    </div>

    <p>
      Some text about still choosing to aply for the ineligable funding sources... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
   
   
    <div class="buttons mt-14">
      <div>
        <v-btn to="/application" class="continue" color="primary">
          Start Application
        </v-btn>
      </div>
      <div>
        <nuxt-link to="/">
          Cancel
        </nuxt-link>
      </div>
    </div>


  </article>
</template>



<script>
import { mapMutations, mapGetters } from 'vuex'
import Checkbox from '~/components/forms/Checkbox.vue';

export default {
  components: {
    Checkbox
  },
  computed: {
    ...mapGetters({
      programs: 'applications/programs'
    }),
    locale() {
      return this.$i18n.locale
    },
    eligable() {
      return this.$store.getters['programs/eligable']( this.eligability)
    },
    ineligable() {
      return this.$store.getters['programs/ineligable'](this.eligability)
    },
    eligability: {
      get() {
        return this.$store.getters['eligability/GET']
      },
      set(values) {
        return this.$store.commit('eligability/SET', values)
      }
    }
  },
  mounted() {
    var self = this;
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligability/SET', this.eligability)
      this.$emit('input', this.valid)
    }
  },
  methods: {
    toggleApplicationProgram(program) {
      this.$store.commit('applications/TOGGLE_APPLICATION_PROGRAM', program)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Eligable Programs",
    "none": "There are currently no eligable programs.",
    "types": {
      "grant": "Grant",
      "scholarship": "Scholarship",
      "loan": "Loan"
    }
  },
  "fr": {
     "title": "Eligable Programs",
    "none": "There are currently no eligable programs.",
    "types": {
      "grant": "Grant",
      "scholarship": "Scholarship",
      "loan": "Loan"
    }
  }
}
</i18n>



<style lang="scss" scoped>
div.programs {
  margin-top: 2rem;
  > div {
    display: flex;
    align-items: center;

    padding: 0.25rem 0;

    border: solid 2px #000;
    margin-bottom: 1rem;

    &.active {
      background: #eee;
    }


    > div {
      width: 100%;
      padding: 0.5rem 2rem;
      &:first-of-type {
        width: 10%;
      }
      &:last-of-type {
        width: auto;
        text-align: right;
      }
    }

    @media only screen and (max-width: 768px) {
      display: block;
      > div {
        padding: 0.25rem 0; 
        text-align: left;
        &:last-of-type {
          text-align: left;
        }
      }
    }
  }
}

</style>
