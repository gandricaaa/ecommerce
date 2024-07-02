import { useEffect } from "react";
import ProductService from "../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { saveAllProductsAction } from "../store/productSlice";	
import CardComponent from "../components/CardComponent";

function HomePage() {
	const {allProducts, isLoading} = useSelector((state) => state.productStore)
	const dispatch = useDispatch()
	useEffect (()=> {
		ProductService.getAllProductsSerive()
		.then((res) => {
			dispatch(saveAllProductsAction(res.data.products))
		})
		.catch((err) => console.log(err))
	},[])
	return (
		<div className="container mx-auto">
			<div>
				<span>List/Grid View</span>
			</div>
			{isLoading ? <div className="flex flex-wrap items-center justify-center gap-5">
				{allProducts.map((product) =>{
					return <CardComponent key={product.id} product={product}/>
				})}
			</div> : <div>Loading...</div>}
		</div>
	);
}

export default HomePage;
