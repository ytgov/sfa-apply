<template>
	<article data-layout="documents">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>
    <p>
      {{ $t('excerpt') }}
    </p>


    <section class="documents">
			<div v-for="doc in documents" v-if="doc.DESCRIPTION!=null">
				<div>
					<strong>{{doc.DESCRIPTION}}</strong><br />
					<a :href="doc.DOCUMENT_LOCATION" target="_blank">{{doc.DOCUMENT_LOCATION}}</a>
				</div>
				<div></div>
				
				<div v-if="['Verified', 'Vérifié'].includes(doc.status)">
					<a>{{ $t("buttons.delete") }}</a>
				</div>
				<div v-else-if="['Uploading', 'Téléchargement'].includes(doc.status)">
					<a>{{ $t("buttons.cancel") }}</a>
				</div>
				<div v-else>
					<v-btn color="secondary" :to="`/application/documents/upload/${doc.resource}`">
						{{ $t("buttons.upload") }}
					</v-btn>
				</div>
			</div>
		</section>


    <Buttons :valid="valid" :next="next" :back="true" />
	</article>
</template>



<script>
import { mapMutations, mapGetters } from 'vuex'
import Buttons from '~/components/forms/Buttons.vue';

export default {
	components: {
		Buttons
	},
	computed: {
		...mapGetters({
			documents: 'documents/list'
		}),
		locale() {
      return this.$i18n.locale
    },
    valid() {
    	return true
    },
    next() {
      return '/application/submit'
    }
	}
}
</script>


<style lang="scss" scoped>



[data-layout="documents"] {
  max-width: 1024px;
  margin: 4rem 0;
  > section.documents{
		> div {
			display: flex;
			margin-top: 1rem;
			margin-bottom: 1rem;

			border-top: solid 1px #eee;
			&:last-of-type {
				border-bottom: solid 1px #eee;
			}

			> div {
				width: 100%;
				padding: 2rem 0;
				&:nth-of-type(1) {
					min-width: 20%;
				}
				&:nth-of-type(2) {
					width: auto;
					white-space: nowrap;
					text-align: left;
					padding: 2rem;
				}
				&:last-of-type {
					text-align: right;
					min-width: 20%;
				}
			}
		}
	}

  @media only screen and (max-width: 1024px) {
    max-width: 100%;
    margin: 2rem;
    > section.documents {
    	> div {
    		display: grid;
    		grid-template-columns: 6fr 6fr;
    		padding: 1rem 0;
    		> div {
    			min-width: 100%;
    			padding: 0.25rem 0 !important;

    			&:nth-of-type(1) {
						grid-row: 1;
						grid-column: 1;
						
					}
					&:nth-of-type(2) {
						grid-row: 2;
						grid-column: 1;
						text-align: left;
					}
					&:last-of-type {
						grid-row: 2;
						grid-column: 2;
						
						text-align: right;
					}
    		}
    	}
    }
  }
  @media only screen and (max-width: 1024px) {
    margin: 1rem;
  }

}

</style>


<i18n>
{
  "en": {
    "title": "Supporting documents",
    "excerpt": "Please upload the following supporting documents... If a document is uploaded incorrectly, you will receive a notification to resubmit your documents.",
    "error": "You cannot submit your application until all your documents are uploaded.",
    "buttons": {
    	"delete": "Delete",
    	"cancel": "Cancel",
    	"upload": "Upload"
    }
  },
  "fr": {
    "title": "Documents justificatifs",
    "excerpt": "Veuillez télécharger les pièces justificatives suivantes... Si un document est téléchargé de manière incorrecte, vous recevrez une notification pour soumettre à nouveau vos documents.",
    "error": "Vous ne pouvez pas soumettre votre demande tant que tous vos documents ne sont pas téléchargés.",
    "buttons": {
    	"delete": "Supprimer",
    	"cancel": "Annuler",
    	"upload": "Télécharger"
    }
  }
}
</i18n>
