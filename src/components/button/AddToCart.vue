<template>
  <v-card-actions>
    <v-btn
      color="deep-purple lighten-2"
      icon
      @click="addProductToCart(product)"
    >
      <v-icon>
        mdi-cart-plus
      </v-icon>
    </v-btn>
    <v-btn
      v-if="isProductInCart()(product)"
      color="deep-purple lighten-2"
      icon
      @click="removeProductFromCart(product)"
    >
      <v-icon>
        mdi-cart-minus
      </v-icon>
    </v-btn>
  </v-card-actions>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { ProductModel } from '@/model/product-model'

export default {
  props: {
    product: {
      type: [ProductModel, Object, Function],
      required: true
    }
  },
  methods: {
    ...mapGetters({
      isProductInCart: 'cart/isProductInCart'
    }),
    ...mapMutations({
      addProductToCart: 'cart/addProduct',
      removeProductFromCart: 'cart/removeProduct'
    })
  }
}
</script>
