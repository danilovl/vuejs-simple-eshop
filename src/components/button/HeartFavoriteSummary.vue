<template>
  <div>
    <router-link to="/favorite" class="btn btn-sm bg-dark text-white"
       v-bind:disabled="itemCount === 0"
    >
      <v-btn icon>
        <v-badge
          color="green"
          :content="itemCount"
        >
          <v-icon>mdi-heart</v-icon>
        </v-badge>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      itemCount: 'favorite/itemCount'
    })
  }
}
</script>
