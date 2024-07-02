// Category Service
import { useDispatch, useSelector } from 'react-redux';
import CategoryService from '../services/CategoryService';
import { useEffect, useState } from 'react';
// redux
import { saveAllCategoryAction } from '../store/categorySlice';
function CategoryComponent() {
	const [toggleCategory, setToggleCategory] = useState(false)
	const {allCategory,isLoading} = useSelector((state) => state.categoryStore);
	const dispatch = useDispatch();
	useEffect(() => {
		CategoryService.getAllCategory()
			.then((res) => {
				dispatch(saveAllCategoryAction(res.data))
				
			})
			.catch((err) => console.log(err));
	}, []);
	const handleToggleCategory = () => {
		setToggleCategory(!toggleCategory)
	}
	return (
		<div className='bg-secondGray h-[100%] py-[20px] flex items-center'>
			<div className='container mx-auto flex items-center gap-[20px]  flex-col xl:flex-row'>
				<button className='bg-mainBlue px-[20px] py-[10px] text-white rounded-lg' onClick={handleToggleCategory}>
					Show Category
				</button>
				{isLoading ? 
					<ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5 gap-[10px]'>
					{toggleCategory && allCategory.map((cat,index) =>{
					return <li className='w-[200px] bg-mainBlue text-mainWhite text-center rounded-lg px-[16px] py-[8px] hover:bg-mainOrange transition-all duration-500 cursor-pointer' key={index}>{cat}</li>
					})}
					</ul>
				: <div>Loading Category</div>}	
			</div>
		</div>
	);
}

export default CategoryComponent;
