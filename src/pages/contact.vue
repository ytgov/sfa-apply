<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h2 class="text-h4 mb-7">{{ $t('title') }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <h3 class="text-h5">{{ $t('headers.general') }}</h3>
        <p>
          <strong>{{ $t('labels.phone') }}</strong> 867-667-5929<br />
          <strong>{{ $t('labels.tollfree') }}</strong> 1-800-661-0408<br />
          <strong>{{ $t('labels.fax') }}</strong> 867-393-6249<br />
          <br />
          <strong>{{ $t('labels.email') }}</strong> 
          <a href="mailto:sfa@yukon.ca">sfa@yukon.ca</a>
        </p>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <h3 class="text-h5">{{ $t('headers.mailing') }}</h3>
        <p v-if="locale=='en'">
          Student Financial Assistance<br />
          Department of Education<br />
          Student Financial Assistance (E-13)<br />
          Box 2703<br />
          Whitehorse, Yukon, Y1A 2C6
        </p>
        <p v-else>
          Aide financière aux étudiants<br />
          Ministère de l'Éducation<br />
          Gouvernement du Yukon<br />
          C.P. 2703<br />
          Whitehorse (Yukon)  Y1A 2C6
        </p>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <h3 class="text-h5">{{ $t('headers.office') }}</h3>
        <p>
          1000 Lewes Ave. Boulevard in Whitehorse, Yukon. Our hours are Monday to Friday from 8 a.m. to 4:30 p.m.<br />
 
          <a href="https://goo.gl/maps/TiN1QZtEbAXYuChh9" target="_blank" v-if="false">View Map</a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n>
{
  "en": {
    "title": "Contact Us",
    "headers": {
      "general": "General Inquiries",
      "mailing": "Mailing Address",
      "office": "Office Address"
    },
    "labels": {
      "phone": "Phone:",
      "tollfree": "Toll Free (In Yukon):",
      "fax": "Fax:",
      "email": "Email:"
    }
  },
  "fr": {
    "title": "Pour nous contacter",
    "headers": {
      "general": "Renseignements généraux",
      "mailing": "Adresse postale",
      "office": "Adresse de bureau"
    },
    "labels": {
      "phone": "Téléphone :",
      "tollfree": "Sans frais (au Yukon) :",
      "fax": "Télécopieur :",
      "email": "Courriel :"
    }
  }
}
</i18n>

<script>
export default {
  middleware: 'no-auth',
  head() {
    return {
      title: 'Yukon Student Financial Portal - Contact'
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    }
  }
}
</script>



