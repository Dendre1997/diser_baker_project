import PrivateRoute from '@/components/PrivatRoute';
import { useState, useEffect } from 'react';
const ProductCard = () => {
    const [products, setProducts] = useState([]); // State to store fetched products
    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          setError('Failed to fetch products.');
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError('Failed to fetch products.');
      }
    };
    return ( 

     );
}
 
export default ProductCard;