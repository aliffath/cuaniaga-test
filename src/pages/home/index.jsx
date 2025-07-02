import React, { useState, useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import ProductList from "../../components/ProductList";
import ShoppingCart from "../../components/ShoopingCart";
import Button from "../../components/Button";
import { TbToolsKitchen2Off } from "react-icons/tb";
import Navbar from "../../components/Navbar";

const Home = () => {
  const { products, cart, loading, searchTerm, setSearchTerm, fetchProducts, addToCart, updateQuantity, removeFromCart, checkout } = useShop();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, fetchProducts]);

  return (
    <div className="mx-4 xl:mx-20 2xl:mx-60">
      <Navbar />
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-center my-5">
        <h1 className="text-xl lg:text-2xl font-bold mb-5 lg:mb-0">Daftar Makanan</h1>
        <input
          type="text"
          className="border border-gray-300 w-full rounded-md p-2 max-w-3xl outline-0"
          placeholder="Cari makanan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {loading ? (
          <p>Memuat produk...</p>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <TbToolsKitchen2Off className="text-4xl lg:text-6xl text-gray-400 mx-auto my-4" />
            <p className="text-center text-base text-gray-500">Tidak ada produk yang ditemukan.</p>
          </div>
        ) : (
          <>
            <div className="lg:col-span-2">
              <ProductList products={currentProducts} onAddToCart={addToCart} />
              <div className="flex justify-center items-center gap-5 mt-4">
                <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} text="Previous" disabled={currentPage === 1} />
                <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} text="Next" disabled={currentPage === totalPages} />
              </div>
            </div>
            <div className="lg:border-l-2 lg:border-gray-300 lg:pl-5">
              <div className="mb-8">
                <ShoppingCart cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onCheckout={checkout} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
