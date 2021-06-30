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

/* Phone Validation Object */
extend("phone", {
  getMessage(field, args) {
    return `The ${field} must be a valid phone number.`;
  },
  validate(value, args) {
    // Custom regex for a phone number 
    const PhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    // Check for either of these to return true
    return PhoneRegex.test(value) && [10, 11].includes(value.match(/\d/g).length);
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
