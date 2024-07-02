import React from 'react';
import ReactDOM from 'react-dom/client';
import AppLayout from './AppLayout.jsx';
import './index.css';
// router
import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
// pages
import HomePage from './pages/HomePage.jsx';
//redux
import { Provider } from 'react-redux';
import store from './store/store.js';
// Clerk Provider
import { ClerkProvider } from '@clerk/clerk-react';
import SingleProductPage from './pages/SingleProductPage.jsx';
// Import your publisher key
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
				element: <HomePage />,
			},
			{
				path: '/singleProduct/:id',
				element: <SingleProductPage/>
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
	<Provider store={store}>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
		<RouterProvider router={router} />		
		</ClerkProvider>
	</Provider>
	</React.StrictMode>
);
