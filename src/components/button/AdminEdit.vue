<template>
  <v-btn
    v-if="isAuthenticated"
    icon
    :to="to">
    <v-icon>
      mdi-pencil-outline
    </v-icon>
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    to: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  }
}
</script>
