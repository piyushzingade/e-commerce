import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, []);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(
        `${BACKEND_URL}/api/cart/update`,
        { productId, quantity: newQuantity },
        { withCredentials: true }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/cart/remove/${productId}`, {
        withCredentials: true,
      });

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId._id !== productId)
      );

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading, please wait...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Continue Shopping
        </button>
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
              src={item.productId.images?.[0] || "/fallback.jpg"}
              alt={item.productId.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 px-4">
              <p className="text-lg font-medium">{item.productId.name}</p>
              <p className="text-gray-600">₹{item.productId.price}</p>
            </div>
            <div className="flex items-center">
              <button
                className="px-3 py-1 border rounded-md"
                onClick={() =>
                  updateQuantity(item.productId._id, item.quantity - 1)
                }
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                className="px-3 py-1 border rounded-md"
                onClick={() =>
                  updateQuantity(item.productId._id, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                className="ml-4 text-red-500"
                onClick={() => removeItem(item.productId._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between text-lg font-semibold mt-4">
          <span>Subtotal ({cartItems.length} items):</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => {
          navigate("/order");
        }}
        className="w-full bg-blue-500 text-white py-3 mt-6 text-lg font-bold rounded-md shadow-md hover:bg-blue-600"
      >
        Proceed To Buy
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src="hero1.png"
          alt="Ad 1"
          className="w-full rounded-lg shadow-md"
        />
        <img
          src="hero2.png"
          alt="Ad 2"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default CartPage;
