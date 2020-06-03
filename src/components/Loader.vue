<template>
  <div class="text-center">
    <v-overlay :value="isLoading" :absolute="isAbsolute">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoading: 'loader/isLoading',
      isAbsolute: 'loader/isAbsolute'
    })
  }
}
</script>
