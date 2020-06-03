<template>
  <v-container fluid>
    <v-row v-if="product" dense>
      <v-col cols="1"/>
      <v-col cols="3">
        <v-card class="d-inline-block mx-auto">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-img
                  height="600"
                  width="400"
                  :src="product.image"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="7">
        <v-card>
          <v-card-title>
            {{ product.title }}
            <HeartFavorite :product="product"/>
            <AdminEdit :to="{ name: 'admin_product', params: { op: 'edit', id: product.id }}"/>
          </v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="product.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">{{ product.rating }} ({{ product.ratingCount }})</div>
            </v-row>

            <div class="my-4 subtitle-1">
              {{ product.price | currencyFilter}}
            </div>

            <div>{{ product.description }}</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>
            {{ totalPriceByProduct()(product) | currencyFilter }} ({{ totalItemByProduct()(product)}})
          </v-card-title>

          <v-card-actions>
            <AddToCart :product="product"/>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="1"/>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { ProductModel } from '../../model/product-model'
import HeartFavorite from '../../components/button/HeartFavorite.vue'
import AddToCart from '../../components/button/AddToCart.vue'
import AdminEdit from '../../components/button/AdminEdit'

export default {
  data () {
    return {
      product: ProductModel
    }
  },
  components: {
    HeartFavorite,
    AddToCart,
    AdminEdit
  },
  methods: {
    ...mapActions({
      initializeProduct: 'product/initializeProduct'
    }),
    ...mapGetters({
      getProduct: 'product/getProduct',
      isProductInCart: 'cart/isProductInCart',
      isProductIsFavorite: 'favorite/isProductIsFavorite',
      totalItemByProduct: 'cart/totalItemByProduct',
      totalPriceByProduct: 'cart/totalPriceByProduct'
    }),
    ...mapMutations({
      addProductToCart: 'cart/addProduct',
      removeProductFromCart: 'cart/removeProduct',
      addOrRemoveProduct: 'favorite/addOrRemoveProduct'
    })
  },
  async mounted () {
    await this.initializeProduct(this.$route.params.id)
    this.product = this.getProduct()
  }
}
</script>
