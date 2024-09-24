import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';


const loadNaverScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
    script.type = 'text/javascript';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(new Error('Failed to load Naver SDK script'));
    };
    document.head.appendChild(script);
  });
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

loadNaverScript().then(() => {
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}).catch(error => {
  console.error('Failed to load Naver SDK:', error);
});