import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { TbToolsKitchen2Off } from "react-icons/tb";

const OrderHistory = () => {
  const { orderHistory } = useShop();
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="mx-4 xl:mx-20 2xl:mx-60 my-5 lg:my-10">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold mb-5">Riwayat Pesanan</h1>
      </div>

      {orderHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <TbToolsKitchen2Off className="text-4xl lg:text-6xl text-gray-400 mx-auto my-4" />
          <p className="text-center text-base text-gray-500">Tidak ada produk yang ditemukan.</p>
        </div>
      ) : (
        <div>
          {orderHistory.map((order, index) => (
            <div key={index}>
              <div>
                <h2 className="text-center">Pesanan #{orderHistory.length - index}</h2>
                <p>{formatDate(order.date)}</p>
              </div>
              <div className="border border-[#FF7A28] rounded-lg p-4 mt-4 flex justify-between items-center">
                <div>
                  {order.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} width={80} height={80} className="mb-4" />
                        <div>
                          <h3>{item.name}</h3>
                          <p>
                            {item.quantity} × Rp{item.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <strong>Total: Rp{order.total.toLocaleString("id-ID")}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center mt-5">
        <Link to="/home" className=" text-blue-600 hover:underline cursor-pointer">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default OrderHistory;
