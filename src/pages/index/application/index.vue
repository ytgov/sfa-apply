<template>
	<v-container fluid>
		<v-stepper v-model="step">
	    <v-stepper-header>
	      <v-stepper-step v-for="section, index in sections"  :complete="step > index" :step="index" :key="index">
	        {{section.name}}
	      </v-stepper-step>

	      <v-divider></v-divider>
	    </v-stepper-header>

	    <v-stepper-items>
	      <v-stepper-content v-for="section, index in sections"  :complete="step > index" :step="index" :key="index">
	        <v-card class="mb-12" color="lighten-1">
	        	<Component :is="section.component" v-model="sections[index].valid" />
	        </v-card>

	        <v-btn color="primary" @click="step = (index+1)" v-if="sections[index].valid">
	          Continue
	        </v-btn>
	      </v-stepper-content>
	    </v-stepper-items>
	  </v-stepper>
	</v-container>
</template>

<i18n>
{
  "en": {
    "Citizenship": "Citizenship"
  },
  "fr": {
    "Citizenship": "Citizenship"
  }
}
</i18n>

<script>
import { mapMutations, mapGetters } from 'vuex'

import Citizenship from '@/pages/index/application/citizenship/index.vue'
import Scolorship from '@/pages/index/application/scolorship/index.vue'
import Residence from '@/pages/index/application/residence/index.vue'
import ExellenceAward from '@/pages/index/application/yukon-excellence-award/index.vue'
import Documents from '@/pages/index/application/documents/index.vue'


export default {
	components: {
		Citizenship,
		Scolorship,
		Documents
	},
	data() {
		return {
			step: 0,
			sections: [
				{
					name: 'Citizenship',
					component: Citizenship,
					valid: false
				},
				{
					name: 'Scolorship',
					component: Scolorship,
					valid: false
				},
				{
					name: 'Residence',
					component: Residence,
					valid: false
				},
				{
					name: 'Yukon Exellence Award',
					component: ExellenceAward,
					valid: false
				},
				{
					name: 'Documents',
					component: Documents,
					valid: false
				}	
			]
		}
	}
}
</script>


<style lang="scss" scoped>

.v-stepper__header, .v-sheet.v-stepper:not(.v-sheet--outlined), 
.v-sheet.v-card:not(.v-sheet--outlined)  {
  box-shadow: none !important;
}

div.v-card {
  padding: 0 !important;
}

</style>