import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
   user: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      // Puedes guardar el token en el almacenamiento local para persistencia si lo deseas
      
    },
    setUser(state, user) {
      state.user = user;
      
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
      return state.user.access_token !== null;
    },
    getRol(state) {
      return state.user.rol;
    },
    getToken(state) {
      return state.user.access_token;
    },
    getUsuario(state){
      return state.user;
    },
    getCedula(state){
      return state.user.cedula;
    },
    getNombre(state){
      return state.user.nombre;
    }

   
  },
  plugins:[createPersistedState()]
});

