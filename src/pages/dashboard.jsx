// pages/dashboard.js
import PrivateRoute from '@/components/PrivatRoute';
import { useState, useEffect } from 'react'; // Import useEffect
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';


export default function Dashboard() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState('');
    const router = useRouter();

  // Fetch products on component mount
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

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!image) {
      setError('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const newProduct = await res.json();
        setProducts([...products, newProduct]); // Add the new product to the list
        // Reset form fields
        setName('');
        setCategory('');
        setDescription('');
        setPrice('');
        setImage(null);
        document.getElementById('image').value = ''; // Clear the file input
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('Failed to add product.');
    }
  };

  return (
    <PrivateRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => auth.signOut()}>Sign Out</button>

        <h2 className="text-xl font-semibold mb-2">Add New Cake</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Product List</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <li key={product._id} className="border p-4 rounded shadow">
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover mb-2 rounded" />
                )}
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-gray-800">${product.price.toFixed(2)}</p> {/* Format price */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </PrivateRoute>
  );
}
