<template>
  <div>
    <v-alert
      v-for="(alert, index) in alerts"
      v-bind:key="index"
      :type="alert.type"
      dismissible
    >
      {{ alert.text }}
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      alerts: 'alert/getAlerts'
    })
  },
  methods: {
    ...mapActions({
      clearAlerts: 'alert/clearAlerts'
    })
  },
  mounted () {
    this.clearAlerts()
  }
}
</script>
