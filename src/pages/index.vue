<template>
  <v-container fluid>
    <h1>{{ $t('hello') }}  <span v-if="$auth.user">{{$auth.user.nickname}}</span></h1>
    <p>
    	{{ $t('welcome') }}
    </p>

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
					<div v-if="application.status=='Verified'">
						<a>Delete</a>
					</div>
					<div v-else-if="application.status=='Uploading'">
						<a>Cancel</a>
					</div>
					<div v-else>
						<a>Upload</a>
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
	  </v-card>


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
					<div v-if="application.status=='Verified'">
						<a>Delete</a>
					</div>
					<div v-else-if="application.status=='Uploading'">
						<a>Cancel</a>
					</div>
					<div v-else>
						<a>Upload</a>
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
	data() {
		return {
			applications: [],
			past_applications: []
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
	> div {
		display: flex;
		border: solid 2px #000;
		margin-top: 1rem;
		margin-bottom: 1rem;
		> div {
			width: 100%;
			padding: 2rem;
			&:last-of-type {
				text-align: right;
			}
		}
	}
}
</style>
