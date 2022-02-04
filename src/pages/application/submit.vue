<template>
	<v-container fluid v-if="eligibility">
		<h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
		<p>
			{{ $t('excerpt') }}
		</p>



		<v-card>
			<section class="header">
				<h3>Funding Sources</h3>
			</section>
			<section class="content">
				<ul>
					<li></li>
				</ul>

				<p class="buttons">
		  		<v-btn to="/eligibility/review?revise=true" color="primary"  class="mr-5" x-large>
		  			{{ $t("buttons.edit") }}
		  		</v-btn>
			  </p>
			</section>
		</v-card>
		<v-card>
			<section class="header">
				<small>Section 1</small>
				<h3>Program Information</h3>
			</section>
			<section class="content" >

				<table>
					<tbody>
						<tr>
							<td>Institution</td>
							<td>{{eligibility.designated_institution.post_secondary_enrolled_in||'None'}}</td>
						</tr>
						<tr>
							<td>Campus</td>
							<td>{{eligibility.designated_institution.details.campus||'None'}}</td>
						</tr>
						<tr>
							<td>Name of Program</td>
							<td>{{eligibility.designated_institution.details.program_name||'None'}}</td>
						</tr>
						<tr>
							<td>Program Type</td>
							<td>{{eligibility.program.what_type_of_program||'None'}}</td>
						</tr>
						<tr>
							<td>Program Duration</td>
							<td>{{eligibility.designated_institution.details.duration_of_program||'None'}}</td>
						</tr>
						<tr>
							<td>Year of program you are entering</td>
							<td>{{eligibility.designated_institution.details.year_entering||'None'}}</td>
						</tr>
						<tr>
							<td>Is this a corespondence or distance learning program?</td>
							<td></td>
						</tr>
						<tr>
							<td>Start date of your classes</td>
							<td>{{eligibility.designated_institution.details.start_date_of_classes||'None'}}</td>
						</tr>
						<tr>
							<td>End date of your classes (including exams)</td>
							<td>{{eligibility.designated_institution.details.year_entering||'None'}}</td>
						</tr>
					</tbody>
				</table>


				<p class="buttons">
		  		<v-btn to="/eligibility/designated-institution?revise=true" color="primary"  class="mr-5" x-large>
		  			{{ $t("buttons.edit") }}
		  		</v-btn>
			  </p>
			</section>
		</v-card>


		<v-card>
			<section class="header">
				<small>Section 2</small>
				<h3>Residency Information</h3>
			</section>
			<section class="content">
				<br />

				<h4>Perminent Address:</h4>
        <AddressSelector v-model="profile.address.permanent" :value="profile.address.permanent" style="width:  70%" />

        <h4>Address While at School:</h4>
        <AddressSelector v-model="profile.address.at_school" :value="profile.address.at_school" style="width:  70%"/>

				<p class="buttons" v-if="false">
		  		<v-btn to="/application/personal-information/address/perminent?revise=true" color="primary"  class="mr-5" x-large>
		  			{{ $t("buttons.edit") }}
		  		</v-btn>
			  </p>
			</section>
		</v-card>

		 <Buttons :valid="valid" :next="next" back="true" />


	</v-container>
</template>


<style lang="scss" scoped>

section.accordian {
	> section {
		padding-bottom: 2rem;
	}
}

table {
	margin: 1rem 0;
	> tbody {
		> tr {
			> td {
				padding: 0.25rem 0;
				padding-right: 2rem;
				font-size: 0.8rem;

				&:nth-of-type(1) {
					font-weight: bold;
				}
			}
		}
	}
}

</style>

<i18n>
{
  "en": {
  	"title": "Review Application",
  	"excerpt": "Please review your application to ensure that it is correct. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis libero in sapien condimentum volutpat et vel purus. ",
  	"buttons": {
  		"edit": "Edit",
  		"continue": "Continue"
  	}
  },
  "fr": {
  	"title": "Review Application",
  	"excerpt": "Please review your application to ensure that it is correct. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis libero in sapien condimentum volutpat et vel purus. ",
  	"buttons": {
  		"edit": "Edit",
  		"continue": "Continue"
  	}
  }
}
</i18n>

<script>
import { mapMutations, mapGetters } from 'vuex'
import AddressSelector from "~/components/forms/AddressSelector.vue";
import Buttons from '~/components/forms/Buttons.vue';

export default {
	components: {
		AddressSelector,
		Buttons
	},
  computed: {
    ...mapGetters({
    	eligibility: 'eligibility/GET'
      //ap: 'applications/programs'
    }),
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        return this.$store.commit('profile/SET', values)
      }
    },
    perminent_addresses_updated() {
    	return this.profile.address.permanent
    },
    at_school_address_updated() {
    	return this.profile.address.at_school
    }
  },
  mounted() {
  	/*
  	this.$nexttick(()=>{
  		if (!this.eligibility) {
	  		this.$router.push(`/eligibility`)
	  	}
  	})
  	*/
  },
  methods: {
  	valid() {
      var is_valid = true
      return is_valid
    },
    next() {
      return '/application/documents'
    }
  },
  watch: {
  	perminent_addresses_updated(to, from) {
  		this.$store.commit('profile/SET', this.profile)
  	},
  	at_school_address_updated(to, from) {
  		this.$store.commit('profile/SET', this.profile)
  	}
  }
}
</script>