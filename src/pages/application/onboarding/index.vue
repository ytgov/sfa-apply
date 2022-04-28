<template>
  <v-container fluid>
    <header>
      <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
    </header>
    <section>
      <aside>
        <nuxt-link :to="item.uri" v-for="item, index in menu" v-if="index<=currentIndex">
          {{item.name}}
        </nuxt-link>
        <span v-else>{{item.name}}</span>
      </aside>
      <nuxt-child  :keep-alive-props="{ exclude: ['modal'] }" />
    </section>
  </v-container>
</template>


<script>
export default {
  computed: {
    currentIndex() {
      return _.findIndex(this.menu, (o)=>{
        return o.uri == this.$route.path
      })
    }
  },
  data() {
    return {
      menu: [
        {
          name: 'Personal Details',
          uri: '/application/onboarding'
        },
        {
          name: 'Addresses',
          uri: '/application/onboarding/addresses'
        },
        {
          name: 'Statistical Information',
          uri: '/application/onboarding/statistical'
        },
        {
          name: 'Consent Release',
          uri: '/application/onboarding/consent-release'
        },
        {
          name: 'Residency',
          uri: '/application/onboarding/residency-history'
        },
        {
          name: 'Education History',
          uri: '/application/onboarding/education-history'
        },
        {
          name: 'Other Funding',
          uri: '/application/onboarding/other-funding'
        },
        {
          name: 'Student Dependents',
          uri: '/application/onboarding/dependants'
        },
        {
          name: 'CSFA Study Period',
          uri: '/application/onboarding/csfa'
        },
        {
          name: 'CSFA Accomodation',
          uri: '/application/onboarding/csfa-accomodation'
        },
        /*
        {
          name: 'CSFA Employment',
          uri: '/application/onboarding/csfa-employment'
        },
        */
        {
          name: 'CSFA Expenses',
          uri: '/application/onboarding/csfa-expenses'
        },
        {
          name: 'CSFA Income',
          uri: '/application/onboarding/csfa-income'
        },
        {
          name: 'Parents',
          uri: '/application/onboarding/parents'
        },
         {
          name: 'Parent Dependants',
          uri: '/application/onboarding/parent-dependants'
        },
        {
          name: 'Spouse',
          uri: '/application/onboarding/spouse'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
div.container {
  > section {
    display: grid;
    grid-template-columns: 3fr 9fr;
    grid-gap: 2rem;

    > aside {
      > a, > span {
        display: block;
        text-decoration: none;

        border-left: solid 2px #fff;
        padding-left: 1rem;

        margin: 1rem 0;

        &.nuxt-link-exact-active {
          font-weight: bold;

          border-left: solid 2px #1976d2;
          padding-left: 1rem;
        }
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Your Application Information"
  },
  "fr": {
    "title": "Your Application Information"
  }
}
</i18n>