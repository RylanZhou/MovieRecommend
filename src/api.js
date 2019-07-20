import axios from 'axios';
import qs from 'qs';

// Create Axios instance
const service = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'repeat',
    });
  },
  // timeout: 5000,
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
  userSignIn(params) {
    return service({
      url: '/api/get_watched_movies',
      method: 'get',
      params,
    });
  },

  userSignUp(params) {
    return service({
      url: '/api/register',
      method: 'get',
      params,
    });
  },

  submitSelection(selected) {
    return service({
      url: '/api/get_classification',
      method: 'post',
      data: {
        classification: selected,
      },
    });
  },

  getRecommend(userId) {
    return service({
      url: '/api/get_top_n_items',
      method: 'get',
      params: {
        target_user_id: userId,
        top_n: 15,
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

  submitRating(params) {
    return service({
      url: '/api/watch_movie',
      method: 'get',
      params,
    });
  },

  getAnalysis(id) {
    return service({
      url: '/api/get_bar',
      method: 'get',
      params: {
        target_user_id: id,
        top_n: 10,
      },
    });
  },
};
