import { LoaderState } from '@/store/type/loader'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { AlertState } from '@/store/type/alert'
import { Module, RootState } from '@/store/type'

const state: LoaderState = {
  loading: false,
  absolute: false
}

const getters: GetterTree<LoaderState, RootState> = {
  isLoading: function (state: LoaderState): boolean {
    return state.loading
  },
  isAbsolute: function (state: LoaderState): boolean {
    return state.absolute
  }
}

const mutations: MutationTree<LoaderState> = {
  setLoading (state: LoaderState, isLoad: boolean): void {
    state.loading = isLoad
  }
}

const actions: ActionTree<LoaderState, RootState> = {
  setLoading (context: any, isLoad: boolean): void {
    context.commit('setLoading', isLoad)
  }
}

const Loader: Module<LoaderState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default Loader
