<template>
	<v-container fluid>
		<article data-section="application-process">
			<nav>
				<div v-for="section, index in sections" :key="index">
					<nuxt-link :to="section.route">{{section.name}}</nuxt-link>
				</div>
			</nav>
			<section>
				<div>
					<v-card class="mb-12" color="lighten-1">
	        	<nuxt-child  :keep-alive-props="{ exclude: ['modal'] }" />
	        </v-card>
	      </div>
			</section>
		</article>
	</v-container>
</template>

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

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  head (){
    return {
      title: 'Yukon Student Financial Portal - Application',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ],
    }
  },
	data() {
		return {
			sections: [
				{
					name: 'Introduction',
					route: '/application'
				},
				{
					name: 'Studies',
					route: '/application/studies'
				},
				{
					name: 'Citizenship',
					route: '/application/citizenship'
				},
				{
					name: 'Scholarship',
					route: '/application/scholarship'
				},
				{
					name: 'Residence',
					route: '/application/residence'
				},
				{
					name: 'Designated Insitution',
					route: '/application/designated-institution'
				},
				{
					name: 'Yukon Exellence Award',
					route: '/application/yukon-excellence-award'
				},
				{
					name: 'ATIPP',
					route: '/application/atipp'
				},
				{
					name: 'Tombstone',
					route: '/application/personal-information/tombstone'
				},
				{
					name: 'Email',
					route: '/application/personal-information/email'
				},
				{
					name: 'Perminent Address',
					route: '/application/personal-information/address/perminent'
				},
				{
					name: 'Address At School',
					route: '/application/personal-information/address/while-at-school'
				},
				{
					name: 'Documents',
					route: '/application/documents'
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