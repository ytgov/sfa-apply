<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <p v-for="sentance in $t('body')" class="text-body-1">
      {{sentance }}
    </p>

    <div class="buttons mt-14">
      <div>
        <v-btn class="continue" color="primary" :to="next" x-large>
          Check Eligibility
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

export default {
  computed: {
    next() {
      return '/eligibility/citizenship'
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Before you start",
    "body": [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus nunc nec dictum ultrices. Aliquam ut neque et velit fringilla lobortis ut a sem. Vestibulum tortor nisi, mollis ac pharetra a, auctor eu ante.",
      "Suspendisse urna lectus, porta id varius et, egestas sit amet lacus. Vestibulum ultrices semper vestibulum."
    ]
  },
  "fr": {
    "title": "Before you start",
    "body": [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus nunc nec dictum ultrices. Aliquam ut neque et velit fringilla lobortis ut a sem. Vestibulum tortor nisi, mollis ac pharetra a, auctor eu ante.",
      "Suspendisse urna lectus, porta id varius et, egestas sit amet lacus. Vestibulum ultrices semper vestibulum."
    ]
  }
}
</i18n>
