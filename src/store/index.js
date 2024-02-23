import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null, // Token de autenticación JWT
    rol: null, // Datos del usuario autenticado
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      // Puedes guardar el token en el almacenamiento local para persistencia si lo deseas
      
    },
    setUser(state, user) {
      state.token = user.access_token;
      state.rol = user.rol;
    },
    clearAuthData(state) {
      state.token = null;
      state.user = null;
       // Limpia el token del almacenamiento local
    },
  },
  actions: {
    async login({ commit }, credentials) {
      
        const response = await axios.post('/login', credentials); // Realiza una petición HTTP para iniciar sesión
        const { data } = response;
        commit('setToken', data.access_token);
        commit('setUser', data.user); // Establece los datos del usuario si es necesario
        return data; // Devuelve los datos de respuesta (podrían ser útiles)
      
    },
    logout({ commit }) {
      commit('clearAuthData');
      // Realiza una petición HTTP para cerrar sesión en el servidor si es necesario
    },
    
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== null;
    },
    getRol(state) {
      return state.rol;
    },
    getToken(state) {
      return state.token;
    },
  },
});

