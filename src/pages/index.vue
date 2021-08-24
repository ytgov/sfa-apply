<template>
  <v-container fluid>
    <h1>{{ $t('hello') }}  <span v-if="$auth.user">{{$auth.user.nickname}}</span></h1>
    <p>
    	{{ $t('welcome') }}
    </p>
    <p>&nbsp;</p>

    <v-card>
	    <h2>{{ $t("current.header") }}</h2>
	    	
	    <div class="applications" v-if="applications.length">
	    	<div v-for="application in applications">
		    	<div>
		    		{{application.date}}
		    	</div>
					<div>
						<strong>{{application.name}}</strong><br />
						{{application.status}}
					</div>
					<div>
						<nuxt-link to="/application">Continue</nuxt-link>
					</div>
				</div>
	    </div>


	    <div v-else>
	    	<p>{{ $t("current.none") }}</p>
	    	<p>
	    		<nuxt-link to="/application" class="btn">
		    		<v-btn color="primary" class="mr-5">
		          {{ $t("current.buttons.apply") }}
		        </v-btn>
		      </nuxt-link>
	    	</p>
	    </div>
	    <p>&nbsp;</p>
	     <p>
		  	<nuxt-link to="/application">
		  		<v-btn color="primary"  class="mr-5" x-large>
		  			Apply for Financial Assistance
		  		</v-btn>
		  	</nuxt-link> 
		  </p>
	  </v-card>

	
	  <p>&nbsp;</p>


	  <v-card>

    	<h2>{{ $t("past.header") }}</h2>
	    	
	    <div class="applications" v-if="past_applications.length">
	    	<div v-for="application in past_applications">
		    	<div>
		    		{{application.date}}
		    	</div>
					<div>
						<strong>{{application.name}}</strong><br />
						{{application.status}}
					</div>
					<div>
						<nuxt-link to="/application/details/01234">Details</nuxt-link>
					</div>
			
				</div>
	    </div>

	    <div v-else>
	    	<p>{{ $t("past.none") }}</p>
	    </div>
    </v-card>
  </v-container>
</template>

<i18n>
{
  "en": {
  	"hello": "Hello",
  	"welcome": "A welcome back message... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.",
    "no_past_applications": "There are no past applications.",
    "current": {
    	"header": "Current Applications",
    	"none": "There are no active applications.",
    	"buttons": {
    		"apply": "Apply for Financial Assistance"
    	}
    },
    "past": {
    	"header": "Past Applications",
    	"none": "There are no past applications."
    }
  },
  "fr": {
  	"hello": "Bonjour",
  	"welcome": "Un message de bienvenue... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.",
    "current": {
    	"header": "Applications actuelles",
    	"none": "Il n'y a pas d'applications actives.",
    	"buttons": {
    		"apply": "Demander une aide financière"
    	}
    },
    "past": {
    	"header": "Candidatures antérieures",
    	"none": "Il n'y a pas d'applications antérieures."
    }
  }
}
</i18n>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
	head() {
		return {
	    title: 'Home page - Dashboard',
	    meta: [
	      {
	        hid: 'description',
	        name: 'description',
	        content: 'Home page description'
	      }
	    ],
	  }
	},
	computed: {
		applications() {
			return this.$store.getters['applications/current']
		},
		past_applications() {
			return this.$store.getters['applications/past']
		}
	},
	mounted() {
		if (!this.$auth.loggedIn) {
			this.$router.push('/login')
		}
	}
}
</script>



<style lang="scss" scoped>
div.applications{
	margin-top: 2rem;
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
