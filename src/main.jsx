import { React } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MainProvider } from './context/MainContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <MainProvider>
      <App />
    </MainProvider>
)
