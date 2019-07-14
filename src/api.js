import axios from 'axios';
import qs from 'qs';

// 创建axios实例
const service = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'repeat',
    });
  },
  // 请求超时时间
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  withCredentials: true,
});

service.interceptors.response.use(
  response => response,
  (error) => {
    if (!error.response) {
      console.log('Please check your internet connection.');
    }

    return Promise.reject(error);
  },
);

export default {
  async userSignIn() {
    const response = await service({
      url: '/api',
      method: 'get',
    });

    return response;
  },

  async userSignUp() {
    const response = await service({
      url: '/api',
      method: 'get',
    });

    return response;
  },

  async submitSelection(selected) {
    const response = await service({
      url: '/api',
      method: 'put',
      data: {
        selected,
      },
    });

    return response;
  },

  getRecommend(userId) {
    return service({
      url: '/api/get_top_n_items',
      method: 'get',
      params: {
        target_user_id: userId,
        top_n: 10,
      },
    });
  },


  getHistory(params) {
    return service({
      url: '/api/get_watched_movies',
      method: 'get',
      params,
    });
  },
};
