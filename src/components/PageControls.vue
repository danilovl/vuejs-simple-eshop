<template>
  <div class="text-center" v-if="pageCount > 0">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="pageCount"
              :total-visible="totalVisible"
            >
            </v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentPage: 'products/getCurrentPage',
      pageCount: 'products/pageCount',
      totalVisible: 'products/totalVisible'
    }),
    page: {
      get () {
        return this.$store.state.products.currentPage
      },
      set (page) {
        this.setCurrentPage(page)
      }
    }
  },
  methods: {
    ...mapActions({
      setCurrentPage: 'products/setCurrentPage'
    })
  }
}
</script>
