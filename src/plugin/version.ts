import _Vue from 'vue'

export default {
  install: function (Vue: typeof _Vue, options?: any): void {
    const { version } = options
    Vue.prototype.$version = () => console.log(`Demo application version ${version}`)
  }
}
