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
              {{ (editMode ? 'btn.edit' : 'btn.create_product') | transFilter }}
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
            v-if="editMode"
            v-model="product.id"
            label="ID (Not Editable)"
            disabled
          />
          <v-text-field
            v-model="product.title"
            label="Title"
            :error-messages="titleErrors"
            @change="$v.product.title.$touch()"
            @blur="$v.product.title.$touch()"
          />
          <v-textarea
            v-model="product.description"
            label="Description"
            :error-messages="descriptionErrors"
            @change="$v.product.description.$touch()"
            @blur="$v.product.description.$touch()"
          />
          <v-text-field
            v-model="product.price"
            label="Price"
            :error-messages="priceErrors"
            @change="$v.product.price.$touch()"
            @blur="$v.product.price.$touch()"
          />
          <v-text-field
            v-model="product.image"
            label="Image"
            :error-messages="imageErrors"
            @change="$v.product.image.$touch()"
            @blur="$v.product.image.$touch()"
          />
          <v-img
            v-if="product.image"
            :src="product.image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          />
          <v-btn
            class="ma-2"
            outlined
            color="yellow"
            :to="{ name: 'admin_product_list'}"
          >
            {{ 'btn.cancel' | transFilter }}
          </v-btn>

          <v-btn
            class="ma-2"
            outlined
            color="green"
            v-if="editMode"
            :to="{ name: 'product_detail', params: { id: product.id }}"
          >
            {{ 'btn.detail' | transFilter }}
          </v-btn>

          <v-btn
            class="ma-2"
            outlined
            :color="themeClassButton"
            @click="handleSave"
          >
            {{ (editMode ? 'btn.save_changes' : 'btn.store_product') | transFilter }}
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, decimal } from 'vuelidate/lib/validators'

export default {
  data: function () {
    return {
      product: {}
    }
  },
  mixins: [validationMixin],
  computed: {
    editMode () {
      return this.$route.params.op === 'edit'
    },
    themeClassButton () {
      return this.editMode ? 'red' : 'blue'
    },
    titleErrors () {
      const errors = []
      if (!this.$v.product.title.$dirty) {
        return errors
      }
      !this.$v.product.title.required && errors.push('Title is required.')

      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.product.description.$dirty) {
        return errors
      }
      !this.$v.product.description.required && errors.push('Description is required.')

      return errors
    },
    priceErrors () {
      const errors = []
      if (!this.$v.product.price.$dirty) {
        return errors
      }
      !this.$v.product.price.required && errors.push('Price is required.')
      !this.$v.product.price.decimal && errors.push('Price is number.')

      return errors
    },
    imageErrors () {
      const errors = []
      if (!this.$v.product.image.$dirty) {
        return errors
      }
      !this.$v.product.image.required && errors.push('Image is required.')

      return errors
    }
  },
  validations: {
    product: {
      title: {
        required
      },
      description: {
        required
      },
      price: {
        required,
        decimal
      },
      image: {
        required
      }
    }
  },
  methods: {
    ...mapActions({
      addProduct: 'products/addProduct',
      updateProduct: 'products/updateProduct',
      getProduct: 'products/getProduct'
    }),
    async handleSave () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.editMode) {
          await this.updateProduct(this.product)
        } else {
          await this.addProduct(this.product)
        }

        await this.$router.push('/admin/products')
      }
    }
  },
  async created () {
    if (this.editMode) {
      this.product = await this.getProduct(this.$route.params.id)
    }
  }
}
</script>
