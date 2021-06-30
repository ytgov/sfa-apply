<template>
  <ValidationProvider rules="required"  v-slot="{ errors }"  tag="span">
    <v-menu
      v-model="dobmenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="innerValue"
          label="Date of Birth"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="innerValue"
        @input="dobmenu = false"
      ></v-date-picker>
    </v-menu>
    <span class="error">{{errors[0]}}</span>
  </ValidationProvider>
</template>


<script>
import { ValidationProvider } from "vee-validate";

// https://codesandbox.io/s/vue-template-lldw2?from-embed=&file=/src/components/TextInput.vue

export default {
  name: "DateSelector",
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
    rules: {
      type: [Object, String],
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: null,
      default: ""
    }
  },
  data: () => ({
    innerValue: "",
    dobmenu: false
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
}
</script>