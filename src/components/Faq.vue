<template>
  <section data-section="faq">
    <header>
      <h2>FAQs</h2>
      <a href="/faq">More FAQ</a>
    </header>
    <section>
      <div v-for="faq,index in faqs" :class="(selected==index) ? 'open' : ''">
        <div class="question" @click="toggle(index)">
          {{faq.question}}
        </div>
        <div class="answer">
          {{faq.answer}}
        </div>
      </div>
    </section>
  </section>
</template>


<script> 
export default {
  props: ['faqs'],
  data() {
    return {  
      selected: false
    }
  },
  methods: {
    toggle(selected) {
      this.selected = selected
    }
  }
}
</script>

<style lang="scss" scoped>

section[data-section=faq] {
  width: 70%;
  > header {
    display: flex;
    padding: 1rem 0;
    > h2 {
      font-family: "Montserrat";
      font-size: 22px;
      color: #323232;
      letter-spacing: -0.3px;
      text-align: left;
      line-height: 24px;
    }
    > a {
      text-align: right;
    }
    > * {
      width: 100%;
    }
  }
  > section {
    > div {
      border-top: solid 1px #ccc;
      padding: 1rem 0;
      &:last-of-type {
        border-bottom: solid 1px #ccc;
      }
      > div {
        &.question {
          font-weight: bold;
          font-size: 18px;
          line-height: 1.8;
          &:hover {
            cursor: pointer;
          }
        }
        &.answer {
          height: 0;
          opacity: 0;
          font-size: 14px;
        }
      }

      &.open {
        > div.answer {
          opacity: 1;
          height: auto;
        }
      }
    }
  }
}
</style>
