import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from "./router";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <div className="bg-gradient-to-b from-sky-300 to-gray-200 min-h-screen">
    <AuthProvider>
    <AppRouter />
    </AuthProvider>
    </div>
  </StrictMode>,
)
