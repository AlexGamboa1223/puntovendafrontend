import { StrictMode } from 'react'
import { createRoot }from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
         <AppRoutes />
         <Toaster visibleToasts={1} position='top-right' richColors />
      </Auth0ProviderWithNavigate>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>
  </StrictMode>,
)
