// import axios from 'axios';
// import { store } from '@/store';
// import { logout } from '@/store/auth/authSlice';

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(p => {
//     if (error) {
//       p.reject(error);
//     } else {
//       p.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// const instance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
// });



// // Handle 401
// instance.interceptors.response.use(
//   res => res,
//   async (err) => {
//     const originalRequest = err.config;

//     // Nếu 401 và chưa retry bao giờ
//     if (err.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const { refreshToken } = store.getState().auth;

//       if (!refreshToken) {
//         store.dispatch(logout());
//         return Promise.reject(err);
//       }

//       if (isRefreshing) {
//         return new Promise(function(resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((newToken) => {
//             originalRequest.headers.Authorization = 'Bearer ' + newToken;
//             return instance(originalRequest);
//           })
//           .catch((error) => {
//             return Promise.reject(error);
//           });
//       }

//       isRefreshing = true;

//       try {
//         const response = await axios.post(
//           process.env.NEXT_PUBLIC_API_URL + '/auth/refresh',
//           { refreshToken }
//         );

//         const newToken = response.data.accessToken;

//         // cập nhật vào redux
//         const state = store.getState().auth;
//         localStorage.setItem('auth', JSON.stringify({
//           ...state,
//           accessToken: newToken
//         }));

//         store.dispatch({
//           type: 'auth/updateAccessToken',
//           payload: newToken,
//         });

//         processQueue(null, newToken);

//         isRefreshing = false;

//         originalRequest.headers.Authorization = 'Bearer ' + newToken;
//         return instance(originalRequest);

//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         isRefreshing = false;
//         store.dispatch(logout());
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default instance;
