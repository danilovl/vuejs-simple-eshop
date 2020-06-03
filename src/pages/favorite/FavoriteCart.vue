<template>
  <div>
    <template>
      <v-container fluid>
        <v-row dense v-if="products.length > 0">
          <v-col cols="2"/>
          <v-col cols="8">
            <v-btn v-if="products.length > 0"
                   class="ma-2"
                   outlined
                   color="indigo"
                   @click="clearFavorite"
            >
              {{ 'btn.clear_favorite' | transFilter }}
            </v-btn>
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
        <v-row v-else
               class="mb-6"
               justify="center"
               no-gutters
        >
          <v-banner two-line>
            <v-avatar
              slot="icon"
              color="deep-purple accent-4"
              size="150"
            >
              <v-icon color="white">
                mdi-delete-empty
              </v-icon>
            </v-avatar>
            {{ 'text.empty' | transFilter }}
          </v-banner>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  computed: {
    ...mapGetters({ products: 'favorite/getFavorites' })
  },
  methods: {
    ...mapActions({ clearFavorite: 'favorite/clearFavoriteData' })
  }
}
</script>
