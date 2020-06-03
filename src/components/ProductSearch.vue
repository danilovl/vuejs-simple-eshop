<template>
  <div>
    <v-text-field
      v-model="searchTerm"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      searchTerm: this.getSearchTerm()
    }
  },
  methods: {
    ...mapGetters({
      getSearchTerm: 'products/getSearchTerm'
    }),
    ...mapActions({
      setSearchTerm: 'products/setSearchTerm'
    })
  },
  watch: {
    async searchTerm (searchTerm) {
      await this.setSearchTerm(searchTerm)
    }
  }
}
</script>
