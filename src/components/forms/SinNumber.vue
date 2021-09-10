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
    <div v-if="message">
      <p :class="(valid) ? 'valid' : 'error'">
        {{message}}
      </p>
    </div>
  </div>
</template>


<script>

function tab(evt) {
  $(':focus').next('input').focus(() => { $(this).select(); })

}

export default {
  props: ['value'],
  data() {
    return {
      message: false,
      valid: true,
      sin: ['', '', '']
    }
  },
  mounted() {
    if (this.value) {
      let value = String(this.value)
      this.sin = [value.slice(0,3), value.slice(3,6), value.slice(6,9)]
    }
  },
  watch: {
    sin(to, from) {
      var sin = this.sin.join("")
      if (sin.length==9) {
        if (this.validateSIN(sin)) {
          this.$emit('input', sin)
        }
      }
    }
  },
  methods: {
    handleTab(e) {
      let value = e.target.value;
      if (value.length==3) {
        if (e.target.nextElementSibling) {
          e.target.nextElementSibling.select()

        }
      }
    },
    validateSIN(sin) {  
      var valid = true; 

      if (sin.length == 0) {
        this.message = `Please enter a 9 digit Social Insurance Number.`
      } else if (sin.length > 9) {
        valid = false;
        this.message= `Invalid Number ${sin} has more than maximum 9 digits.`
      } else if (sin.length > 0 && sin.length < 9) {
        valid = false;
        this.message = `Invalid Number: ${sin} has less than the required 9 digits.`
      } else if (!sin.match(/^\d+$/)) {
        valid = false;
        this.message = `Invalid Number: ${sin} contains invalid non-numeric characters`
      } else if (sin == "000000000") {
        this.message = `000000000 may be used only when SIN is unknown - please revalidate when SIN is available.`
      } else {

        var checkdigit = sin.substr(8, 1);
        var double2 = parseInt(sin.substr(1, 1)) * 2;
        var double4 = parseInt(sin.substr(3, 1)) * 2;
        var double6 = parseInt(sin.substr(5, 1)) * 2;
        var double8 = parseInt(sin.substr(7, 1)) * 2;
        var num1 = double2.toString() + double4.toString() + double6.toString() + double8.toString();
        var digit1 = sin.substr(0, 1);
        var digit3 = sin.substr(2, 1);
        var digit5 = sin.substr(4, 1);
        var digit7 = sin.substr(6, 1);
        var num2 = digit1 + digit3 + digit5 + digit7;
        var crossadd1 = 0;
        var position = 0;
        for (position = 0; position < num1.length; position++) {
          crossadd1 = crossadd1 + parseInt(num1.substring(position, position + 1));
        }
        var crossadd2 = 0;
        for (position = 0; position < num2.length; position++) {
          crossadd2 = crossadd2 + parseInt(num2.substring(position, position + 1));
        }
        var checksum1 = crossadd1 + crossadd2;
        var checksum2;
        var checkdigitX;
        if (checksum1.toString().substring(checksum1.toString().length - 1) == "0") {
          checksum2 = checksum1;
          checkdigitX = '0';
        } else {
          checksum2 = (Math.ceil(checksum1 / 10.0) * 10.0);
          checkdigitX = parseFloat(checksum2 - checksum1).toString();
        }
        if (checkdigitX == checkdigit) {
          valid = true;
          this.message = `Valid Number: ${sin} is a valid SIN format.`
        } else {
          valid = false;
          this.message = `Invalid Number: ${sin} - check digit does not pass validation test.`
        }
      }
      this.valid = valid
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

  .error, .valid {
    margin-top: 1rem;
    padding: 1rem;
    color: #fff;
  }

  .valid {
    background: #00cc00;
  }

}

</style>