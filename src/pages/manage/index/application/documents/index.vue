<template>
	<v-main>	
		<h1>Supporting Documents</h1>
		<p>
			Please upload the follofing supporting documents... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat a lorem ut ornare.
		</p>


		<div class="documents">
			<div v-for="doc in supporting">
				<div>{{doc.status}}</div>
				<div>{{doc.name}}</div>
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
      You cannot sumbit your application until all your documents are uploaded.
    </v-banner>

	</v-main>
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