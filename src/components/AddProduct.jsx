import PrivateRoute from "./PrivatRoute";
const AddProduct = () => {
    return ( 
        <PrivateRoute>
        <h1>Add Product</h1>
        </PrivateRoute>
     );
}
 
export default AddProduct;