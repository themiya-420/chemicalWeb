import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../Services/api";

const Home = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    if (!token) {
      alert("Not Authorized! Please Login Again.");
      navigate("/signin");
    } else {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products
      } catch (error) {
        console.error("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8 text-center">
        <h1 className="text-5xl font-bold">Welcome to Eco Chemicals</h1>
        <p className="mt-4 text-lg">
          Your trusted source for eco-friendly chemical solutions
        </p>
      </header>
      <main className="flex-grow px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Our Featured Products
          </h2>
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full max-w-lg p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No products found matching your search.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
