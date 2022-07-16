import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

const axios = require('axios');
// const underscore = require('underscore')
const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_API_BASE_URL
})
  
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    theCart: [],
    lastItemAdded: {},
    itemHasBeenAdded: false,
    // Remove an item from cart array
    removeItemFromCart: false
  },
  getters: {
  },
  mutations: {
    loginUser(state) {
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
    },
    addToCart(state, payload) {
      state.theCart.push(payload);
      state.lastItemAdded = payload;
      // Want to open the sidebar when add to cart is pressed
      state.itemHasBeenAdded = true;
      console.log(payload)
    },
    // Working on a remove product function
    removeProduct(state) {
       state.theCart.splice(index, 1)
    },
  },
  actions: {
    logoutUser(context) {
      instance.get("/auth/logout")
      .then((response) => {
        context.commit('logoutUser')
        router.push({path: "/login"})
      })
      .catch((err) => {
        context.commit('logoutUser')
        console.log(err)
        router.push({path: "/login"})
      })
    },
  },
  modules: {
  }
})
