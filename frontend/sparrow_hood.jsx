import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root'

import { fetchAsset } from './util/api_util';


document.addEventListener('DOMContentLoaded', () => {

  const store = configureStore();
  // window.fetchAsset = fetchAsset;
  // window.store = store;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});