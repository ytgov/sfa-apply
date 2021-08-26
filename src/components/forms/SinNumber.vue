<template>
  <div class="control">
    <div class="slot">
      <label>Sin Number</label>
      <div class="sin-holder">
        <input type="text" v-model="sin[0]" placeholder="xxx" maxlength="3" @keyup="handleTab" /> 
        <input type="text" v-model="sin[1]" placeholder="xxx" maxlength="3" @keyup="handleTab" /> 
        <input type="text" v-model="sin[2]" placeholder="xxx" maxlength="3" @keyup="handleTab" />
      </div>
    </div>
  </div>
</template>


<script>

function tab(evt) {
  $(':focus').next('input').focus()
}

export default {
  props: ['value'],
  data() {
    return {
      sin: ['', '', '']
    }
  },
  mounted() {
    if (this.value) {
      this.sin = this.value.split("-")
    }
  },
  watch: {
    sin(to, from) {
      this.$emit('input', this.sin.join("-"))
    }
  },
  methods: {
    handleTab(e) {
      // Grab input's value
      let value = e.target.value;

      if (value.length==3) {
        console.log(typeof e.target.nextElementSibling)
        if (e.target.nextElementSibling) {
          e.target.nextElementSibling.focus()
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>

div.control {
  margin: 1.25rem 0;
  div.sin-holder {
    display: grid;
    grid-template-columns: 6fr 6fr 6fr;
    grid-gap: 1rem;
    input[type=text] {
      width: 100%;
      background: #FFFFFF;
      border-radius: 3px;
      border: 1px solid #D4C7CF !important;
      padding: 0.5rem !important;
    }
  }
}

</style>