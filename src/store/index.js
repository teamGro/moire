import { createStore } from 'vuex';
import axios from 'axios';
import url from '@/helpers/apiURL';

export default createStore({
  state: {
    accessKey: null,
    basket: {
      id: null,
      items: [],
    },
    products: [],
    seasons: [],
    materials: [],
    colors: [],
  },
  getters: {
    getBasketAmount(state) {
      return state.basket.items.length;
    },
    getProductsQty(state) {
      return state.products.length;
    },
    getProducts(state) {
      return state.products.map((product) => ({
        ...product,
        image: product.colors[0],
      }));
    },
    getColors(state) {
      return state.colors;
    },
  },
  mutations: {
    setAccessKey(state, key) {
      state.accessKey = key;
    },
    updateBasketAmount(state, data) {
      if (state.basket.items.length) {
        state.basket.items.push(data);
      } else {
        state.basket.items = data.item || [];
        state.basket.id = data.id;
      }
    },
    setProducts(state, qty) {
      state.products = qty;
    },
    setMaterials(state, materials) {
      state.materials = materials.map((item) => ({
        ...item,
        type: 'material',
      }));
    },
    setSeasons(state, seasons) {
      state.seasons = seasons;
    },
    setColors(state, colors) {
      state.colors = colors;
    },
  },
  actions: {
    getAccessKey: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}users/accessKey`);
      commit('setAccessKey', response.data.accessKey);
      localStorage.setItem('accessKey', response.data.accessKey);
    },
    getBasketAmount: async ({ state, commit }) => {
      const response = await axios.get(`${url.urlPart}baskets?userAccessKey=${state.accessKey}`);
      commit('updateBasketAmount', response.data);
    },
    getProducts: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}products`);
      commit('setProducts', response.data.items);
    },
    getMaterials: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}materials`);
      commit('setMaterials', response.data.items);
    },
    getSeasons: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}seasons`);
      commit('setSeasons', response.data.items);
    },
    getColors: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}colors`);
      commit('setColors', response.data.items);
    },
  },
});
