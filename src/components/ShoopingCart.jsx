import React from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ cart, onUpdateQuantity, onRemove, onCheckout }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    await onCheckout(navigate);
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Keranjang Belanja</h2>
      {cart.length === 0 ? (
        <div className="flex justify-center items-center flex-col h-full">
          <MdOutlineRemoveShoppingCart className="text-4xl lg:text-6xl text-gray-400 mx-auto my-4" />
          <p className="text-center text-base text-gray-500">Tambahkan produk ke keranjang untuk memulai belanja.</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-[#FF7A28] border-b-2 py-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} width={73} height={73} />
                <div>
                  <h4 className="text-[#0C085C] font-bold text-lg">{item.name}</h4>
                  <p className="text-sm text-gray-400 font-normal">
                    Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                    {item.quantity >= item.stock && <span className="stock-warning"> (Stok maksimum)</span>}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onUpdateQuantity(item.id, -1)} disabled={item.quantity <= 1} className="bg-[#FF7A28] text-white font-semibold px-2 rounded-md cursor-pointer">
                    -
                  </button>
                  <span className="text-gray-600 font-semibold text-base">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} disabled={item.quantity >= item.stock} className="bg-[#FF7A28] text-white font-semibold px-2 rounded-md cursor-pointer">
                    +
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <button onClick={() => onRemove(item.id)} className="bg-red-400 text-white text-sm font-semibold px-2 py-1.5 rounded-md cursor-pointer">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-5">
            <h3 className="text-lg text-[#FF7A28] font-bold">Total: Rp{total.toLocaleString("id-ID")}</h3>
            <button onClick={handleCheckout} className="bg-[#FF7A28] text-white font-semibold px-4 py-2 rounded-md cursor-pointer">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
