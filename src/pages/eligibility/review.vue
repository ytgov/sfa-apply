<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <p>
      Based on the information you provided:
    </p>

    <h4 class="text-h5 mb-3">You <strong>are eligible</strong> to apply for the following sources of funding:</h4>
    
    <div class="programs">
      <div :class="fulltime_active?'active':''" v-if="fulltime_eligible.length && isFullTime">
        <div class="top">
          <Checkbox v-model="fulltime_active" @click="toggleFullTime()" />
        </div>
        <div>
          <strong>Canada Student Financial Assistance - Full Time</strong>
           <MoreDetails :programs="fulltime_eligible" />
        </div>
      </div>
       
      <div :class="parttime_active?'active':''" v-if="parttime_eligible.length && isPartTime">
        <div class="top">
          <Checkbox v-model="parttime_active" @click="togglePartTime()" />
        </div>
        <div>
          <strong>Canada Student Financial Assistance - Part Time</strong>
          <MoreDetails :programs="parttime_eligible" />
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
      <div :class="ineligible_fulltime_active?'active':''" v-if="fulltime_ineligible.length && isFullTime">
        <div class="top">
          <Checkbox v-model="ineligible_fulltime_active" @click="toggleIneligibleFullTime()" />
        </div>
        <div>
          <strong>Canada Student Financial Assistance - Full Time</strong>

          <MoreDetails :programs="fulltime_ineligible" />
        </div>
      </div>

       
      <div :class="ineligible_parttime_active?'active':''" v-if="parttime_ineligible.length && isPartTime">
        <div class="top">
          <Checkbox v-model="ineligible_parttime_active" @click="toggleIneligiblePartTime()" />
        </div>
        <div>
          <strong>Canada Student Financial Assistance - Part Time</strong>
          <MoreDetails :programs="parttime_ineligible" />
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
      If you would like to be assessed for one of the programs that indicate ‘you are not eligible to apply for’, please check the box next to the funding type and we will assess your application.
    </p>


    <div class="buttons mt-14">
      <div>
        <v-btn @click.native="next()" color="primary" x-large>
          <span v-if="$route.query.revise">Continue</span>
          <span v-else>Start Application</span>
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
    isFullTime() {
      return !!(this.eligibility.enrollment.time && this.eligibility.enrollment.time=='Full-time')
    },
    isPartTime() {
      return !!(this.eligibility.enrollment.time && this.eligibility.enrollment.time=='Part-time')
    },
    fulltime_eligible() {
      var eligible = this.$store.getters['programs/fulltime_eligible'](this.eligibility);
      eligible.forEach((program, index)=>{
        if (typeof eligible[index].active == 'undefined' ) {
          eligible[index].active = true
        }
      })
      return eligible
    },
    parttime_eligible() {
      var eligible = this.$store.getters['programs/parttime_eligible'](this.eligibility);
      eligible.forEach((program, index)=>{
        if (typeof eligible[index].active == 'undefined' ) {
          eligible[index].active = true
        }
      })
      return eligible
    },
    fulltime_ineligible() {
      var eligible = this.$store.getters['programs/fulltime_ineligible'](this.eligibility);
      eligible.forEach((program, index)=>{
        eligible[index].active = true
      })
      return eligible
    },
    parttime_ineligible() {
      var eligible = this.$store.getters['programs/parttime_ineligible'](this.eligibility);
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
    selected_programs() {
      return _.filter(this.fulltime_eligible, { active: true })
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
      fulltime_active: ((this.fulltime_ineligible||[]).length) ? false : true,
      parttime_active: ((this.parttime_ineligible||[]).length) ? false : true,
      ineligible_fulltime_active: false,
      ineligible_parttime_active: false,
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
    },
    fulltime_active(to, from) {
      var eligible = this.$store.getters['programs/fulltime_eligible'](this.eligibility);
      eligible.forEach((program, index)=>{
        eligible[index].active = to
      })
      this.fulltime_eligible = eligible
    },
    parttime_active(to, from) {

    }
  },
  methods: {
    toggleApplicationProgram(program) {
      let data = { ...program }
      delete data.active

      this.$store.commit('applications/TOGGLE_APPLICATION_PROGRAM', program)
    },
    togglePartTime() {
      this.parttime_active = !this.parttime_active
    },
    toggleFullTime() {
      this.fulltime_active = !this.fulltime_active
    },
    toggleIneligiblePartTime() {
      this.ineligible_parttime_active = !this.ineligible_parttime_active
    },
    toggleIneligibleFullTime() {
      this.ineligible_fulltime_active = !this.ineligible_fulltime_active
    },
    next() {
      if (this.$route.query.revise == 'true') {
        this.$router.push('/application/submit')
      } else {
        this.$router.push('/application')
      }
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
