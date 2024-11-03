import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import store from "./stores/storeConfig.js"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
