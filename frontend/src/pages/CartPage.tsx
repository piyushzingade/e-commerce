import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/cart`, {
          withCredentials: true,
        });
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();

    // ✅ Listen for cart updates and re-fetch the cart
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, []);


  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading, please wait...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Selected Items</h2>
      <div className="border rounded-lg p-4 md:p-6 shadow-lg bg-white">
        {cartItems.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center justify-between border-b py-4"
          >
            <img
              src={item.productId.images[0] || "/placeholder.jpg"}
              alt={item.productId.name}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1 px-4">
              <p className="text-lg font-medium">{item.productId.name}</p>
              <p className="text-gray-600">₹{item.productId.price}</p>
            </div>
            <div className="flex items-center">
              <button className="px-3 py-1 border rounded-md">-</button>
              <span className="px-4">{item.quantity}</span>
              <button className="px-3 py-1 border rounded-md">+</button>
            </div>
          </div>
        ))}
        <div className="flex justify-between text-lg font-semibold mt-4">
          <span>Subtotal ({cartItems.length} items):</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full bg-blue-500 text-white py-3 mt-6 text-lg font-bold rounded-md shadow-md hover:bg-blue-600">
        Proceed To Buy
      </button>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src="hero1.png" alt="Ad 1" className="w-full rounded-lg shadow-md" />
        <img src="hero2.png" alt="Ad 2" className="w-full rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default CartPage;