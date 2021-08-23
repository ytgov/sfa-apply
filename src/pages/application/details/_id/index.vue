<template>
  <v-container fluid>
    <h2>2020/2021 - Yukon College </h2>
    <p>
      Submitted - 2020/06/30
    </p>

    <h3>Funding Sources</h3>

    <div class="sources" v-if="sources.length">
      <div v-for="source in sources">
        <div>{{source.date}}</div>
        <div>
          <strong>{{source.name[locale]}}</strong><br />
          <small>Application Under Review</small>
        </div>
        <div>
          
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{ $t("sources.none") }}</p>
    </div>
    <p>&nbsp;</p>
    <h3>Supporting Documents</h3>


    <div class="supporting_documents" v-if="supporting_documents.length">
      <div v-for="sd in supporting_documents">

        <div>
          {{sd.date}}
        </div>
        <div>
          <strong>{{sd.name[locale]}}</strong><br />
          <small>{{sd.status}}</small>
        </div>
        <div>

        </div>
      </div>
    </div>
     <div v-else>
      <p>{{ $t("sd.none") }}</p>
      <p>
        <nuxt-link to="/application" class="btn">
          <v-btn color="primary" class="mr-5">
            {{ $t("sd.buttons.apply") }}
          </v-btn>
        </nuxt-link>
      </p>
    </div>
  </v-container>
</template>




<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      sources: 'documents/list',
      supporting_documents: 'documents/list'
    }),
    locale() {
      return this.$i18n.locale
    },
    application() {

    }
  }
}
</script>


<i18n>
{
  "en": {
    "buttons": {
      "continue": "Continue"
    }
  },
  "fr": {
    "buttons": {
      "continue": "Continue"
    }
  }
}
</i18n>


<style lang="scss" scoped>
div.sources, div.supporting_documents{
  margin-top: 1rem;
  > div {
    display: flex;
    align-items: center;


    padding: 0.5rem 0;


    &:nth-child(odd) {
      background: #eee;
    }

    &:nth-child(odd) {
      background: #eee;
    }
    
    > div {
      width: 100%;
      padding: 1rem 2rem;
      &:last-of-type {
        text-align: right;
      }
    }
  }
}
</style>
