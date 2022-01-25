import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root'
import {fetchAssetPrice} from './util/asset_api_util'

document.addEventListener('DOMContentLoaded', () => {

  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
 
  // window.store = store;
  // window.fetchAssetPrice = () => fetchAssetPrice('GME').then(res => console.log(res['Global Quote']['05. price']));


  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});