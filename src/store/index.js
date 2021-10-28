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
    productsQuantity: null,
    seasons: [],
    materials: [],
  },
  getters: {
    getBasketAmount(state) {
      return state.basket.items.length;
    },
    getProductsQty(state) {
      return state.productsQuantity;
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
    setProductsQuantity(state, qty) {
      state.productsQuantity = qty;
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
    getProductsQuantity: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}products`);
      commit('setProductsQuantity', response.data.items.length);
    },
    getMaterials: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}materials`);
      commit('setMaterials', response.data.items);
    },
    getSeasons: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}seasons`);
      commit('setSeasons', response.data.items);
    },
  },
});
