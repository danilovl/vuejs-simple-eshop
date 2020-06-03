<template>
  <div>
    <template>
      <v-container fluid>
        <v-row v-if="loading" dense>
          <v-col cols="2"/>
          <v-col cols="8">
            <v-row>
              <v-col
                v-for="n in 12"
                :key="n"
                cols="4"
              >
                <ProductCardLoader/>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2"/>
          <v-col cols="1"/>
        </v-row>
        <v-row v-else dense>
          <v-col cols="2"/>
          <v-col cols="8">
            <v-row>
              <v-col
                v-for="(product,index) in products"
                     :key="index"
                     cols="4"
              >
                 <ProductCard :product="product"/>
              </v-col>
              <v-col cols="1"/>
            </v-row>
          </v-col>
          <v-col cols="2"/>
        </v-row>
      </v-container>
      <PageControl/>
      <Empty v-if="!isProducts"/>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductCard from '../components/ProductCard.vue'
import ProductCardLoader from '@/components/ProductCardLoader.vue'
import PageControl from '../components/PageControls.vue'
import Empty from '../components/Empty.vue'

export default {
  data () {
    return {
      loading: true,
      loadingMore: false
    }
  },
  components: {
    ProductCardLoader,
    PageControl,
    ProductCard,
    Empty
  },
  computed: {
    ...mapGetters({
      products: 'products/processedCurrentPageProducts'
    }),
    isProducts: function () {
      if (this.products === undefined) {
        return false
      }

      return this.products.length > 0
    }
  },
  methods: {
    ...mapActions({
      getData: 'products/getData',
      initializeCart: 'cart/initializeCart'
    })
  },
  async created () {
    await this.getData()
    this.loading = false
    this.initializeCart(this.$store)
  }
}
</script>
