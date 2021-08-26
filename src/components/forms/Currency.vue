<template>
  <input type="number" v-model="output" placeholder="$0" class="input" :max="max" @focus="focus()" v-if="focused" />
  <input type="text" v-model="rendered" placeholder="$0" class="input" @blur="blur()" v-else />
</template>
<script>
export default {
  props: ['value', 'max'],
  data() {
    return {
      focused: false,
      rendered: '$0',
      output: 0
    }
  },
  mounted() {
    this.rendered = `$${this.value}`
    this.output = this.value
  },
  methods: {
    focus() {
      this.focused = true
    },
    blur() {
      this.focused = false
      this.output = this.rendered.replaceAll('$', '')
      this.$emit('input', this.output)
    }
  },
  watch: {
    rendered(to, from) {
      if (to.length==0) {
        this.rendered = '$'
      } else {
        var value = parseInt(to.replace('$', ''))
        if (value>this.max) {
          this.rendered = `$${this.max}`
        }
      }
    }
  }
}
</script>