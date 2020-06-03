import { LocaleState } from '@/store/type/locale'
import { Module, RootState } from '@/store/type'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

const state: LocaleState = {
  locale: 'en',
  locales: {
    en: 'English',
    ru: 'Russian'
  }
}

const getters: GetterTree<LocaleState, RootState> = {
  getLocale: function (state: LocaleState): string {
    return state.locale
  },
  getLocaleLabel: function (state: LocaleState): string {
    return state.locales[state.locale]
  },
  getLocales: function (state: LocaleState) {
    return state.locales
  },
  getLocalesSelect: function (state: LocaleState) {
    const locales = state.locales
    return Object.keys(locales).map(function (key) {
      return {
        text: locales[key],
        value: key
      }
    })
  }
}

const mutations: MutationTree<LocaleState> = {
  setLocale (state: LocaleState, locale: string): void {
    state.locale = locale
  }
}

const actions: ActionTree<LocaleState, RootState> = {
  async initializeLocale (context: any, store: any) {
    context.dispatch('loadLocale')

    store.watch(function (state: any): string {
      return state.locale
    },
    function () {
      return context.dispatch('storeLocale')
    }, { deep: true }
    )
  },
  loadLocale (context: any): void {
    const locale = localStorage.getItem('locale')
    if (locale !== null) {
      context.commit('setLocale', locale)
    }
  },
  storeLocale (context: any): void {
    localStorage.setItem('locale', context.state.locale)
  },
  setLocale (context: any, locale: string): void {
    context.commit('setLocale', locale)
  }
}

const Locale: Module<LocaleState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default Locale
