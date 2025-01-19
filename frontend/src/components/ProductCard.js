import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    product.image1 && `http://localhost:7001${product.image1}`,
    product.image2 && `http://localhost:7001${product.image2}`,
    product.image3 && `http://localhost:7001${product.image3}`,
  ].filter(Boolean); // Ensure only valid image URLs are included

  const handleOrderClick = () => {
    navigate("/order", { state: { product } }); // Pass product details to the Order Page
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="border p-4 rounded-md shadow-md">
      <div className="relative w-full h-48 mb-4">
        <img
          src={images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              &gt;
            </button>
          </>
        )}
      </div>
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold text-green-600 mb-4">
        LKR.{product.price}
      </p>
      <button
        onClick={handleOrderClick}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Order Now
      </button>
    </div>
  );
};

export default ProductCard;
