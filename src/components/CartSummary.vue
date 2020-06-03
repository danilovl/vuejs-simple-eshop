<template>
  <div>
    <router-link to="/cart" class="btn btn-sm bg-dark text-white"
       v-bind:disabled="itemCount === 0"
    >
      <v-btn icon>
        <v-badge
          color="green"
          :content="itemCount"
        >
          <v-icon>mdi-basket</v-icon>
        </v-badge>
      </v-btn>
    </router-link>
    <span v-if="itemCount > 0">
      {{ totalPrice | currencyFilter }}
     </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      itemCount: 'cart/itemCount',
      totalPrice: 'cart/totalPrice'
    })
  }
}
</script>
