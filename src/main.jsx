import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
     <AuthProvider>
     <QueryClientProvider client={queryClient}>
     <SnackbarProvider>
     <RouterProvider router={router} />
     </ SnackbarProvider>
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
