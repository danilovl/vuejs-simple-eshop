import Axios from 'axios'
import { AuthModel } from '@/model/auth-model'
import ApiConstant from '@/constant/api-constant'
import { AuthState } from '@/store/type/auth'
import { Module, RootState } from '@/store/type'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

const state: AuthState = {
  verifyToken: false,
  authenticated: false,
  jwt: null
}

const getters: GetterTree<AuthState, RootState> = {
  authenticatedAxios (state: AuthState) {
    return Axios.create({
      headers: {
        Authorization: `Authentication<${state.jwt}>`
      }
    })
  },
  isAuthenticated (state: AuthState): boolean {
    return state.authenticated
  }
}

const mutations: MutationTree<AuthState> = {
  setAuthenticated (state: AuthState, header: string): void {
    state.jwt = header
    state.authenticated = true

    localStorage.setItem('user-token', state.jwt)
  },
  setVerifyToken (state: AuthState, isVerify: boolean): void {
    state.verifyToken = isVerify
  },
  clearAuthentication (state: AuthState): void {
    state.authenticated = false
    state.jwt = null

    localStorage.removeItem('user-token')
  }
}

const actions: ActionTree<AuthState, RootState> = {
  async initializeAuthenticate (context: any) {
    const token = localStorage.getItem('user-token')

    if (token !== null) {
      await context.dispatch('verifyToken', token).then(function () {
        if (state.verifyToken) {
          context.commit('setAuthenticated', token)
        } else {
          context.commit('clearAuthentication')
        }
      })
    } else {
      context.commit('clearAuthentication')
    }
  },
  logout (context: any): void {
    context.commit('clearAuthentication')
  },
  async authenticate (context: any, credentials: AuthModel) {
    const response = await Axios.post(ApiConstant.LOGIN_URL, credentials)
    if (response.data.success === true) {
      context.commit('setAuthenticated', response.data.token)
    }
  },
  async verifyToken (context: any, token: string) {
    const response = await Axios.create({
      headers: {
        Authorization: `Authentication<${token}>`
      }
    }).post(ApiConstant.VERIFY_TOKEN_URL)

    context.commit('setVerifyToken', response.data.success === true)
  }
}

const Auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default Auth
