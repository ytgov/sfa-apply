<template>
  <v-container fluid>
    <h2 class="text-h4 mb-7">{{ $t('hello') }}  <span v-if="$auth.user">{{$auth.user.nickname}}</span></h2>
    <p>
    	{{ $t('welcome') }}
    </p>

    <v-card v-if="!eligibility" style="width: 600px;">
			<p>
				Short welcome message for first time users... These trees are so much fun. 
			</p>
			<p>
				A quick intro on what you can do here... I get started on them and I have a hard time stopping. 
			</p>
			<p>
				Gentle CTA to get them started on an application... a tree cannot be straight if it has a crooked trunk.
    	</p>
    	<p class="buttons">
    		<v-btn  to="/eligibility" color="primary"  class="mr-5" x-large>
    			{{ $t("current.buttons.apply") }}
    		</v-btn>
    	</p>
    </v-card>

    <v-card v-if="eligibility">
	    <h3 class="text-h5">{{ $t("current.header") }}</h3>
	    	
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
						<v-btn to="/application" color="secondary">Continue</v-btn>
					</div>
				</div>
	    </div>
	    <div v-else>
	    	<p>{{ $t("current.none") }}</p>
	    </div>
	
	    <p class="buttons">
	  		<v-btn to="/eligibility" color="primary"  class="mr-5" x-large>
	  			{{ $t("current.buttons.apply") }}
	  		</v-btn>
		  </p>
	  </v-card>

	  <v-card v-if="eligibility">
    	<h3 class="text-h5">{{ $t("past.header") }}</h3>
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
						<v-btn color="secondary" to="/application/details/01234">Details</v-btn>
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
  	"hello": "Hello, ",
  	"welcome": "Yukon students are encouraged to apply for available funding programs online. By using this online tool, students have the option to submit an application or review funding that has been awarded in the past. If you are planning to complete and submit an application, make sure to have all required documents to finish your application.",
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
  	"hello": "Bonjour, ",
  	"welcome": "Yukon students are encouraged to apply for available funding programs online. By using this online tool, students have the option to submit an application or review funding that has been awarded in the past. If you are planning to complete and submit an application, make sure to have all required documents to finish your application.",
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
	    title: 'Home page - Dashboard'
	  }
	},
	computed: {
		...mapGetters({
			student: 'student/list'
		}),
		applications() {
			return this.$store.getters['applications/current']
		},
		past_applications() {
			return this.$store.getters['applications/past']
		}
	},
	data() {
		return {
			eligibility: true
		}
	},
	mounted() {
		if (!this.$auth.loggedIn) {
			this.$router.push('/login')
		} else if (!this.$store.getters['eligibility/status'] && !this.$route.path.includes('/eligibility')) {
			//this.eligibility = false
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

		border-top: solid 1px #eee;
		&:last-of-type {
			border-bottom: solid 1px #eee;
		}

		> div {
			width: 100%;
			padding: 1rem 2rem;
			&:last-of-type {
				text-align: right;
			}
		}

		@media only screen and (max-width: 768px) {
			display: block;
			> div {
				padding: 0.25rem 0; 
				text-align: left;
				&:last-of-type {
					text-align: left;
				}
			}
		}
	}


}

.v-card {
	margin-top: 3rem;
}

p.buttons {
	margin-top: 2rem;
}
</style>
