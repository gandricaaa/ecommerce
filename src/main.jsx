import React from 'react'
import ReactDOM from 'react-dom/client'
import AppLayout from './AppLayout.jsx'
import './index.css'
// router
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// redux
import { Provider } from 'react-redux'
import store from './store/store.js'
// pages
import HomePage from './pages/HomePage.jsx'
import SingleProductPage from './pages/SingleProductPage.jsx'
import CartPage from './pages/CartPage.jsx';

// clerk
import { ClerkProvider } from '@clerk/clerk-react'
import FavoritePage from './pages/FavoritePage.jsx'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/singleProduct/:id',
        element: <SingleProductPage />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/favorite',
        element: <FavoritePage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
               <RouterProvider router={router}/>
            </ClerkProvider>
        </Provider>
  </React.StrictMode>,
)
