<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <p>
      Based on the information you provided:
    </p>

    <h4 class="text-h5 mb-3">You <strong>are eligible</strong> to apply for the following sources of funding:</h4>
    
    <div class="programs">
      <div :class="fulltime_active?'active':''" v-if="fulltime_eligable.length">
        <div class="top">
          <Checkbox v-model="fulltime_active" @click="toggleApplicationProgram(program)" />
        </div>
        <div>
          <strong>Canada Student Financial Assistance - Full Time</strong>
           <MoreDetails :programs="fulltime_eligable" />
        </div>
      </div>
       
      <div :class="parttime_active?'active':''" v-if="parttime_eligable.length">
        <div class="top">
          <Checkbox v-model="parttime_active" @click="toggleApplicationProgram(program)" />
        </div>
        <div>
          <strong>Canada Student Financial Assistance - Part Time</strong>
          <MoreDetails :programs="parttime_eligable" />
        </div>
      </div>
    </div>
     

    <div class="programs"  v-for="programs, title in eligible" v-if="eligible[title].length">
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
      </div>
    </div>
    <div v-else>
      <p>{{ $t("none") }}</p>
    </div>

    <p>&nbsp;</p>

    <h4 class="text-h5 mb-3">You are not eligible to apply for:</h4>


    <div class="programs">
      <div :class="fulltime_active?'active':''" v-if="fulltime_ineligable.length">
        <div class="top">
          <Checkbox v-model="fulltime_active" @click="toggleApplicationProgram(program)" />
        </div>
        <div>
          <strong>Canada Student Financial Assistance - Full Time</strong>

          <MoreDetails :programs="fulltime_ineligable" />
        </div>
      </div>
       
      <div :class="parttime_active?'active':''" v-if="parttime_ineligable">
        <div class="top">
          <Checkbox v-model="parttime_active" @click="toggleApplicationProgram(program)" />
        </div>
        <div>
          <strong>Canada Student Financial Assistance - Part Time</strong>
          <MoreDetails :programs="parttime_ineligable" />
        </div>
      </div>
    </div>
     

    <div class="programs" v-if="ineligible[title].length" v-for="programs, title in ineligible">
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
      </div>
    </div>
    <div v-else>
      <p>{{ $t("none") }}</p>
    </div>

    <p>
      Some text about still choosing to apply for the ineligible funding sources... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
import MoreDetails from '~/components/MoreDetails.vue';

export default {
  components: {
    Checkbox,
    MoreDetails
  },
  computed: {
    ...mapGetters({
      programs: 'applications/programs'
    }),
    locale() {
      return this.$i18n.locale
    },
    fulltime_eligable() {
      var eligible = this.$store.getters['programs/fulltime_eligable'](this.eligibility);
      eligible.forEach((program, index)=>{
        eligible[index].active = true
      })
      return eligible
    },
    parttime_eligable() {
      var eligible = this.$store.getters['programs/parttime_eligable'](this.eligibility);
      eligible.forEach((program, index)=>{
        eligible[index].active = true
      })
      return eligible
    },
    fulltime_ineligable() {
      var eligible = this.$store.getters['programs/fulltime_ineligable'](this.eligibility);
      eligible.forEach((program, index)=>{
        eligible[index].active = true
      })
      return eligible
    },
    parttime_ineligable() {
      var eligible = this.$store.getters['programs/parttime_ineligable'](this.eligibility);
      eligible.forEach((program, index)=>{
        eligible[index].active = true
      })
      return eligible
    },
    eligible() {
      var eligible = this.$store.getters['programs/eligible'](this.eligibility);
      eligible.forEach((program, index)=>{
        eligible[index].active = true
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
  data() {
    return {
      fulltime_active: true
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
    "title": "Eligible Programs",
    "none": "There are currently no eligibile programs.",
    "types": {
      "grant": "Grant",
      "scholarship": "Scholarship",
      "loan": "Loan"
    }
  },
  "fr": {
     "title": "Eligible Programs",
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
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;

    &.active {
      background: #eee;
    }


    > div {
      width: 100%;
      padding: 0.5rem 2rem;
      &:first-of-type {
        width: 10%;
        &.top {
          align-self: start;
          margin-top: 0.5rem;
        }
      }
    }

    @media only screen and (max-width: 768px) {
      > div {
        padding: 1rem; 
        text-align: left;
        &:first-of-type {
          width: 10%;
        }
      }
    }
  }
}



</style>
