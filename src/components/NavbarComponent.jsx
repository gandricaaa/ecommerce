// images logo
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
// clerck
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/clerk-react';
// Icons
import { CiUser, CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function NavbarComponent() {
	const [totalProductLS, setTotalProductLS] = useState();

	const { totalProduct } = useSelector((state) => state.cartStore);
	useEffect(() => {
		let lsTotal = JSON.parse(localStorage.getItem('cart_total'));
		if (lsTotal) {
			setTotalProductLS(lsTotal);
		}
	}, [totalProduct]);
	return (
		<div className='bg-mainBlue h-full md:h-[100px] lg:h-[100px] py-[10px] md:py-[0px] lg:py-[0px] flex items-center'>
			<div className='container mx-auto flex justify-between items-center flex-col gap-[10px] md:gap-0 lg:gap-0 sm:flex-col md:flex-col lg:flex-row'>
				<Link to={'/'}>
					<img src={logo} alt='' />
				</Link>
				{/* search bar */}
				<div className='bg-mainWhite rounded-[20px]'>
					<input
						type='text'
						placeholder='Search..'
						className='bg-transparent outline-none px-[20px] py-[15px] rounded-[20px] placeholder:text-mainOrange text-mainBlue'
					/>
					<button className='bg-mainOrange text-mainWhite px-[30px] py-[15px] rounded-[20px]'>
						Search
					</button>
				</div>
				{/* LoginSystem & Cart/Favorite */}
				<div className='flex items-center space-x-4'>
					<div className='flex items-center space-x-1'>
						<CiUser size={24} color='white' />
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton showName afterSignOutUrl='/' />
						</SignedIn>
					</div>
					<div className='flex items-center space-x-1'>
						<CiHeart size={24} color='white' />
						<span className='text-mainWhite bg-mainOrange w-[20px] h-[20px] flex justify-center items-center rounded-full'>
							0
						</span>
						<span className='text-mainWhite'>Favorite</span>
					</div>
					<div className='flex items-center space-x-1'>
						<CiShoppingCart size={24} color='white' />
						<span className='text-mainWhite bg-mainOrange w-[20px] h-[20px] flex justify-center items-center rounded-full'>
							{totalProduct ? totalProduct : 0}
						</span>
						<Link to={'/cart'} className='text-mainWhite'>
							Cart
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NavbarComponent;
