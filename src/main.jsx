import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './Router/Route.jsx'
import { RouterProvider } from 'react-router'

import 'aos/dist/aos.css';
import Aos from 'aos'
import AuthProvider from './Context/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
Aos.init();

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='urbanist'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
