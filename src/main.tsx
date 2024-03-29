import { ThemeProvider } from '@/components/theme-provider'
import { store } from '@/redux/store'
import router from '@/routes/routes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
      <Toaster />
    </Provider>
  </React.StrictMode>,
)

console.log(
  '%cStop! This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or "hack" someone\'s account, it is a scam and will give them access to your account. If you are a developer, you can use this console to debug your code. If you are not a developer, close this window and go about your day.',
  "color:red;font-family:system-ui;font-size:2.5rem;-webkit-text-stroke: 1px black;font-weight:bold"
);