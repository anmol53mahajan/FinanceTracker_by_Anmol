import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './index.css'
import App from './App.jsx'
import { FinanceProvider } from './context/FinanceContext.jsx'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FinanceProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2400}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </FinanceProvider>
    </BrowserRouter>
  </StrictMode>,
)
