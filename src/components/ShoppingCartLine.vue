<template>
    <tr>
        <td>
        <input type="number" class="form-control-sm"
                style="width:5em"
                v-bind:value="qvalue"
                v-on:input="sendChangeEvent"/>
        </td>
        <td>
          <router-link :to="{ name: 'product_detail', params: { id: line.product.id }}">
            {{ line.product.title }}
          </router-link>
        </td>
        <td class="text-right">
            {{ line.product.price | currencyFilter }}
        </td>
        <td class="text-right">
            {{ (line.quantity * line.product.price) | currencyFilter }}
        </td>
        <td class="text-center">
          <v-btn small color="error"
                 v-on:click="sendRemoveEvent">
            {{ 'btn.delete' | transFilter }}
          </v-btn>
        </td>
    </tr>
</template>
<script>
export default {
  props: {
    line: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      qvalue: this.line.quantity
    }
  },
  methods: {
    sendChangeEvent ($event) {
      if ($event.target.value > 0) {
        this.$emit('quantity', Number($event.target.value))
        this.qvalue = $event.target.value
      } else {
        this.$emit('quantity', 1)
        this.qvalue = 1
        $event.target.value = this.qvalue
      }
    },
    sendRemoveEvent () {
      this.$emit('remove', this.line)
    }
  }
}
</script>
