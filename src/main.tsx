import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

import App from './App.tsx'
import './index.css'

axios.defaults.baseURL = 'https://api.prosa.ai/v2/speech'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
