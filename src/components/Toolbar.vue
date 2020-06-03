<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <router-link :to="{ name: 'home'}">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>
      <div class="language-flag mr-10">
        <ProductSearch/>
      </div>
      <div class="language-flag">
        <LanguageFlag/>
      </div>
      <HeartFavoriteSummary/>
      <CartSummary/>
      <ProfileBar/>
    </v-app-bar>
  </div>
</template>

<script>
import CartSummary from '../components/CartSummary'
import HeartFavoriteSummary from './button/HeartFavoriteSummary'
import ProfileBar from './ProfileBar'
import ProductSearch from './ProductSearch'
import LanguageFlag from './LanguageFlag'

export default {
  components: {
    CartSummary,
    HeartFavoriteSummary,
    ProfileBar,
    LanguageFlag,
    ProductSearch
  }
}
</script>

<style scoped>
  .language-flag {
    width: 100px;
    margin-top: 30px;
  }
</style>
