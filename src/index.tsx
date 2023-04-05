import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./pages/app/ui/App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
  // </React.StrictMode>
);

