import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { fetchAsset } from './util/api_util';



document.addEventListener('DOMContentLoaded', () => {

  const store = configureStore();
  window.fetchAsset = fetchAsset;
  window.store = store;

  const root = document.getElementById('root');
  ReactDOM.render(<h1>SparrowHood</h1>, root);
});