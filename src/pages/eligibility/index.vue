<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <p v-for="sentance in $t('body')" class="text-body-1">
      {{ sentance }}
    </p>

    <div class="buttons mt-14">
      <div>
        <v-btn class="continue" color="primary" :to="next" x-large>
          {{ $t('buttons.check') }}
        </v-btn>
      </div>
      <div>
        <nuxt-link to="/">
          {{ $t('buttons.cancel') }}
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
    "title": "Eligibility checker – Before you start",
    "body": [
      "Thank you for registering. Before you begin your application, make sure to check your eligibility for more funding programs. To check, select the button below to see available funding opportunities, as you may be eligible for more than one funding program. "
    ],
    "buttons": {
      "check": "Check Eligibility",
      "cancel": "Cancel"
    }
  },
  "fr": {
    "title": "Vérification de l’admissibilité – Avant de commencer",
    "body": [
      "Merci de votre inscription. Avant de commencer à remplir votre demande, vérifiez votre admissibilité à d’autres programmes d’aide financière. Pour ce faire, cliquez sur le bouton ci-dessous pour voir les possibilités d’aide financière, puisque vous pourriez être admissible à plus d’un programme d’aide financière."
    ],
    "buttons": {
      "check": "Vérifier mon admissibilité",
      "cancel": "Cancel"
    }
  }
}
</i18n>
