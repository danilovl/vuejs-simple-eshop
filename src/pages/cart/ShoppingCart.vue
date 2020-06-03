<template>
  <v-container fluid>
    <Empty v-if="lines.length === 0"/>
    <v-container v-else fluid>
      <v-simple-table fluid>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ 'text.quantity' | transFilter }}</th>
            <th class="text-left">{{ 'text.product' | transFilter }}</th>
            <th class="text-right">{{ 'text.price' | transFilter }}</th>
            <th class="text-right">{{ 'text.subtotal' | transFilter }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="lines.length === 0">
            <td colspan="4" class="text-center">
              {{ 'text.your_cart_is_empty' | transFilter }}
            </td>
          </tr>
          <cart-line v-for="line in lines" v-bind:key="line.product.id"
                     v-bind:line="line"
                     v-on:quantity="handleQuantityChange(line, $event)"
                     v-on:remove="remove"
          />
          </tbody>
          <tfoot v-if="lines.length > 0">
          <tr>
            <td colspan="3" class="text-right">Total:</td>
            <td class="text-right">
              {{ totalPrice | currencyFilter }}
            </td>
          </tr>
          </tfoot>
        </template>
      </v-simple-table>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-btn large
                   class="ma-2"
                   color="primary"
                   to="/"
            >
              {{ 'btn.continue_shopping' | transFilter }}
            </v-btn>

            <v-btn large
                   class="ma-2"
                   color="primary"
                   to="/order"
                   :disabled="lines.length === 0"
            >
              {{ 'btn.checkout' | transFilter }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import CartLine from '../../components/ShoppingCartLine'
import Empty from '../../components/Empty'

export default {
  components: {
    CartLine,
    Empty
  },
  computed: {
    ...mapState({ lines: state => state.cart.lines }),
    ...mapGetters({ totalPrice: 'cart/totalPrice' })
  },
  methods: {
    ...mapMutations({
      change: 'cart/changeQuantity',
      remove: 'cart/removeLine'
    }),
    handleQuantityChange (line, $event) {
      this.change({ line, quantity: $event })
    }
  }
}
</script>
