import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { Rating } from '@mui/material';

// icons
import { FaCheck } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { IoIosHeartEmpty } from 'react-icons/io';
import { FaHeart, FaShippingFast } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { saveInCartAction } from '../store/cartSlice';
import { updateFavoriteAction } from '../store/favoriteSlice';
function SingleProductPage() {
	const [singleProduct, setSingleProduct] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);
	const [countProduct, setCountProduct] = useState(1);

	const [favoriteIdIcon, setFavoriteIdIcon] = useState(null);
	const {allFavorite} = useSelector((state) => state.favoriteStore);

	// dispatch for redux
	const dispatch = useDispatch();

	// 3 stvari da prikazemo SINGLE PRODUCT. FLOW
	// 1. Uzmi ID
	let { id } = useParams();
	// 2. Pokreni REQ i uzmi proizvod
	useEffect(() => {
		ProductService.getSingleProduct(id)
			.then((res) => {
				setSingleProduct(res.data);
				setIsLoading(true);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		if(allFavorite.length > 0){
			allFavorite.find((item) => {
				if (item.id === singleProduct.id) {
					setFavoriteIdIcon(item.id);
					return;
				}
			})

		}else{
			setFavoriteIdIcon(null);
		}
	}, [allFavorite]);

	// 3. Priakzi ga frajeru!!!

	function handleImage(index) {
		setCurrentImage(index);
	}


	// Function - koja ce proslediti proizvod u CART/REDUX
	function handleProductCart() {
		dispatch(saveInCartAction(singleProduct))
	}

	return (
		<div className='px-[20px]'>
			{isLoading ? (
				<div className='container mx-auto flex flex-col lg:flex-row  gap-[40px] lg:gap-[20px]'>
					{/* left side */}
					<div className='w-full  lg:w-[50%] flex flex-col items-center'>
						<img
							src={singleProduct.images[currentImage]}
							alt=''
							className='max-h-[400px]'
						/>
						<div className='flex items-center justify-center gap-[20px] flex-wrap'>
							{singleProduct.images.map((el, index) => {
								return (
									<img
										src={el}
										alt=''
										key={index}
										className={
											currentImage === index
												? 'w-[100px] h-[100px] border border-mainBlue p-[10px] rounded-lg  '
												: 'w-[100px] h-[100px] border border-grayColor p-[10px] rounded-lg cursor-pointer'
										}
										onClick={() => handleImage(index)}
									/>
								);
							})}
						</div>
					</div>

					{/* Right side */}
					<div className='w-full  lg:w-[50%] flex flex-col gap-[10px] '>
						<h2 className='text-mainBlue text-[36px]'>
							{singleProduct.title}
						</h2>
						<h5 className='font-semibold text-[20px]'>
							${singleProduct.price}
						</h5>
						<Rating
							value={singleProduct.rating}
							readOnly
							size='large'
						/>
						<div className='flex items-center gap-[10px]'>
							<span className='text-gray-500'>Availability: </span>
							{singleProduct.stock > 0 ? (
								<h3 className='flex items-center text-[#30BD57] gap-[5px] font-semibold'>
									<FaCheck size={24} /> In Stock
								</h3>
							) : (
								<h3 className='flex items-center text-[#FF0000] gap-[5px] font-semibold'>
									<RxCross1 size={24} /> Out Of Stock
								</h3>
							)}
						</div>
						<p className='text-grayColor'>
							Hurry up! only{' '}
							<span className='font-extrabold text-mainBlue'>
								{singleProduct.stock}
							</span>{' '}
							product left in stock!
						</p>
						<div className='flex items-center gap-[20px]'>
							<p className='text-gray-500'>Tags:</p>
							<ul className='flex items-center gap-[10px]'>
								{singleProduct.tags.map((tag, index) => {
									return (
										<li
											key={index}
											className='bg-ligthGray px-[8px] py-[4px] rounded-lg text-gray-500 cursor-pointer'>
											#{tag}
										</li>
									);
								})}
							</ul>
						</div>

						<div className='flex items-center gap-[20px]'>
							<p className='text-gray-500'>Quantity: </p>
							<div className='flex items-center'>
								<button className='bg-ligthGray text-gray-500 px-[10px] py-[4px] border border-gray-500'>
									-
								</button>
								<span className='bg-ligthGray text-gray-500 px-[20px] py-[4px] border border-gray-500'>
									{countProduct}
								</span>
								<button className='bg-ligthGray text-gray-500 px-[10px] py-[4px] border border-gray-500'>
									+
								</button>
							</div>
						</div>

						<div className='flex items-center mt-[30px] gap-[20px]'>
							<Link
								to={'/cart'}
								className='bg-mainYellow text-textWhite px-[26px] py-[12px] rounded-lg'
								onClick={handleProductCart}
								>
								Add To Cart
							</Link>
							<div className='bg-[#EEE] p-[10px] rounded-full'>
								

									{favoriteIdIcon === parseInt(id) ? <FaHeart color='red' size={30} onClick={() => dispatch(updateFavoriteAction(singleProduct))} /> : <FaHeart size={30}  onClick={() => dispatch(updateFavoriteAction(singleProduct))} />}
							</div>
						</div>
						<hr className='my-[20px]' />
						<div className='flex items-center gap-[20px]'>
							<FaShippingFast size={26} />
							<span className='text-grayColor'>
								{singleProduct.shippingInformation}
							</span>
						</div>

						<p className='font-semibold text-gray-500'>
							{singleProduct.returnPolicy}
						</p>
					</div>
				</div>
			) : (
				<div>Loading..</div>
			)}
		</div>
	);
}

export default SingleProductPage;
