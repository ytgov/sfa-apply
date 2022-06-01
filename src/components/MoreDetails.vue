<template>
  <div class="moredetails">
    <a @click="toggle()">{{ $t("more") }}</a>
    <div v-if="open">
      <div v-for="program, index in programs"  :key="index">{{program.name[locale]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["programs"],
  computed: {
    locale() {
      return this.$i18n.locale
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
}
</script>

<i18n>
{
  "en": {
    "more": "More Details"
  },
  "fr": {
    "more": "En savoir plus"
  }
}
</i18n>


<style lang="scss" scoped>
.moredetails {
  font-size: 0.7em;
  line-height: 1.8;
}
</style>