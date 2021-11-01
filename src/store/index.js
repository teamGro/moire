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
    productsQty: 0,
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
      return state.products.map((product) => {
        let image = null;
        if (product.colors?.length && product.colors[0].gallery?.length) {
          image = product.colors[0].gallery[0].file.url;
        } else {
          console.log(product.colors);
        }
        return {
          ...product,
          image,
        };
      });
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
    setProductsQty(state, qty) {
      state.productsQty = qty;
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
    getProducts: async ({ commit }, payload) => {
      const response = await axios(`${url.urlPart}products`, {
        method: 'GET',
        params: {
          page: payload.page,
          limit: payload.productsPerPage,
        },
      });
      commit('setProducts', response.data.items);
      commit('setProductsQty', response.data.pagination.total);
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
