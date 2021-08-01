<template>
  <v-container fluid>
    <Faq :faqs="faqs" />
  </v-container>
</template>

<i18n>
{
  "en": {

  },
  "fr": {
    
  }
}
</i18n>

<script>
import Faq from '~/components/Faq.vue';

export default {
	components: {
    Faq
  },
  data() {
    return {
      faqs: [
        {
          question: 'Item 1',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          question: 'Item 2',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]
    }
  }
}
</script>



