import { setCookie, getCookie, removeCookie } from '@/utils/userCookie';

export default {
  namespaced: true,
  state: {
    user: getCookie(),
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.user = setCookie(userInfo);
    },
    loginOut(state) {
      state.user = {
        username: '',
        role: '',
        appkey: '',
        email: '',
      };
    },
  },
  actions: {
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    loginOut({ commit }) {
      commit('loginOut');
      removeCookie();
    },
  },
};
