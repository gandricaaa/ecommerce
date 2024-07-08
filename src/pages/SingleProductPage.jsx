import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductService from '../services/productService';
import { Rating } from '@mui/material';
import { FaCheck} from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { IoIosHeartEmpty } from 'react-icons/io';
import { FaShippingFast } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { saveInCartAction } from '../store/cartSlice';
function SingleProductPage() {
    const [singleProduct,setSingleProduct] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [currentImage, setCurrentImage] = useState(0)
    const [countProduct, setCountProduct] = useState(1);
    // Disptach for redux
    const dispatch = useDispatch();
    // 3 stvari da prikazemo SINGLE PRODUCT.
    // 1. Uzmi ID
   let {id} = useParams();    
    //  2. Pokreni REQ i uzmi proizvod
    useEffect(()=>{
        ProductService.getSingleProduct(id)
        .then((res) => {
            setSingleProduct(res.data)
            setIsLoading(true)
        })
        .catch((err) => console.log(err))
    },[])
    //  3. Prikazati proizvod
    const handleImage = (index) => {
        setCurrentImage(index);
    }
const  handleProductCart = () => {
    dispatch(saveInCartAction(singleProduct))

    
}
return (
    <div className='pt-[120px] px-[20px]'>
        {isLoading ? <div className='container mx-auto flex flex-col md:flex-row gap-[40px] md:gap-[10px]'>
            {/* Left Side */}
            <div className='w-full md:w-[50%]'>
                <img src={singleProduct.images[currentImage]} alt=""  className='max-h-[300px] mx-auto mb-[30px]'/>
                <div className='flex items-center flex-wrap justify-center gap-[30px]'>
                    {singleProduct.images.map((image,index) => {
                        return <img key={index} src={image} alt=""  className={currentImage === index ? 'w-[100px] h-[100px] border border-sixthShadeBlue  p-[10px] rounded-lg cursor-pointer' : 'w-[100px] h-[100px] border border-fifthShadeGray p-[10px] rounded-lg cursor-pointer'} onClick={() => handleImage(index)}/>
                    })}
                </div>
            </div>
            {/* Right Side */}
            <div className='w-full md:w-[50%] sm:items-center flex flex-col gap-[15px]'>
               <h2 className='text-mainBlue text-[36px]'>{singleProduct.title}</h2>
               <h3 className='font-semibold text-[20px]'>${singleProduct.price}</h3>
               <Rating name="read-only" value={singleProduct.rating} size='large' readOnly />
               <div className='flex items-center gap-[10px]'>
                <span className='text-gray-500'>Avilability</span>
                {singleProduct.stock > 0 ? <h3 className='flex items-center text-[#30BD57] gap-[5px] font-semibold'><FaCheck size={24}/>In Stock</h3> : <h3 className='flex items-center text-[#FF0000] gap-[5px] font-semibold'><RxCross1 size={24}/>Out of Stock</h3>}
               </div>
               <p className='text-fifthShadeGray'>Hurry up! only  <span className='font-extrabold text-mainBlue'> {singleProduct.stock}</span>  product left in stock!</p>
               <div className='flex items-center gap-[20px]'>
                <p className='text-gray-500'>Tags:</p>
               <ul className='flex items-center gap-[10px]'>
                  {singleProduct.tags.map((tag,index) =>{
                      return <li className='text-fifthShadeGray px-[8px] py-[4px] rounded-lg bg-fifthShadeGray/10 cursor-pointer' key={index}>${tag}</li>
                  })}
               </ul>
               </div>
               <div className='flex items-center gap-[20px]'>
                <p className='text-gray-500'>Quantity: </p>
                <div className='flex items-center'>
                <button className='bg-eigthShadeGray text-gray-500 px-[10px] py-[4px] border border-gray-500'>-</button>
                <span className='bg-eigthShadeGray text-gray-500 px-[20px] py-[4px] border border-gray-500'>{countProduct}</span>
                <button className='bg-eigthShadeGray text-gray-500 px-[10px] py-[4px] border border-gray-500'>+</button>
                </div>
               </div>
               <div className='flex items-center gap-3 mt-[30px]'>
                <Link to={'/cart'} onClick={handleProductCart} className='bg-mainOrange text-mainWhite px-[20px] py-[10px] rounded-full'>Add To Cart</Link>
                <div className='bg-gray-100 p-[10px] rounded-full'>
                <IoIosHeartEmpty size={30} cursor={'pointer'}/>
                </div>
               </div>
               <hr  className='my-[20px]'/>
                  <div className='flex items-center gap-5'>
                    <FaShippingFast size={26}/>
                    <span className='text-mainGray'>{singleProduct.shippingInformation}</span>
                  </div>
                  <p className='font-semibold text-gray-500'>{singleProduct.returnPolicy}</p>
            </div>
        </div> : <div>Loading..</div>}
    </div>
  )
}

export default SingleProductPage