import { Outlet } from 'react-router-dom';
// components
import HeaderComponent from './components/HeaderComponent';
import NavbarComponent from './components/NavbarComponent';
// state
import { useState } from 'react';
import CategoryComponent from './components/CategoryComponent';
// axios baseURL
import axios from 'axios';
axios.defaults.baseURL = 'https://dummyjson.com';
function AppLayout() {
	const [activeHeader, setActiveHeader] = useState(true);
	return (
		<div>
			{activeHeader && (
				<HeaderComponent setActiveHeader={setActiveHeader} />
			)}
			<NavbarComponent />
			<CategoryComponent />
			<Outlet />
		</div>
	);
}

export default AppLayout;
