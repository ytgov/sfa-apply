<template>
	<v-container fluid>
    <h2>{{ $t('title') }}</h2>
    <p>
      {{ $t('excerpt') }}
    </p>

		<div class="documents">
			<div v-for="doc in supporting">
				<div>{{doc.status}}</div>
				<div><strong>{{doc.name}}</strong></div>
				<div v-if="doc.status=='Verified'">
					<a>Delete</a>
				</div>
				<div v-else-if="doc.status=='Uploading'">
					<a>Cancel</a>
				</div>
				<div v-else>
					<a>Upload</a>
				</div>
			</div>
		</div>


    <v-banner icon="mdi-alert-circle" class="problem mt-4">
      {{ $t('error') }}
    </v-banner>

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
    "error": "You cannot sumbit your application until all your documents are uploaded."
  },
  "fr": {
    "title": "Supporting Documents",
    "excerpt": "Please upload the follofing supporting documents... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.",
    "error": "You cannot sumbit your application until all your documents are uploaded."
  }
}
</i18n>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
	components: {

	},
	computed: {
		...mapGetters({
			documents: 'documents/list'
		})
	},
	data() {
		return {
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
		}
	}
}
</script>