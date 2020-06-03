import { ProductModel } from '@/model/product-model'
import { BasketModel } from '@/model/basket-model'
import { CartState } from '@/store/type/cart'
import { Module, RootState } from '@/store/type'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

const state: CartState = {
  lines: []
}

const getters: GetterTree<CartState, RootState> = {
  itemCount (state: CartState): string | number {
    const count = state.lines.reduce((total: any, line: any) => total + line.quantity, 0)
    if (count === 0) {
      return '0'
    }

    return count
  },
  totalPrice (state: CartState): number {
    return state.lines.reduce((total: number, line: BasketModel) => total + (line.quantity * line.product.price), 0)
  },
  totalItemByProduct (state: CartState, getters: any): Function {
    return function (product: ProductModel): number {
      const cart = getters.getCartLineByProduct(product)

      return cart !== null ? cart.quantity : 0
    }
  },
  totalPriceByProduct (state: CartState, getters: any): Function {
    return function (product: ProductModel): number {
      const cart = getters.getCartLineByProduct(product)

      return cart !== null ? cart.getTotalPrice() : 0
    }
  },
  isProductInCart (state: CartState): Function {
    return function (product: ProductModel): boolean {
      const cartLine = state.lines.find(function (line: BasketModel): boolean {
        return line.product.id === product.id && line.quantity > 0
      })

      return cartLine !== undefined
    }
  },
  getCartLineByProduct (state: CartState) {
    return function (product: ProductModel): BasketModel | null {
      const cartLine = state.lines.find(function (line: BasketModel): boolean {
        return line.product.id === product.id && line.quantity > 0
      })

      return cartLine !== undefined ? cartLine : null
    }
  }
}

const mutations: MutationTree<CartState> = {
  addProduct (state: CartState, product: ProductModel): void {
    const cartLine = state.lines.find(function (line: BasketModel): boolean {
      return line.product.id === product.id
    })

    if (cartLine != null) {
      cartLine.quantity++
    } else {
      const cartLine = new BasketModel(product, 1)
      state.lines.push(cartLine)
    }
  },
  changeQuantity (state: CartState, update: any): void {
    update.line.quantity = update.quantity
  },
  removeProduct (state: CartState, product: ProductModel): void {
    const cartLine = state.lines.find(function (line: BasketModel): boolean {
      return line.product.id === product.id
    })

    if (cartLine != null && cartLine.quantity > 0) {
      cartLine.quantity--
    }
  },
  removeLine (state: CartState, lineToRemove: any): void {
    const index = state.lines.findIndex(function (line: BasketModel): boolean {
      return line === lineToRemove
    })

    if (index > -1) {
      state.lines.splice(index, 1)
    }
  },
  setCartData (state: CartState, data: BasketModel[]): void {
    state.lines = data
  }
}

const actions: ActionTree<CartState, RootState> = {
  loadCartData (context: any): void {
    const data = localStorage.getItem('cart')
    if (data !== undefined && data !== null) {
      const basket = JSON.parse(data).map(function (data: any) {
        return new BasketModel(
          data.product,
          data.quantity
        )
      })
      context.commit('setCartData', basket)
    }
  },
  storeCartData (context: any): void {
    localStorage.setItem('cart', JSON.stringify(context.state.lines))
  },
  clearCartData (context: any): void {
    context.commit('setCartData', [])
  },
  initializeCart (context: any, store: any): void {
    context.dispatch('loadCartData')
    store.watch(function (state: any): BasketModel[] {
      return state.cart.lines
    },
    function () {
      return context.dispatch('storeCartData')
    }, { deep: true }
    )
  }
}

const Cart: Module<CartState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default Cart
