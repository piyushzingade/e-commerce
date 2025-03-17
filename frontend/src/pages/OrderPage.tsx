import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Types
interface CartItem {
  productId: {
    _id: string;
    name: string;
    model: string;
    price: number;
  };
  quantity: number;
}

export default function OrderPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Structured address fields to match the backend schema
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch cart items on load
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/cart`);
        setCartItems(data.items);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    fetchCartItems();
  }, []);

  const placeOrder = async () => {
    setLoading(true);
    setError("");
    toast.info("Placing your order...");

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/order`, {
        paymentMethod,
        shippingAddress: address, // ✅ Change this line
      });


      toast.success("Order placed successfully!");
      setCartItems([]); // Clear cart in frontend

      // Redirect to orders page after successful order placement
      setTimeout(() => {
        navigate("/orders");
      }, 1500); // Small delay to show success message
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to place order";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-20">
      <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>

      {/* Cart Items Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.productId._id} className="border p-4 rounded-lg">
                <p className="font-medium">
                  {item.productId.name} ({item.productId.model})
                </p>
                <p>Price: ₹{item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Shipping Address & Payment Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>

        <div className="space-y-4">
          {/* Address Fields */}
          <div>
            <label className="block font-medium">Street</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="Enter street address"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">City</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block font-medium">State</label>
              <input
                type="text"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Enter state"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">ZIP Code</label>
              <input
                type="text"
                value={address.zip}
                onChange={(e) =>
                  setAddress({ ...address, zip: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Enter ZIP code"
              />
            </div>
            <div>
              <label className="block font-medium">Country</label>
              <input
                type="text"
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Enter country"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-medium">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="COD">Cash on Delivery</option>
            </select>
          </div>

          {/* Place Order Button */}
          <button
            onClick={placeOrder}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
