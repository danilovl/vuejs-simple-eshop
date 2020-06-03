import { AlertModel } from '@/model/alert-model'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Module, RootState } from '../type'
import { AlertState } from '@/store/type/alert'

const state: AlertState = {
  alerts: []
}

const getters: GetterTree<AlertState, RootState> = {
  getAlerts: function (state: AlertState): AlertModel[] {
    return state.alerts
  }
}

const mutations: MutationTree<AlertState> = {
  addAlert (state: AlertState, alert: AlertModel): void {
    state.alerts.push(alert)
  },
  clearAlerts (state: AlertState): void {
    state.alerts = []
  }
}

const actions: ActionTree<AlertState, RootState> = {
  addAlert (context: any, alert: AlertModel): void {
    context.commit('addAlert', alert)
  },
  clearAlerts (context: any): void {
    context.commit('clearAlerts')
  }
}

const Alert: Module<AlertState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default Alert
