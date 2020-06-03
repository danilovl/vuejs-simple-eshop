import { ProductModel } from '@/model/product-model'
import Axios, { AxiosResponse } from 'axios'
import Vue from 'vue'
import { AlertModel } from '@/model/alert-model'
import AlertConstant from '@/constant/alert-constant'
import { PageModel } from '@/model/page-model'
import ApiConstant from '@/constant/api-constant'
import { ProductsState } from '@/store/type/products'
import { Module, RootState } from '@/store/type'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import transFilter from '@/filter/trans-filter'

const state: ProductsState = {
  currentPage: 1,
  pageSize: 6,
  totalVisible: 8,
  pages: [],
  serverPageCount: 0,
  showSearch: false,
  searchTerm: ''
}

const getters: GetterTree<ProductsState, RootState> = {
  getCurrentPage: function (state: ProductsState): number {
    console.log(state.currentPage)
    return state.currentPage
  },
  processedCurrentPageProducts: function (state: ProductsState): ProductModel[] {
    return state.pages[state.currentPage]
  },
  pageCount: function (state: ProductsState): number {
    return state.serverPageCount
  },
  totalVisible: function (state: ProductsState): number {
    return state.totalVisible
  },
  getSearchTerm: function (state: ProductsState): string {
    return state.searchTerm
  },
  productById: function (state: ProductsState) {
    return (id: number) => {
      for (const prop in state.pages) {
        return state.pages[prop].find(function (p: ProductModel): boolean {
          return p.id === id
        })
      }
    }
  }
}

const mutations: MutationTree<ProductsState> = {
  setCurrentPage (state: ProductsState, page: number) {
    state.currentPage = page
  },
  setPageCount (state: ProductsState, count: number) {
    state.serverPageCount = Math.ceil(Number(count) / state.pageSize)
  },
  addPage (state: ProductsState, page: PageModel) {
    for (let i = 0; i < page.pageCount; i++) {
      Vue.set(
        state.pages,
        page.currentPage + i,
        page.data.slice(i * state.pageSize, (i * state.pageSize) + state.pageSize)
      )
    }
  },
  addProduct (state: ProductsState, product: ProductModel): void {
    state.pages[state.currentPage].unshift(product)
  },
  updateProduct (state: ProductsState, product: ProductModel): void {
    Object.keys(state.pages).forEach(function (pageIndex: any) {
      const objects = state.pages[pageIndex]

      objects.forEach(function (key: any) {
        const p = objects[pageIndex]
        if (p.id === product.id) {
          Vue.set(objects, key, product)
        }
      })
    })
  },
  setSearchTerm (state: ProductsState, searchTerm: string): void {
    state.searchTerm = searchTerm
  },
  clearPages (state: ProductsState): void {
    state.pages = []
  }
}

const actions: ActionTree<ProductsState, RootState> = {
  async getData (context: any) {
    await context.dispatch('getPage', 1)
  },
  async getPage (context: any, getPageCount = 1) {
    let url = `${ApiConstant.PRODUCTS_URL}?_page=${context.state.currentPage}` +
      `&_limit=${context.state.pageSize * getPageCount}`

    if (context.state.searchTerm !== '') {
      url += `&q=${context.state.searchTerm}`
    }

    await context.dispatch('loader/setLoading', true, { root: true })

    const response = await Axios.get(url).then(function (response) {
      setTimeout(function () {
        context.dispatch('loader/setLoading', false, { root: true })
      }, 500)

      return response
    })
    context.commit('setPageCount', response.headers['x-total-count'])
    context.commit('addPage', new PageModel(
      context.state.currentPage,
      getPageCount,
      response.data
    ))
  },
  setCurrentPage (context: any, page: number) {
    context.commit('setCurrentPage', page)
    if (!context.state.pages[page]) {
      context.dispatch('getPage')
    }
  },
  async addProduct (context: any, product: ProductModel) {
    try {
      await context.dispatch('loader/setLoading', true, { root: true })

      await context.rootGetters['auth/authenticatedAxios']
        .post(ApiConstant.PRODUCTS_URL, product)
        .then(function (response: AxiosResponse) {
          setTimeout(function () {
            context.dispatch('loader/setLoading', false, { root: true })
          }, 500)

          return response.data
        })

      await context.dispatch(
        'alert/addAlert',
        new AlertModel(AlertConstant.SUCCESS, transFilter('alert.product_has_been_added')),
        { root: true }
      )

      context.commit('addProduct', product)
    } catch (e) {
      await context.dispatch(
        'alert/addAlert',
        new AlertModel(AlertConstant.ERROR, e.message),
        { root: true }
      )

      await context.dispatch('loader/setLoading', false, { root: true })

      throw e
    }
  },
  async removeProduct (context: any, product: ProductModel) {
    await context.dispatch('loader/setLoading', true, { root: true })

    try {
      await context.rootGetters['auth/authenticatedAxios']
        .delete(`${ApiConstant.PRODUCTS_URL}/${product.id}`)
        .then(function () {
          setTimeout(function () {
            context.dispatch('loader/setLoading', false, { root: true })
          }, 500)
        })

      await context.dispatch(
        'alert/addAlert',
        new AlertModel(AlertConstant.SUCCESS, transFilter('alert.product_has_been_removed')),
        { root: true }
      )
    } catch (e) {
      await context.dispatch(
        'alert/addAlert',
        new AlertModel(AlertConstant.ERROR, e.message),
        { root: true }
      )

      await context.dispatch('loader/setLoading', false, { root: true })

      throw e
    }
    context.commit('clearPages')
    await context.dispatch('getPage', 1)
  },
  async updateProduct (context: any, product: ProductModel) {
    try {
      await context.dispatch('loader/setLoading', true, { root: true })

      await context.rootGetters['auth/authenticatedAxios']
        .put(`${ApiConstant.PRODUCTS_URL}/${product.id}`, product)
        .then(function () {
          setTimeout(function () {
            context.dispatch('loader/setLoading', false, { root: true })
          }, 500)
        })

      await context.dispatch(
        'alert/addAlert',
        new AlertModel(AlertConstant.SUCCESS, transFilter('alert.product_has_been_updated')),
        { root: true }
      )
    } catch (e) {
      await context.dispatch(
        'alert/addAlert',
        new AlertModel(AlertConstant.ERROR, e.message),
        { root: true }
      )

      await context.dispatch('loader/setLoading', false, { root: true })

      throw e
    }
    context.commit('updateProduct', product)
  },
  async getProduct (context: any, id: number) {
    const response = await Axios.get(`${ApiConstant.PRODUCTS_URL}/${id}`)

    return new ProductModel(
      response.data.id,
      response.data.title,
      response.data.description,
      response.data.price,
      response.data.rating,
      response.data.ratingCount,
      response.data.image
    )
  },
  async setSearchTerm (context: any, searchTerm: string) {
    context.commit('clearPages')
    context.commit('setSearchTerm', searchTerm)
    context.commit('setCurrentPage', 1)
    await context.dispatch('getPage')
  }
}

const Products: Module<ProductsState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default Products
