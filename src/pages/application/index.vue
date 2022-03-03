<template>
	<v-container fluid>
		<article data-section="application-process" v-if="false">
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

		<h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
		<p>
			<strong>Must read the terms to continue.</strong> Collection of your personal information is required to set up your account on the Student Financial Assistance System (SFAS) and to submit and process your application(s).  We will use your personal information to determine your eligibility for funding programs in accordance with the Occupational Training Act, Student Financial Assistance Act (Yukon), the Canada Student Financial Assistance Act and respective regulations, policies and guidelines. Your information may also be used and disclosed for the administration of the SFAS.  The collection, use and disclosure of your personal information is done under the authority of Yukon’s Access to Information and Protection of Privacy (ATIPP) Act and is managed in accordance with the ATIPP Act. If you have any questions about the collection of this information, contact the Student Financial Assistance office at 867-667-5929.
		</p>

		<TermsWrapper v-model="profile.atipp.read_terms" :value="profile.atipp.read_terms">
      <ATIPP  />
    </TermsWrapper>

    <BlackoutNotice ref="blackout" />
   
    <div class="buttons mt-14" v-if="valid">
	    <div class="text-left">
	      <v-btn class="back" color="hollow" @click="cancel()"  x-large>
	        <span>Disagree</span>
	      </v-btn>
	    </div>
	    <div class="text-center">
	    </div>
	    <div class="text-right">
	      <v-btn :to="next" class="continue" color="primary" v-if="next" x-large>
	        <span>Agree & Continue</span>
	      </v-btn>
	    </div>
	  </div>
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
import Buttons from '~/components/forms/Buttons.vue';
import TermsWrapper from '~/components/terms/wrapper.vue';
import ATIPP from '~/components/terms/atipp.vue';
import BlackoutNotice from '~/components/utils/BlackoutNotice.vue';


export default {
  components: {
    Buttons,
    TermsWrapper,
    ATIPP,
    BlackoutNotice
  },
  head (){
    return {
      title: 'Yukon Student Financial Portal - Application'
    }
  },
  computed: {
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        return this.$store.commit('profile/SET', values)
      }
    },
    valid() {
      var is_valid = !!this.profile.atipp.read_terms
      return is_valid
    },
    next() {
    	return '/application/personal-information/tombstone'
    }
  },
  mounted() {
  	this.profile.atipp.read_terms = false
  },
  methods: {
  	cancel() {
  		var self = this;
  		this.$refs.blackout.open({
    		text: 'Disagree?',
    		message: 'Disagreeing with the ATIPP Collection Statement will cancel your application.',
    		options: [
    			{
    				text: 'No, Agree and continue',
    				callback: () => {
    					return '/application/personal-information/tombstone'
    				}
    			},
    			{
    				text: 'Yes, Disagree and cancel',
    				callback: () => {
    					self.$router.go(-1)
    				}
    			}
    		]
    	})
  	}
  }
}
</script>


<i18n>
{
  "en": {
    "title": "ATIPP Collection Statement"
  },
  "fr": {
    "title": "ATIPP Collection Statement"
  }
}
</i18n>


<style lang="scss" scoped>
article {
	display: flex;
	> nav {
		width: 30%;
		> div {
			padding: 0.5rem 2rem;
			padding-left: 0 !important;
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
		border-left: solid 1px rgba(0,0,0,0.1);
		padding-left: 4rem;

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
			article {
				display: block;
				pointer-events: all;
			}
		}
	}
}
</style>