import { createStore } from 'vuex';
import axios from 'axios';
import url from '@/helpers/apiURL';

export default createStore({
  state: {
    accessKey: null,
  },
  getters: {
  },
  mutations: {
    setAccessKey(state, key) {
      state.accessKey = key;
    },
  },
  actions: {
    getAccessKey: async ({ commit }) => {
      const response = await axios.get(`${url.urlPart}users/accessKey`);
      console.log(response.data);
      commit('setAccessKey', response.data.accessKey);
      localStorage.setItem('accessKey', response.data.accessKey);
    },
  },
});
