export const initializeVuexModule = (moduleName, Vue) => ({
  [moduleName]: {

    namespaced: true,

    state: {},

    getters: {
      getRecord: state => key => state[key],
    },

    mutations: {
      ADD_RECORD(state, { key, value }) {
        state[key] = value;
      },

      PUT_RECORD(state, { key, value }) {
        state[key] = value;
      },

      REMOVE_RECORD(state, key) {
        Vue.delete(state, key);
      },

      CLEAR(state) {
        for (const key in state) {
          Vue.delete(state, key);
        }
      },
    },

    actions: {
      addRecord({ commit }, { key, value }) {
        commit('ADD_RECORD', { key, value });
      },

      putRecord({ commit }, { key, value }) {
        commit('PUT_RECORD', { key, value });
      },

      removeRecord({ commit }, key) {
        commit('REMOVE_RECORD', key);
      },

      clear({ commit }) {
        commit('CLEAR');
      },
    },

  }
});
