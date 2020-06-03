<template>
  <v-chip
    v-if="!isAuthenticated"
    class="ma-2"
    color="white"
    outlined
    pill
    to="/login"
  >
    {{ 'btn.login' | transFilter }}
    <v-icon right>mdi-login</v-icon>
  </v-chip>

  <v-chip
    v-else
    class="ma-2"
    color="white"
    outlined
    pill
  >
    {{ 'text.user_account' | transFilter }}
    <v-btn
      icon
      :to="{ name: 'admin'}"
    >
      <v-icon>
        mdi-account-outline
      </v-icon>
    </v-btn>
    <v-icon right
            @click="logoutUser"
    >
      mdi-logout
    </v-icon>
  </v-chip>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    async logoutUser () {
      this.logout()
      await this.$router.push('/')
    }
  }
}
</script>
