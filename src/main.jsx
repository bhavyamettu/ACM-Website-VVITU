import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { applyImageVars } from './images.js';
import App from './App.jsx';
import { CmsProvider } from './lib/CmsContext.jsx';

applyImageVars();
createRoot(document.getElementById('root')).render(
  <CmsProvider>
    <App />
  </CmsProvider>
);
