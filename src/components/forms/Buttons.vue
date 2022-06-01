<template>
  <div class="buttons mt-14">
    <div class="text-left">
      <v-btn class="back" color="hollow" @click="$router.go(-1)" v-if="back && valid" x-large>
        <span v-if="atipp">{{ $t('disagree') }}</span>
        <span v-else>{{ $t('back') }}</span>
      </v-btn>
    </div>
    <div class="text-center">
      <a @click="save" v-if="valid && save">
        {{ $t('save') }}
      </a>
      <a @click="cancel" v-if="cancel">
        {{ $t('cancel') }}
      </a>
    </div>
    <div class="text-right">
      <v-btn :to="next" class="continue" color="primary" v-if="valid && next" x-large>
        <span v-if="atipp">{{ $t('agreecontinue') }}</span><span v-else>{{ $t('continue') }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['valid', 'next', 'back', 'save', 'cancel', "atipp"]
}  
</script>

<i18n>
{
  "en": {
    "disagree": "Disagree",
    "back": "Back",
    "save": "Save",
    "cancel": "Cancel",
    "agreecontinue": "Agree & Continue",
    "continue": "Continue"
  },
  "fr": {
    "disagree": "Disagree",
    "back": "Back",
    "save": "Save",
    "cancel": "Cancel",
    "agreecontinue": "Agree & Continue",
    "continue": "Continuer"
  }
}
</i18n>
