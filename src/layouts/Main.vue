<template>
  <v-app>
     <Toolbar/>
     <Alert/>
     <Loader/>

    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>

    <v-footer
      color="indigo"
    >
      <span class="white--text">&copy; {{ getYear }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from '../components/Toolbar'
import Alert from '../components/Alert'
import Loader from '../components/Loader'

export default {
  components: {
    Toolbar,
    Alert,
    Loader
  },
  computed: {
    getYear () {
      return new Date().getFullYear()
    }
  }
}
</script>
