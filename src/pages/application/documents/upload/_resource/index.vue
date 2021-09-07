<template>
  <article data-layout="documents">
    <v-flex xs9 v-if="doc">
      <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
      <p>
        {{ $t('excerpt') }}
      </p>


      <h3>{{doc.name[locale]}}</h3>

      <file-upload :resource="resource" />

      <v-banner icon="mdi-alert-circle" class="problem mt-4">
        {{ $t('error') }}
      </v-banner>


      <Buttons :valid="valid" :next="next" :back="true" />
    </v-flex>
  </article>
</template>

<style lang="scss" scoped>

</style>


<script>
import FileUpload from '@/components/FileUpload.vue'

export default {
  components: {
    FileUpload
  },
  computed: {
    resource() {
      return this.$route.params.resource;
    },
    doc() {
      return this.$store.getters['documents/by_resource'](this.resource)
    },
    locale() {
      return this.$i18n.locale
    }
  },
  methods: {
    upload() {

    }
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Uploading Document",
    "excerpt": "Please upload the follofing supporting documents... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.",
    "error": "You cannot sumbit your application until all your documents are uploaded.",
    "buttons": {
      "delete": "Delete",
      "cancel": "Cancel",
      "upload": "Upload"
    }
  },
  "fr": {
    "title": "Documents justificatifs",
    "excerpt": "Veuillez télécharger les pièces justificatives suivantes... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.",
    "error": "Vous ne pouvez pas soumettre votre demande tant que tous vos documents ne sont pas téléchargés.",
    "buttons": {
      "delete": "Supprimer",
      "cancel": "Annuler",
      "upload": "Télécharger"
    }
  }
}
</i18n>