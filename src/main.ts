import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetifyPlugin from './plugin/vuetify'
import consolePlugin from './plugin/version'
import truncateFilter from './filter/truncate-filter'
import currencyFilter from './filter/currency-filter'
import transFilter from './filter/trans-filter'

Vue.config.productionTip = false

Vue.use(consolePlugin, {
  version: '1.0.0'
})

Vue.filter('truncateFilter', truncateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('transFilter', transFilter)

new Vue({
  router,
  store,
  vuetify: vuetifyPlugin,
  render: h => h(App)
}).$mount('#app')
