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
  head (){
    return {
      title: 'Yukon Student Financial Portal - FAQ'
    }
  },
	components: {
    Faq
  },
  data() {
    return {
      faqs: [
        {
          question: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          question: 'Vivamus elit magna, posuere ac aliquam vitae, blandit in orci.?',
          answer: 'Ut vulputate, turpis ac volutpat malesuada, purus odio vulputate nibh, sed interdum risus tortor et neque. Sed fermentum elit mi. Suspendisse potenti. Fusce in porta sem, non euismod quam. Duis elementum mattis mauris eu facilisis. Pellentesque neque mi, sollicitudin eget diam ut, aliquam interdum eros.'
        },
        {
          question: 'Sed vel odio ac orci condimentum elementum eget sodales justo?',
          answer: 'Ut purus arcu, vehicula eget finibus ut, varius in mauris. In vitae diam id libero dictum semper nec eu massa. Duis iaculis accumsan eleifend. Sed vel aliquet eros, et placerat ante. Duis et hendrerit metus. Mauris non vestibulum risus. Suspendisse non orci vel lorem tempor malesuada at non erat. Praesent sed tortor et nisi gravida sagittis non non elit. Etiam tincidunt finibus massa, eget condimentum dolor fermentum a.'
        },
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          question: 'Etiam venenatis porttitor sapien, ac semper metus tristique vitae?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]
    }
  }
}
</script>



