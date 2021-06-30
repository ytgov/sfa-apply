<template>
  <ValidationProvider tag="span" v-slot="{ errors }">
    <v-text-field
      :name="name"
      :type="type"
      :label="label"
      v-model="innerValue"
      :required="required"
      :rules="rules[rule]"
      :error-messages="errors"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

// https://codesandbox.io/s/vue-template-lldw2?from-embed=&file=/src/components/TextInput.vue

export default {
  name: "TextInput",
  components: {
    ValidationProvider
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: String,
      default: ""
    },
    rule: {
      type: [String],
      default: ""
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return [
          "url",
          "text",
          "password",
          "tel",
          "search",
          "number",
          "email"
        ].includes(value);
      }
    },
    value: {
      type: null,
      default: ""
    }
  },
  $_veeValidate: {
    // value getter
    value () {
      return this.value;
    },
    // name getter
    name () {
      return this.name;
    }
  },
  data: () => ({
    innerValue: "",
    rules: {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }
  }),
  computed: {
    hasValue() {
      return !!this.innerValue;
    }
  },
  watch: {
    innerValue(value) {
      this.$emit("input", value);
    },
    value(val) {
      if (val !== this.innerValue) {
        this.innerValue = val;
      }
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
