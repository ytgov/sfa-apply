<template>
  <v-container fluid>

  	<v-banner icon="mdi-cash-register">
      You have started an application that has not been submitted.
      <p>
      	<nuxt-link to="/manage/application">Continue to application</nuxt-link>
      </p>
    </v-banner>


    <h1>Hello Robert</h1>
    <p>
    	A welcome back message... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.
    </p>

    <v-card>
	    <h2>Current Applications</h2>
	    	
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
	    	<p>There are no active applications.</p>
	    	<p>
	    		<nuxt-link to="/manage/application">
		    		<v-btn color="primary" class="mr-5">
		          Apply for Financial Assistance
		        </v-btn>
		      </nuxt-link>
	    	</p>
	    </div>
	  </v-card>


	  <v-card>

    	<h2>Past Applications</h2>
	    	
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
	    	<p>There are no past applications.</p>
	    </div>
    </v-card>
  </v-container>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
	data() {
		return {
			applications: [],
			past_applications: []
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
