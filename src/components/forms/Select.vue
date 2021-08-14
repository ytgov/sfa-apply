<template>
  <div class="select">
    <select :name="name" v-model="selected">
      <option value="">- SELECT -</option>
      <option v-for="o in options" :selected="(selected == (o||o.value)) ? 'selected' : ''">
        {{o.text||o}} 
      </option>
    </select>
  </div>
</template>


<script>

export default {
  props: ["name", "options", "value"],
  $_veeValidate: {
    // value getter
    value () {
      return this.selected;
    },
    // name getter
    name () {
      return this.name;
    }
  },
  data() {
    return {
      selected: ''
    }
  },
  mounted() {
    this.selected = this.value 
  },

  watch: {
    selected() {
      this.$emit('input', this.selected)
    }
  }
}
</script>


<style lang="scss" scoped>
.select {
  margin-bottom: 50px;
  margin-top: 50px;

  > select {
    background: #eee;
    color: #333;
    border: solid 1px rgba(0,0,0,0.8);
    padding: 0.5rem 1rem;
    border-radius: 5px;
     font-size: 20px;
  }      
}

</style>