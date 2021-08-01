<template>
	<v-container fluid>
		<article data-section="application-process">
			<nav>
				<div v-for="section, index in sections" :key="index">
					<a @click="step=index" v-if="(step>index)">{{section.name}}</a>
					<span :class="(step==index) ? 'active' : ''" v-else>{{section.name}}</span>
				</div>
			</nav>
			<section>
				<div v-if="step==index" v-for="section, index in sections" :key="index">
					<v-card class="mb-12" color="lighten-1">
	        	<Component :is="section.component" v-model="sections[index].valid" />
	        </v-card>
	        <v-btn class="next" color="primary" @click="step = (index+1)" v-if="sections[index].valid">
	          Continue
	        </v-btn>
	      </div>
			</section>
		</article>
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


article {
	display: flex;
	> nav {
		width: 30%;
		> div {
			padding: 0.5rem 2rem;
			> span {
				font-size: 1em;
				&.active {
					font-weight: bold;
				}
			}
		}
	}
	> section {
		width: 70%;
		border-left: solid 1px rgba(0,0,0,0.3);
		padding-left: 3rem;
	}
}

</style>

<style lang="scss">


article[data-section='application-process'] {
	> section {
		> div {
			h2 {
				font-size: 2rem;
			}
		}
	}
}
</style>