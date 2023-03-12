import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';
import {BrowserRouter}from"react-router-dom";
import { Provider } from 'react-redux';
import store from "./store/ReduxStore"

 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
   </Provider>,
); 

/* ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  
  </Provider>,
  document.getElementById('root')
) */


