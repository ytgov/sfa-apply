<template>
	<v-container fluid>
    <h2>{{ $t('title') }}</h2>
    <p>
      {{ $t('excerpt') }}
    </p>

		<div class="documents">
			<div v-for="doc in documents[locale].supporting">
				<div>{{doc.status}}</div>
				<div><strong>{{doc.name}}</strong></div>
				<div v-if="['Verified', 'Vérifié'].includes(doc.status)">
					<a>{{ $t("buttons.delete") }}</a>
				</div>
				<div v-else-if="['Uploading', 'Téléchargement'].includes(doc.status)">
					<a>{{ $t("buttons.cancel") }}</a>
				</div>
				<div v-else>
					<a>{{ $t("buttons.upload") }}</a>
				</div>
			</div>
		</div>

    <v-banner icon="mdi-alert-circle" class="problem mt-4">
      {{ $t('error') }}
    </v-banner>


    <Buttons :valid="valid" :next="next" />

	</v-container>
</template>

<style lang="scss" scoped>
div.documents{
	> div {
		display: flex;
		border: solid 2px #000;
		margin-top: 1rem;
		margin-bottom: 1rem;
		> div {
			width: 100%;
			padding: 2rem;
			&:nth-of-type(2) {
				width: 150%;
			}
			&:last-of-type {
				text-align: right;
			}
		}
	}
}
</style>

<i18n>
{
  "en": {
    "title": "Supporting Documents",
    "excerpt": "Please upload the follofing supporting documents... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.",
    "error": "You cannot sumbit your application until all your documents are uploaded.",
    "buttons": {
    	"delete": "Delete",
    	"cancel": "Cancel",
    	"upload": "Upload"
    }
  },
  "fr": {
    "title": "Documents justificatifs",
    "excerpt": "Veuillez télécharger les pièces justificatives suivantes... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.",
    "error": "Vous ne pouvez pas soumettre votre demande tant que tous vos documents ne sont pas téléchargés.",
    "buttons": {
    	"delete": "Supprimer",
    	"cancel": "Annuler",
    	"upload": "Télécharger"
    }
  }
}
</i18n>

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
	},
	data() {
		return {
			documents: {
				en: {
					supporting: [
						{
							name: 'High School Transcript',
							status: 'Verified'
						},
						{
							name: 'Letter of Acceptance',
							status: 'Uploading'
						},
						{
							name: 'Spouse Income Tax (2018)',
							status: 'Pending'
						},
						{
							name: 'Student Income Tax (2018)',
							status: 'Pending'
						}

					]
				},
				fr: {
					supporting: [
						{
							name: 'Relevé de notes du secondaire',
							status: 'Vérifié'
						},
						{
							name: 'Lettre d\'acceptation',
							status: 'Téléchargement'
						},
						{
							name: 'Impôt sur le revenu du conjoint (2018)',
							status: 'En attente'
						},
						{
							name: 'Impôt sur le revenu des étudiants (2018)',
							status: 'En attente'
						}

					]
				}
			}
			
		}
	}
}
</script>