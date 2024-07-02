import axios from "axios";

class ProductService { 
static getAllProductsSerive = () => axios.get('/products?limit=50&skip=100')
static getSingleProduct = (id) => axios.get(`/products/${id}`)
}

export default ProductService