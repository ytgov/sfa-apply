<template>
  <div class="control">
    <div class="slot">
      <label>{{label}}</label>
      <div class="birth-date">
        <span class="year">
          <input type="number" v-model="year" maxlength="4" />
          <small>Year</small>
        </span>
        <span class="month">
          <select v-model="month">
            <option :value="(index+1)" v-for="month, index in months">{{month.name}}</option>
          </select> 
          <small>Month</small>
        </span>
        <span class="day">
          <input type="number" v-model="day" maxlength="2" />
          <small>Day</small>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["label", "value"],
  $_veeValidate: {
    // value getter
    value () {
      return this.output
    },
    // name getter
    name () {
      return 'date';
    }
  },
  computed: {
    is_leapyear() {
      return (this.year % 100 === 0) ? (this.year % 400 === 0) : (this.year % 4 === 0);
    },
    output() {
      return moment(`${this.month} ${this.day} ${this.year}`).format("YYYY-MM-DD")
    }
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      months: [
        {
          name: "January",
          days: 31
        },
        {
          name: "February",
          days: (this.is_leapyear) ? 29 : 28
        },
        {
          name: "March",
          days: 31
        },
        {
          name: "April",
          days: 30
        },
        {
          name: "May",
          days: 31
        },
        {
          name: "June",
          days: 30
        },
        {
          name: "July",
          days: 31
        },
        {
          name: "August",
          days: 31
        },
        {
          name: "September",
          days: 30
        },
        {
          name: "October",
          days: 31
        },
        {
          name: "November",
          days: 30
        },
        {
          name: "December",
          days: 31
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(()=>{  
      if (this.value) {
        var timestamp = this.$options.filters.formatTimestamp(this.value)

        console.log('BIRTHDAY', this.value, timestamp)
        
        //if (isNaN(timestamp) == false) {
        if (timestamp) {
          this.year = new Date(timestamp).getFullYear()
          this.month = new Date(timestamp).getMonth()+1
          this.day = new Date(timestamp).getDate()
        } 
      }
      this.$emit('input', this.output)
    })
  },
  watch: {
    output(to, from) {
      this.$emit('input', this.output)
    },
    day(to, from) {
      if (this.day>this.months[this.month].days) {
        this.day = this.months[this.month].days 
      }
    }
  }
}
</script>


<style lang="scss" scoped>


div.control {
  margin: 1.25rem 0;
  div.birth-date {
    display: grid;
    grid-template-columns: 6fr 6fr 6fr;
    grid-gap: 1rem;
    input[type=text],
    input[type=number],
     select {
      width: 100%;
      background: #FFFFFF;
      border-radius: 3px;
      border: 1px solid #D4C7CF !important;
      padding: 0.5rem !important;
    }
  }
  .error, .valid {
    margin-top: 1rem;
    padding: 1rem;
  }
  .valid {
    background: #00cc00;
  }
}

</style>