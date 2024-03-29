import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { configureStore } from '@reduxjs/toolkit';
import promiseMiddleware from 'redux-promise';
import Reducer from './_reducers'; // 알아서 index로 처리

// Create Redux store using configureStore
const store = configureStore({
  reducer: Reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(promiseMiddleware),
  devTools: process.env.NODE_ENV !== 'production' // Only enable dev tools in development
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
