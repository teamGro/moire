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
    product: [],
    productsQty: 0,
    seasons: [],
    materials: [],
    colors: [],
    categories: [],
    orderInfo: null,
  },
  getters: {
    getBasketAmount(state) {
      return state.basket.items.length;
    },
    getBasketItems(state) {
      return state.basket.items.map((item) => {
        let image = null;
        const { product } = item;
        if (product.colors?.length && product.colors[0].gallery?.length) {
          image = product.colors[0].gallery[0].file.url;
        } else {
          console.log(product.colors);
        }
        return {
          id: item.id,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
          image,
          title: product.title,
        };
      });
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
      state.basket.items = data.items;
    },
    setBasketState(state, data) {
      state.basket.items = data.items || [];
      state.basket.id = data.id;
    },
    deleteProductFromBasket(state, basketInfo) {
      state.basket = basketInfo;
    },
    updateProductQtyInBasket(state, data) {
      state.basket = data;
    },
    setProducts(state, products) {
      state.products = products;
    },
    saveProduct(state, product) {
      const normalizeProduct = { ...product };
      if (product.colors?.length && product.colors[0].gallery?.length) {
        normalizeProduct.img = product.colors[0].gallery[0].file.url;
      } else {
        console.log(product.colors);
      }
      state.product = normalizeProduct;
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
    setCategories(state, categories) {
      state.categories = categories;
    },
    saveOrderInfo(state, info) {
      state.orderInfo = info;
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
      commit('setBasketState', response.data);
    },
    updateBasketAmount: async ({ state, commit }, product) => {
      const response = await axios.post(`${url.urlPart}baskets/products?userAccessKey=${state.accessKey}`, {
        productId: product.id,
        colorId: product.colorId,
        sizeId: product.sizeId,
        quantity: product.qty,
      });
      commit('updateBasketAmount', response.data);
    },
    updateProductQtyInBasket: async ({ state, commit }, payload) => {
      const response = await axios.put(`${url.urlPart}baskets/products?userAccessKey=${state.accessKey}`, {
        basketItemId: payload.id,
        quantity: payload.qty,
      });

      commit('updateProductQtyInBasket', response.data);
    },
    deleteProductFromBasket: async ({ state, commit }, id) => {
      console.log(id);
      const response = await axios.delete(`${url.urlPart}baskets/products?userAccessKey=${state.accessKey}`,
        { data: { basketItemId: id } });
      commit('deleteProductFromBasket', response.data);
    },
    getProducts: async ({ commit }, payload) => {
      const response = await axios(`${url.urlPart}products`, {
        method: 'GET',
        params: {
          page: payload.page,
          limit: payload.productsPerPage,
          minPrice: payload.minPrice || 0,
          maxPrice: payload.maxPrice || 0,
          category: payload.category || 0,
          colorIds: payload.colorIds || [],
          seasonIds: payload.seasonIds || [],
          materialIds: payload.materialIds || [],
        },
      });
      commit('setProducts', response.data.items);
      commit('setProductsQty', response.data.pagination.total);
    },
    getProduct: async ({ commit }, productId) => {
      const response = await axios.get(`${url.urlPart}products/${productId}`);
      commit('saveProduct', response.data);
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
    getCategories: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}productCategories`);
      commit('setCategories', response.data.items);
    },
    getOrderInfo: async ({ state, commit }, id) => {
      const response = await axios.get(`${url.urlPart}orders/${id}`,
        { params: { userAccessKey: state.accessKey } });
      commit('saveOrderInfo', response.data);
    },
  },
});
