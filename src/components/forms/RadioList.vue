<template>
  <div class="radio">
    <span v-for="radio in options" @click="select(radio.value)" :class="(selected_radio == radio.value) ? 'active' : ''">
      <span></span> {{radio.text}} 
    </span>
  </div>
</template>


<script>

export default {
  props: ["name", "options", "value"],
  $_veeValidate: {
    // value getter
    value () {
      return this.selected_radio;
    },
    // name getter
    name () {
      return this.name;
    }
  },
  data() {
    return {
      selected_radio: []
    }
  },
  mounted() {
    this.selected_radio = this.value 
  },
  watch:{
    selected_radio(from, to) {
      this.$emit('input', this.selected_radio)
    }
  },
  methods: {
    select(radio) {
      this.selected_radio = radio
    }
  }
}
</script>


<style lang="scss" scoped>
  .radio {
    margin-bottom: 50px;
    margin-top: 50px;
    > span {
      display: block;
      margin: 20px 10px;
      margin-right: 35px;
      margin-left: 0;

      font-size: 20px;


      > span {
        position: relative;
        bottom: -6px;
        display: inline-block;
        background: rgba(0,0,0,0.1);
        color: rgba(255,255,255,0.8);
        border: solid 1px rgba(255,255,255,0.8);
        width: 25px;
        height: 25px;
        margin-right: 10px;

        border-radius: 100%;
      }

      &.active {
        > span {
          background: rgba(255,255,255,0.8);
        }
      }
    }
      
  }

</style>