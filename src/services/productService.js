import axios from "axios";

class ProductService { 
static getAllProductsSerive = () => axios.get('/products')
}

export default ProductService