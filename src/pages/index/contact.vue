<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>{{ $t('title') }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>{{ $t('headers.general') }}</h2>
        <p>
          <strong>Phone:</strong> 867-667-5929<br />
          <strong>Toll Free (In Yukon):</strong> 1-800-661-0408<br />
          <strong>Fax:</strong> 867-667-8555<br />
          <br />
          <strong>Email:</strong> <a href="mailto:sfa@gov.yk.ca">sfa@gov.yk.ca</a>
        </p>
      </v-col>
      <v-col>
        <h2>{{ $t('headers.mailing') }}</h2>
        <p>
          Student Financial Assistance<br />
          Department of Education<br />
          Government of Yukon<br />
          Box 2703<br />
          Whitehorse, Yukon, Y1A 2C6
        </p>
        </p>
      </v-col>
      <v-col>
        <h2>{{ $t('headers.office') }}</h2>
        <p>
          1000 Lewes Ave. Boulevard (E-1)<br />
          Y1A 2C6<br /> 
          Whitehorse<br />
          <br />
          <a href="https://goo.gl/maps/TiN1QZtEbAXYuChh9" target="_blank">View Map</a>
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
    }
  },
  "fr": {
    
  }
}
</i18n>

<script>
export default {
  
}
</script>



