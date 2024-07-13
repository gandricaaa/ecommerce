/* eslint-disable react/prop-types */
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';

function CardComponent({ product, isGrid }) {
	return (
		<div
			className={
				isGrid === 'gridView'
					? 'w-[300px] border border-grayColor rounded-[20px] flex flex-col items-center justify-center'
					: 'w-full flex items-center border border-grayColor justify-between px-[10px] rounded-lg'
			}>
			<div>
				<img
					src={product.thumbnail}
					alt=''
					className={isGrid === 'gridView' ? 'w-full h-[200px] object-cover' : 'h-[100px] object-cover lg:h-[200px]'}
				/>
			</div>
			{isGrid === 'listView' ? (
				<>
					<h3 className='hidden lg:flex'>{product.title}</h3>
					<h4 className='hidden lg:flex'>${product.price}</h4>
				</>
			) : (
				<>
					<h3>{product.title}</h3>
					<h4>${product.price}</h4>
				</>
			)}
			<Rating name='read-only' value={product.rating} readOnly />
			<Link
				to={`/singleProduct/${product.id}`}
				className={isGrid === 'gridView' ? 'bg-mainBlue text-textWhite px-[16px] py-[8px] rounded-lg my-[20px] hover:bg-mainYellow transition-all duration-300' : 'bg-mainBlue text-textWhite px-[8px] py-[4px] rounded-lg  hover:bg-mainYellow transition-all duration-300 '}>
				View More
			</Link>
		</div>
	);
}

export default CardComponent;
