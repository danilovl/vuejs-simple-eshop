<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions({
      initializeAuthenticate: 'auth/initializeAuthenticate',
      initializeCart: 'cart/initializeCart',
      initializeFavorite: 'favorite/initializeFavorite',
      initializeLocale: 'locale/initializeLocale'
    })
  },
  async created () {
    this.initializeLocale(this.$store)
    await this.initializeAuthenticate()
    this.initializeCart(this.$store)
    this.initializeFavorite(this.$store)

    this.$version()
  }
}
</script>
