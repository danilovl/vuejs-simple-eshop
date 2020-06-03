<template>
  <v-card>
    <v-img
      :src="product.image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title v-text="product.title"></v-card-title>
    </v-img>

    <v-card-text class="text--primary">
      <v-card-title>
        {{ product.title }}
      </v-card-title>
      <v-card-text>
        <div class="product-text">
          {{ product.description | truncateFilter }}
        </div>
      </v-card-text>
    </v-card-text>

    <v-card-actions>
      <v-btn icon>
        <v-badge
          color="green"
          :content="product.price | currencyFilter"
        >
          <v-icon>mdi-currency-usd</v-icon>
        </v-badge>
      </v-btn>

      <v-btn icon class="ml-12">
        <v-badge
          color="green"
          :content="totalPriceByProduct()(product) | currencyFilter"
        >
          <v-icon>  mdi-basket</v-icon>
        </v-badge>
      </v-btn>
    </v-card-actions>
    <v-card-actions>
      <HeartFavorite :product="product"/>
      <AddToCart :product="product"/>
      <v-btn
        color="orange"
        icon
        :to="{ name: 'product_detail', params: { id: product.id }}"
      >
        <v-icon>
          mdi-page-next-outline
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { ProductModel } from '@/model/product-model'
import HeartFavorite from '@/components/button/HeartFavorite.vue'
import AddToCart from '@/components/button/AddToCart.vue'

export default {
  props: {
    product: {
      type: [ProductModel, Object],
      required: true
    }
  },
  methods: {
    ...mapGetters({
      isProductIsFavorite: 'favorite/isProductIsFavorite',
      totalItemByProduct: 'cart/totalItemByProduct',
      totalPriceByProduct: 'cart/totalPriceByProduct'
    }),
    ...mapMutations({
      addOrRemoveProduct: 'favorite/addOrRemoveProduct'
    })
  },
  components: {
    HeartFavorite,
    AddToCart
  }
}
</script>
