<template>
  <article v-if="is_open">
    <section>
      <span class="title" v-if="text">{{text}}</span>
      <section class="buttons">
        <slot></slot>
      </section>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      text: false,
      is_open: false
    }
  },
  methods: {
    close() {
      this.is_open = false
    },
    open(values) {
      var self = this
      this.is_open = true

      if (values.text) {
        this.text = values.text
      }

      if (values.timeout) {
        setTimeout(()=>{
          self.close()
        }, (values.timeout) ? 2000 : 0) 
      }
    }
  }
}
</script>


<style lang="scss" scoped>
article {
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255,255,255,0.9);

  > section {
    > span.title {
      font-size: 8em;
      font-weight: 100;
      color: #000;
      text-transform: uppercase;
    }
  }

}
</style>

