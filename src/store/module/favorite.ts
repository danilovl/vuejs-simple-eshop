import { ProductModel } from '@/model/product-model'
import { FavoriteState } from '@/store/type/favorite'
import { Module, RootState } from '@/store/type'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

const state: FavoriteState = {
  favorites: []
}

const getters: GetterTree<FavoriteState, RootState> = {
  itemCount (state: FavoriteState): number | string {
    const length = state.favorites.length
    return length > 0 ? length : '0'
  },
  isProductIsFavorite (state: FavoriteState): Function {
    return function (product: ProductModel): boolean {
      const favoriteProduct = state.favorites.find(function (line: any): boolean {
        return line.id === product.id
      })

      return favoriteProduct !== undefined
    }
  },
  getFavorites (state: FavoriteState): ProductModel[] {
    return state.favorites
  }
}

const mutations: MutationTree<FavoriteState> = {
  addOrRemoveProduct (state: FavoriteState, product: ProductModel): void {
    const line = state.favorites.find(function (line: any): boolean {
      return line.id === product.id
    })

    if (line === undefined) {
      mutations.addProduct(state, product)
    } else {
      mutations.removeProduct(state, product)
    }
  },
  addProduct (state: FavoriteState, product: ProductModel): void {
    const line = state.favorites.find(function (line: any): boolean {
      return line.id === product.id
    })

    if (line === undefined) {
      state.favorites.push(product)
    }
  },
  removeProduct (state: FavoriteState, product: ProductModel): void {
    const filterFavorites = state.favorites.filter(function (line: any): boolean {
      return line.id !== product.id
    })

    mutations.setFavoriteData(state, filterFavorites)
  },
  setFavoriteData (state: FavoriteState, data: any): void {
    state.favorites = data
  }
}

const actions: ActionTree<FavoriteState, RootState> = {
  loadFavoriteData (context: any): void {
    const data = localStorage.getItem('favorite')
    if (data !== null) {
      context.commit('setFavoriteData', JSON.parse(data))
    }
  },
  storeFavoriteData (context: any): void {
    localStorage.setItem('favorite', JSON.stringify(context.state.favorites))
  },
  clearFavoriteData (context: any): void {
    context.commit('setFavoriteData', [])
  },
  initializeFavorite (context: any, store: any): void {
    context.dispatch('loadFavoriteData')
    store.watch(function (state: any): ProductModel[] {
      return state.favorite.favorites
    },
    function () {
      return context.dispatch('storeFavoriteData')
    }, { deep: true }
    )
  }
}

const Favorite: Module<FavoriteState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default Favorite
