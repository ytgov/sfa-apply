<template>
  <v-container fluid>
    <h2 class="text-h4 mb-7">Page not found</h2>
  
    <h2 class="text-h5 mb-5">Sorry, that page isn’t here.</h2>
    <p>
      You didn’t do anything wrong. We may have moved the page you're looking for somewhere else.
    </p>

    <br />

    <h2 class="text-h5 mb-5">Did you follow a link from here?</h2>
    <p>
      If you reached this page from another part of Yukon.ca, let us know so we can correct our mistake.
    </p>

     <br />

    <h2 class="text-h5 mb-5">Did you follow a link from another site?</h2>
    <p>
      Links from other sites can sometimes be old or misspelled. Let us know where you came from and we can try to contact the other site to fix the problem.
    </p>

     <br />

    <h2 class="text-h5 mb-5">Did you type the URL?</h2>
    <p>
      You may have typed the address (URL) wrong. Check to make sure you’ve got the exact right spelling or capitalization.
    </p>

     <br />

    <p>
      <NuxtLink to="/">&lt; Back to Home page</NuxtLink>
    </p>
  </v-container>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>