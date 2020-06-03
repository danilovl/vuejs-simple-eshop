<template>
  <v-container fluid>
    <v-row>
      <div class="col-4 bg-secondary p-2">
        <v-btn class="ma-2"
               outlined
               color="green"
               :to="{ name: 'admin'}"
        >
          {{ 'btn.admin' | transFilter }}
        </v-btn>
        <v-btn class="ma-2"
               outlined
               color="indigo"
               :to="{ name: 'admin_product_list'}"
        >
          {{ 'btn.products' | transFilter }}
        </v-btn>
        <v-btn class="ma-2"
               outlined
               color="indigo"
               :to="{ name: 'admin_order_list'}"
        >
          {{ 'btn.orders' | transFilter }}
        </v-btn>
      </div>
    </v-row>
    <v-row>
      <router-view/>
    </v-row>
  </v-container>
</template>
