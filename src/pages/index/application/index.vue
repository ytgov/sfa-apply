<template>
	<v-container fluid>
		<v-stepper v-model="e1">
	    <v-stepper-header>
	      <v-stepper-step
	        :complete="e1 > 1"
	        step="1"
	      >
	        Citizenship
	      </v-stepper-step>

	      <v-divider></v-divider>

	      <v-stepper-step
	        :complete="e1 > 2"
	        step="2"
	      >
	        Scolorship
	      </v-stepper-step>

	      <v-divider></v-divider>

	      <v-stepper-step step="3">
	        Name of step 3
	      </v-stepper-step>

	      <v-divider></v-divider>

	      <v-stepper-step step="4">
	        Name of step 4
	      </v-stepper-step>
	    </v-stepper-header>

	    <v-stepper-items>
	      <v-stepper-content step="1">
	        <v-card
	          class="mb-12"
	          color="lighten-1"
	        >
	        	<Citizenship v-model="citizenship" />
	        </v-card>

	        <v-btn
	          color="primary"
	          @click="e1 = 2"
	        >
	          Continue
	        </v-btn>

	        <v-btn text>
	          Cancel
	        </v-btn>
	      </v-stepper-content>

	      <v-stepper-content step="2">
	        <v-card
	          class="mb-12"
	          color="lighten-1"
	        >
	        	<Scolorship />
	        </v-card>

	        <v-btn
	          color="primary"
	          @click="e1 = 3"
	        >
	          Continue
	        </v-btn>

	        <v-btn text>
	          Cancel
	        </v-btn>
	      </v-stepper-content>

	      <v-stepper-content step="3">
	        <v-card
	          class="mb-12"
	          color="grey lighten-1"
	          height="200px"
	        ></v-card>

	        <v-btn
	          color="primary"
	          @click="e1 = 1"
	        >
	          Continue
	        </v-btn>

	        <v-btn text>
	          Cancel
	        </v-btn>
	      </v-stepper-content>
	      <v-stepper-content step="4">
	        <v-card
	          class="mb-12"
	          color="grey lighten-1"
	          height="200px"
	        ></v-card>

	        <v-btn
	          color="primary"
	          @click="e1 = 1"
	        >
	          Continue
	        </v-btn>

	        <v-btn text>
	          Cancel
	        </v-btn>
	      </v-stepper-content>
	    </v-stepper-items>
	  </v-stepper>
	</v-container>
</template>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "fr": {
    "hello": "Hello i18n in SFC!"
  }
}
</i18n>

<script>
import { mapMutations, mapGetters } from 'vuex'

import Citizenship from '@/pages/index/application/citizenship/index.vue'
import Scolorship from '@/pages/index/application/scolorship/index.vue'
import Documents from '@/pages/index/application/documents/index.vue'


export default {
	components: {
		Citizenship,
		Scolorship,
		Documents
	},
	data() {
		return {
			e1: 1
		}
	}
}
</script>