import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OrderItem {
  productId: {
    _id: string;
    name: string;
    model: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/orders`);

        // Ensure orders is always an array, even if backend response is empty or malformed
        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch orders");
        toast.error(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-20">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Safeguard against undefined or null orders */}
      {(orders?.length ?? 0) === 0 && !loading && (
        <p>You have no orders yet.</p>
      )}

      {orders?.map((order) => (
        <div key={order._id} className="border rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
            <span
              className={`px-3 py-1 rounded text-sm ${
                order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          <p className="text-gray-600 mb-2">
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Shipping Address:</h3>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}
            </p>
            <p>
              {order.address.zip}, {order.address.country}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Items:</h3>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li key={item.productId._id} className="border p-3 rounded-lg">
                  <p>
                    <strong>
                      {item.productId.name} ({item.productId.model})
                    </strong>
                  </p>
                  <p>Price: ₹{item.productId.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
