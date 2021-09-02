<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <p>
      Based on the information you provided:
    </p>


    
    <h4 class="text-h5 mb-3">You <strong>are eligible</strong> to apply for the following sources of funding:</h4>

    <div class="programs" v-if="eligible[title].length" v-for="programs, title in eligible">
      <h4>{{title}}</h4>
      <div v-for="program, index in programs"  :key="index" :class="program.active?'active':''">
        <div>
          <Checkbox v-model="programs[index].active" @click="toggleApplicationProgram(program)" />
        </div>
        <div>
          <strong>{{program.name[locale]}}</strong><br />
          <small>
            {{program.group}}
          </small>
        </div>
        <div>
          
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{ $t("none") }}</p>
    </div>

    <p>&nbsp;</p>


    <h4 class="text-h5 mb-3">You are not eligible to apply for:</h4>
    <div class="programs" v-if="ineligible[title].length" v-for="program, title in ineligible">
      <h4>{{title}}</h4>
      <div v-for="program, index in programs"  :key="index" :class="program.active?'active':''">
        <div>
          <Checkbox  v-model="programs[index].active" @click="toggleApplicationProgram(program)"/>
        </div>
        <div>
          <strong>{{program.name[locale]}}</strong><br />
          <small>
            {{program.group}}
          </small>
        </div>
        <div>
          
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{ $t("none") }}</p>
    </div>

    <p>
      Some text about still choosing to aply for the ineligibile funding sources... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
    eligible() {
      var eligible = this.$store.getters['programs/eligible'](this.eligibility);
      eligible.forEach((program)=>{
        this.toggleApplicationProgram(program)
      })
      return _.groupBy(eligible, (o) => { return o.group })
    },
    ineligible() {
      return _.groupBy(this.$store.getters['programs/ineligible'](this.eligibility), (o) => { return o.group })
    },
    eligibility: {
      get() {
        return this.$store.getters['eligibility/GET']
      },
      set(values) {
        return this.$store.commit('eligibility/SET', values)
      }
    }
  },
  mounted() {
    var self = this;
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligibility/SET', this.eligibility)
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
    "none": "There are currently no eligibile programs.",
    "types": {
      "grant": "Grant",
      "scholarship": "Scholarship",
      "loan": "Loan"
    }
  },
  "fr": {
     "title": "Eligable Programs",
    "none": "There are currently no eligibile programs.",
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
  > h4 {
    margin-bottom: 0.75rem;
  }
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
