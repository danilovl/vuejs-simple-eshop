<template>
  <v-btn icon>
    <v-icon :color="isProductIsFavorite()(product) ? 'red' : 'green'"
            @click="addOrRemoveProduct(product)">
      mdi-heart
    </v-icon>
  </v-btn>
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
      isProductIsFavorite: 'favorite/isProductIsFavorite'
    }),
    ...mapMutations({
      addOrRemoveProduct: 'favorite/addOrRemoveProduct'
    })
  }
}
</script>
