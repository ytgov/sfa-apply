<template>
  <section>  
    <section>
       <section>
        <ValidationProvider name="address_zip_postal_code" rules="required" tag="span" v-slot="{ errors, valid }">
           <v-text-field
            v-model="address.zip_postal_code"
            label="Enter the zip or postal code"
            :error-messages="errors"
            :success="valid"
            @blur="geocode()"
          />
        </ValidationProvider>
      </section>
      <section v-if="address.zip_postal_code">
        <ValidationProvider name="address_first" rules="required" tag="span" v-slot="{ errors, valid }">
          <v-text-field
            v-model="address.first"
            label="Enter Street Address"
            :error-messages="errors"
            :success="valid"
            @blur="geocode()"
          />
        </ValidationProvider>
      </section>
      <section v-if="address.zip_postal_code">
        <v-text-field
          v-model="address.second"
          label="Second Line"
        />
      </section>
      <section v-if="address.zip_postal_code">
        <div style="padding-top: 17px;">
          <strong style="font-weight: bolder;">{{city}}, {{region}}</strong>
        </div>
      </section>
    </section>
  </section>
</template>


<script>
import { ValidationProvider } from 'vee-validate';

export default {
	props: ['value'],
  components: {
    ValidationProvider
  },
  $_veeValidate: {
    // value getter
    value () {
      return this.full_location
    },
    // name getter
    name () {
      return 'address';
    }
  },
	data() {
		return {
			address: {
				first: '',
        second: '',
        zip_postal_code: ''
			},
      full_location: false
		}
	},
  computed: {
    city() {
      var city = _.find(this.full_location.address_components, (o)=> { return o.types.indexOf('locality')>=0 })
      return (city) ? city.long_name : '--'
    },
    region() {
      var region = _.find(this.full_location.address_components, (o)=> { return o.types.indexOf('administrative_area_level_1')>=0 })
      return (region) ? region.long_name : '--'
    }
  },
  watch: {
    full_location(to, from) {
      this.$emit('input', this.full_location.formatted_address)
    }
  },
  methods: {
    geocode() {
      var self = this;
      var query = { address: `${this.address.first}, ${this.address.zip_postal_code}` }

      console.log("Searching Address", query)

      try {
        var geocoder = new this.$google.maps.Geocoder();
        geocoder.geocode(query, function (result, status) {
          if (status!='OK') {
            console.log("Geocode was not successful for the following reason: ", result, status);
          } else {
            var full_location = result[0];
            var latlng = result[0].geometry.location;
            self.full_location = full_location;
          }
        });
      } catch(error) {
        console.log("Can't use geocode")
      }
    }
  }
}
</script>