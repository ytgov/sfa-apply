import { extend, localize } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";

const dictionary = {
  en: {
    ...en,
    messages: {

    },
  },
};


Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});


extend("notrequired", {
  getMessage(field, args) {
    return ``;
  },
  validate(value, args) {
    return true
  }
});


/* Phone Validation Object */
extend("phone", {
  getMessage(field, args) {
    return `The ${field} must be a valid phone number.`;
  },
  validate(value, args) {
    var parts = value.split('x')
    // Custom regex for a phone number 
    const PhoneRegex = /(\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/im;
    // Check for either of these to return true
    return PhoneRegex.test(parts[0].trim()) && [10, 11, 13].includes(parts[0].trim().match(/\d/g).length);
  }
});


extend("sin", {
  message: '',
  getMessage(field, args) {
    return this.message;
  },
  validate(input, args) {
    var valid = false; 
    var sin = input.toString()
    var digits = sin.split("")
    if (sin.length > 9) {
      this.message= `Invalid SIN Number: has more than maximum 9 digits.`
    } else if (sin.length > 0 && sin.length < 9) {
      this.message = `Invalid SIN Number: has less than the required 9 digits.`
    } else if (!sin.match(/^\d+$/)) {
      this.message = `Invalid SIN Number: contains invalid non-numeric characters`
    } else if (sin == "000000000") {
      this.message = `000000000 may be used only when SIN is unknown - please revalidate when SIN is available.`
    } else if (sin == "121212121") {
      this.message = `121212121 is a test sin and is valid.`
      valid = true;
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
      } else {
        this.message = `Invalid SIN Number: does not pass validation.`
      }
    }
    return valid
  }
});

extend("date", {
  message: 'Invalid Date',
  getMessage(field, args) {
    return this.message;
  },
  validate(value, args) {
    // Custom regex for a pho
    return (new Date(value)).getTime() > 0;
  }
});

/* Password Validation Object */
extend("password", {
  getMessage(field, args) {
    return `The ${field} must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.`;
  },
  validate(value, args) {
    // Custom regex for a phone number 
    console.log('Password', value)
    const PasswordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    // Check for either of these to return true
    return PasswordRegex.test(value)
  }
});

localize(dictionary);
