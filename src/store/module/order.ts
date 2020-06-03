import Axios, { AxiosResponse } from 'axios'
import Vue from 'vue'
import { OrderModel } from '@/model/order-model'
import { AlertModel } from '@/model/alert-model'
import AlertConstant from '@/constant/alert-constant'
import ApiConstant from '@/constant/api-constant'
import { OrderState } from '@/store/type/order'
import { Module, RootState } from '@/store/type'
import { ActionTree, MutationTree } from 'vuex'

const state: OrderState = {
  orders: []
}

const mutations: MutationTree<OrderState> = {
  setOrders (state: OrderState, data: any): void {
    state.orders = data
  },
  changeOrderProcessed (state: OrderState, order: OrderModel): void {
    Vue.set(order, 'processed', order.processed === null || !order.processed)
  }
}

const actions: ActionTree<OrderState, RootState> = {
  async storeOrder (context: any, order: OrderModel) {
    try {
      context.dispatch('loader/setLoading', true, { root: true })

      order.basket = context.rootState.cart.lines

      const response = await Axios.post(ApiConstant.ORDERS_URL, order).then(function (response: AxiosResponse) {
        setTimeout(function () {
          context.dispatch('loader/setLoading', false, { root: true })
        }, 500)

        return response
      })

      return response.data.id
    } catch (e) {
      context.dispatch(
        'alert/addAlert',
        new AlertModel(AlertConstant.ERROR, e.message),
        { root: true }
      )
    }
  },
  async getOrders (context: any) {
    context.commit('setOrders', (await context.rootGetters['auth/authenticatedAxios'].get(ApiConstant.ORDERS_URL)).data)
  },
  async updateOrder (context: any, order: OrderModel) {
    context.commit('changeOrderProcessed', order)
    await context.rootGetters['auth/authenticatedAxios'].put(`${ApiConstant.ORDERS_URL}/${order.id}`, order)
  }
}

const Order: Module<OrderState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default Order
