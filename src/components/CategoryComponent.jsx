// Category Service
import CategoryService from '../services/CategoryService';
import { useEffect, useState } from 'react';
function CategoryComponent() {
	const [allCategory, setAllCategory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		CategoryService.getAllCategory()
			.then((res) => {
				setAllCategory(res.data);
				setIsLoading(true);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className='bg-secondGray h-[70px] flex items-center'>
			<div className='container mx-auto flex items-center space-x-4 '>
				<button className='bg-mainBlue px-[20px] py-[10px] text-white rounded-lg'>
					Show Category
				</button>
				{isLoading ? (
					<div>Category</div>
				) : (
					<div>Loading Category</div>
				)}
			</div>
		</div>
	);
}

export default CategoryComponent;
