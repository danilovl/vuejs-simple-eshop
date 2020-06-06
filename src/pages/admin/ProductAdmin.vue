<template>
  <v-container fluid>
    <v-btn class="ma-2"
           outlined
           color="indigo"
           to="/admin/products/create"
    >
      {{ 'btn.create_product' | transFilter }}
    </v-btn>
    <v-simple-table fluid la>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">{{ 'text.id' | transFilter }}</th>
          <th class="text-left">{{ 'text.title' | transFilter }}</th>
          <th class="text-left">{{ 'text.description' | transFilter }}</th>
          <th class="text-left">{{ 'text.price' | transFilter }}</th>
          <th class="text-left">{{ 'text.rating' | transFilter }}</th>
          <th class="text-left">{{ 'text.rating_count' | transFilter }}</th>
          <th class="text-left"> {{ 'text.image' | transFilter }}</th>
          <th class="text-left"> {{ 'text.action' | transFilter }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" v-bind:key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.description | truncateFilter(300) }}</td>
          <td>{{ product.price | currencyFilter }}</td>
          <td>{{ product.rating }}</td>
          <td>{{ product.ratingCount }}</td>
          <td>
            <v-img
              :src="product.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="50px"
              width="50px"
            />
          </td>
          <td class="text-center product-admin-action">
            <v-btn class="ma-2"
                   outlined
                   color="yellow"
                   v-on:click="handleEdit(product)"
            >
              {{ 'btn.edit' | transFilter }}
            </v-btn>

            <v-btn
              class="ma-2"
              outlined
              color="green"
              :to="{ name: 'product_detail', params: { id: product.id }}"
            >
              {{ 'btn.detail' | transFilter }}
            </v-btn>

            <v-btn class="ma-2"
                   outlined
                   color="red"
                   v-on:click="removeProduct(product)"
            >
              {{ 'btn.delete' | transFilter }}
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <PageControl/>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageControl from '../../components/PageControls.vue'

export default {
  components: {
    PageControl
  },
  computed: {
    ...mapGetters({
      products: 'products/processedCurrentPageProducts'
    })
  },
  methods: {
    ...mapActions({
      getData: 'products/getData',
      removeProduct: 'products/removeProduct'
    }),
    handleEdit (product) {
      this.$router.push(`/admin/products/edit/${product.id}`)
    }
  },
  async created () {
    await this.getData()
  }
}
</script>
