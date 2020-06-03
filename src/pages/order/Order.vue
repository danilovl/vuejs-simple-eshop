<template>
  <v-container fluid>
    <v-row no-gutters class="mb-10">
      <v-col
        md="6"
        offset-md="3"
      >
        <v-card class="mx-auto" width="100%">
          <v-card-title>
            <div class="text-center">
              {{ 'text.order_form' | transFilter }}
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        md="6"
        offset-md="3"
      >
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            :label="'form.name' | transFilter"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          />
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            :label="'form.e_mail' | transFilter"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
          <v-text-field
            v-model="city"
            :error-messages="cityErrors"
            :label="'form.city' | transFilter"
            :counter="20"
            required
            @input="$v.city.$touch()"
            @blur="$v.city.$touch()"
          />
          <v-text-field
            v-model="address"
            :error-messages="addressErrors"
            :label="'form.address' | transFilter"
            :counter="20"
            required
            @input="$v.address.$touch()"
            @blur="$v.address.$touch()"
          />
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            :label="'form.do_you_agree' | transFilter"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          />

          <v-btn class="mr-4" @click="submitOrder">
            {{ 'btn.send_order' | transFilter }}
          </v-btn>
          <v-btn @click="clear">
            {{ 'btn.delete' | transFilter }}
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { OrderModel } from '../../model/order-model'

export default {
  data: () => ({
    name: '',
    email: '',
    city: '',
    address: '',
    checkbox: false
  }),
  mixins: [validationMixin],
  validations: {
    name: {
      required,
      maxLength: maxLength(10)
    },
    email: {
      required,
      email
    },
    city: {
      required,
      maxLength: maxLength(50)
    },
    address: {
      required,
      maxLength: maxLength(100)
    },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },
  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) {
        return errors
      }
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')

      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) {
        return errors
      }
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')

      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')

      return errors
    },
    cityErrors () {
      const errors = []
      if (!this.$v.city.$dirty) {
        return errors
      }
      !this.$v.city.maxLength && errors.push('City must be at most 150 characters long')
      !this.$v.city.required && errors.push('City is required.')

      return errors
    },
    addressErrors () {
      const errors = []
      if (!this.$v.address.$dirty) {
        return errors
      }

      !this.$v.address.maxLength && errors.push('Address must be at most 10 characters long')
      !this.$v.address.required && errors.push('Address is required.')

      return errors
    }
  },
  methods: {
    ...mapActions({
      storeOrder: 'order/storeOrder',
      clearCart: 'cart/clearCartData'
    }),
    async submitOrder () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const order = new OrderModel(
          this.name,
          this.email,
          this.city,
          this.address,
          null,
          null
        )

        await this.storeOrder(order)
        this.clearCart()
        await this.$router.push('/order-thanks')
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.city = ''
      this.address = ''
      this.checkbox = false
    }
  }
}
</script>
