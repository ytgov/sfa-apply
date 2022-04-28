<template lang="html">
  <div>
    <ul class="tabs__header">
      <li v-for="tab in tabs" :key="tab.title">{{ tab.title }}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selectedIndex: 0, // the index of the selected tab,
        tabs: []         // all of the tabs
      }
    },
    created () {
      this.tabs = this.$children
    }
  }
</script>