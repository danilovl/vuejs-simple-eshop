<template>
  <v-container fluid>
    <v-btn class="ma-2"
           outlined
           :color="showProcessed ? 'indigo' : 'red'"
           v-on:click="showProcessed = !showProcessed"
    >
      {{ (showProcessed ? 'btn.show_processed' : 'btn.show_not_processed') | transFilter }}
    </v-btn>
    <v-simple-table fluid la>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">{{ 'text.id' | transFilter }}</th>
          <th class="text-left">{{ 'text.name' | transFilter }}</th>
          <th class="text-left">{{ 'text.city' | transFilter }}</th>
          <th class="text-left">{{ 'text.address' | transFilter }}</th>
          <th class="text-left">{{ 'text.total' | transFilter }}</th>
          <th class="text-left">{{ 'text.action' | transFilter }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="o in displayOrders" v-bind:key="o.id">
          <td>{{ o.id }}</td>
          <td>{{ o.email }}</td>
          <td>{{ o.city }}</td>
          <td>{{ o.address }}</td>
          <td>{{ getTotal(o) | currencyFilter }}</td>
          <td>
            <v-btn class="ma-2"
                   outlined
                   :color="o.processed ? 'indigo' : 'red'"
                   v-on:click="processOrder(o)"
            >
              {{ (o.processed? 'btn.not_processed' : 'btn.processed') | transFilter }}
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data: () => ({
    showProcessed: false
  }),
  computed: {
    ...mapState({
      orders: function (state) {
        return state.order.orders
      }
    }),
    displayOrders () {
      const showProcessed = this.showProcessed
      return this.orders.filter(function (order) {
        return order.processed !== showProcessed
      })
    }
  },
  methods: {
    ...mapMutations({
      changeOrderProcessed: 'order/changeOrderProcessed'
    }),
    ...mapActions({
      getOrders: 'order/getOrders',
      updateOrder: 'order/updateOrder'
    }),
    getTotal (order) {
      if (order.basket.length > 0) {
        return order.basket.reduce((total, line) =>
          total + (line.quantity * line.product.price), 0)
      } else {
        return 0
      }
    },
    processOrder (order) {
      this.updateOrder(order)
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
