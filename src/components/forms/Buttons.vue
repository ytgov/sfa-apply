<template>
  <div class="buttons mt-14">
    <div class="text-left">
      <v-btn class="back" color="hollow" @click="$router.go(-1)" v-if="back && valid" x-large>
        <span v-if="atipp">Disagree</span>
        <span v-else>Back</span>
      </v-btn>
    </div>
    <div class="text-center">
      <a @click="save" v-if="valid && save">
        Save
      </a>
      <a @click="cancel" v-if="cancel">
        Cancel
      </a>
    </div>
    <div class="text-right">
      <v-btn :to="next" class="continue" color="primary" v-if="valid && next" x-large>
        <span v-if="atipp">Agree & Continue</span><span v-else>Continue</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['valid', 'next', 'back', 'save', 'cancel', "atipp"]
}  
</script>
