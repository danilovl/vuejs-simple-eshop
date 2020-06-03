<template>
  <v-select
    v-model="locale"
    :items="getLocalesSelect"
    :label="getLocaleLabel"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getLocaleLabel: 'locale/getLocaleLabel',
      getLocale: 'locale/getLocale',
      getLocalesSelect: 'locale/getLocalesSelect'
    }),
    locale: {
      get () {
        return this.$store.state.locale.locale
      },
      set (locale) {
        this.setLocale(locale)
      }
    }
  },
  methods: {
    ...mapActions({
      setLocale: 'locale/setLocale'
    })
  }
}
</script>
