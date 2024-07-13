import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteFromCartAction,
	setPriceHandlerAction,
} from '../store/cartSlice';
import { useEffect, useRef, useState } from 'react';

function CartPage() {
	const [cartData, setCartData] = useState([]);
	const [activeCode, setActiveCode] = useState('');

	const { cart, totalPrice } = useSelector(
		(state) => state.cartStore
	);
	const dispatch = useDispatch();

  const couponRef = useRef();

	useEffect(() => {
		setCartData(JSON.parse(localStorage.getItem('cart_item')));
	}, [cart]);

	function handleRemoveProduct(product) {
		dispatch(deleteFromCartAction(product));
	}


  // handle active coupon
  function handleApplyCoupon(){

    console.log('radi');
    setActiveCode(couponRef.current.value);


    couponRef.current.value = '';
  }

	return (
		<div className='mt-[50px]'>
			<div className='container mx-auto flex flex-col lg:flex-row gap-[20px]'>
				<TableContainer
					component={Paper}
					className='w-full lg:w-[70%]'>
					<Table sx={{ minWidth: 250 }} aria-label='simple table'>
						<TableHead className='bg-mainBlue'>
							<TableRow>
								<TableCell
									style={{ color: 'white' }}
									className='text-textWhite'>
									Products
								</TableCell>
								<TableCell style={{ color: 'white' }} align='left'>
									Price
								</TableCell>
								<TableCell style={{ color: 'white' }} align='left'>
									Quantity
								</TableCell>
								<TableCell style={{ color: 'white' }} align='right'>
									Subtotal
								</TableCell>
								<TableCell style={{ color: 'white' }} align='right'>
									Remove
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{cartData.map((product, index) => (
								<TableRow
									key={product.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell component='th' scope='row'>
										<img
											src={product.thumbnail}
											alt=''
											className='w-[90px] h-[90px] border border-mainBlue rounded-lg object-cover '
										/>
									</TableCell>
									<TableCell align='left'>${product.price}</TableCell>
									<TableCell align='left'>
										<div className='flex items-center'>
											<button
												className='px-[8px] py-[4px] bg-slate-300 text-[18px]'
												onClick={() =>
													dispatch(
														setPriceHandlerAction({
															index,
															increment: -1,
															product,
														})
													)
												}>
												-
											</button>
											<span className='px-[8px] py-[4px] bg-slate-300 text-[18px]'>
												{product.count}
											</span>
											<button
												className='px-[8px] py-[4px] bg-slate-300 text-[18px]'
												onClick={() => {
													console.log(product.stock, product.count);
													if (product.count < product.stock) {
														dispatch(
															setPriceHandlerAction({
																index,
																increment: 1,
																product,
															})
														);
													}
												}}>
												+
											</button>
										</div>
									</TableCell>
									<TableCell align='right'>
										${Math.floor(product.cartTotal)}
									</TableCell>
									<TableCell align='right'>
										<button
											className='text-red-400'
											onClick={() => handleRemoveProduct(product)}>
											Remove
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				{/* INFO/CART */}
				<div className='w-full lg:w-[30%]'>
					<h2 className='text-textWhite bg-mainBlue py-[17px] text-center rounded-md'>
						CART TOTAL
					</h2>
					<span className='text-center text-[28px] font-extrabold'>
						Total Price: ${activeCode === 'alphanedim' ? totalPrice / 2 : totalPrice}
					</span>

					<div className='flex flex-col '>
						<input
              ref={couponRef}
							type='text'
							placeholder='Insert coupon'
							className='p-[10px] border border-grayColor rounded-lg placeholder:text-mainBlue outline-none mt-[25px]'
              // value={activeCode}
              // onChange={(e) => setActiveCode(e.target.value)}

						/>
						<span className='text-[13px] text-grayColor'>
							Insert copun for 50% discount
						</span>
						<button className={activeCode === 'alphanedim' ? 'bg-grayColor hover:bg-gray-500 text-black px-[15px] py-[7px] rounded-lg transition-all duration-300 cursor-pointer mt-[30px] line-through' : 'bg-mainBlue hover:bg-mainYellow text-white px-[15px] py-[7px] rounded-lg transition-all duration-300 cursor-pointer mt-[30px]'}
            onClick={handleApplyCoupon}
            disabled={activeCode === 'alphanedim' ? true : false}
            >
							{activeCode === 'alphanedim' ? 'Coupon applied' : 'Apply coupon'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
