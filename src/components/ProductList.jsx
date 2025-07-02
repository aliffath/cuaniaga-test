import React from "react";
import Button from "./Button";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg shadow-md border border-transparent hover:border-[#FF7A28] transition-all duration-300 bg-white">
          <img src={product.image} alt={product.name} className="w-full rounded-t-lg h-[200px] object-cover" />
          <div className="px-4 py-2">
            <h3 className="text-lg text-[#0C085C] font-semibold">{product.name}</h3>
            <p className="text-gray-400 font-bold text-xl">Rp. {product.price.toLocaleString()}</p>
            <p className="text-base text-gray-600 font-normal ">Stok : {product.stock}</p>
            <div className="mt-2">
              <Button onClick={() => onAddToCart(product)} text="Tambah ke Keranjang" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
