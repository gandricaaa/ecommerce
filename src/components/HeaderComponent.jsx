// Icons
import { CiLocationOn, CiDeliveryTruck } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
// eslint-disable-next-line react/prop-types
function HeaderComponent({ setActiveHeader }) {
	return (
		<div className='flex items-center justify-between container mx-auto h-[80px] flex-col md:flex-row lg:flex-row py-[10px] md:py-[0px] lg:py-[0px]'>
			<p>
				Need help? Call us:
				<a className='text-blue-500' href='tel:+(+98) 0234 456 789)'>
					{' '}
					(+98) 0234 456 789
				</a>
			</p>
			{/* right side */}
			<div className='flex items-center gap-[10px]'>
				<div className='flex items-center gap-[5px]'>
					<CiLocationOn size={24} />
					<span>Our Store</span>
				</div>
				<div className='flex items-center gap-[5px]'>
					<CiDeliveryTruck size={24} />
					<span>Track your order</span>
				</div>
				<div>
					<IoMdClose
						size={24}
						onClick={() => setActiveHeader(false)}
						cursor={'pointer'}
					/>
				</div>
			</div>
		</div>
	);
}

export default HeaderComponent;
