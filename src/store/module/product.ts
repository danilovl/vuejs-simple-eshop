import { ProductModel } from '@/model/product-model'
import Axios, { AxiosResponse } from 'axios'
import { AlertModel } from '@/model/alert-model'
import AlertConstant from '@/constant/alert-constant'
import ApiConstant from '@/constant/api-constant'
import { Module, RootState } from '@/store/type'
import { ProductState } from '@/store/type/product'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

const state: ProductState = {
  product: null
}

const getters: GetterTree<ProductState, RootState> = {
  getProduct (state: any) {
    return state.product
  }
}

const mutations: MutationTree<ProductState> = {
  setProduct (state: any, product: ProductModel) {
    state.product = product
  }
}

const actions: ActionTree<ProductState, RootState> = {
  async initializeProduct (context: any, productId: number) {
    try {
      context.dispatch('loader/setLoading', true, { root: true })

      const url = `${ApiConstant.PRODUCTS_URL}/${productId}`
      const response = await Axios.get(url).then(function (response: AxiosResponse) {
        setTimeout(function () {
          context.dispatch('loader/setLoading', false, { root: true })
        }, 500)

        return response
      })

      const product = new ProductModel(
        response.data.id,
        response.data.title,
        response.data.description,
        response.data.price,
        response.data.rating,
        response.data.ratingCount,
        response.data.image
      )
      context.commit('setProduct', product)
    } catch (e) {
      context.dispatch(
        'alert/addAlert',
        new AlertModel(AlertConstant.ERROR, e.message),
        { root: true }
      )
    }

    context.dispatch('loader/setLoading', true, { root: true })
  }
}

const Product: Module<ProductState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default Product
