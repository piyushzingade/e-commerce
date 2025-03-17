import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Processor {
  _id: string;
  brand: string;
  model: string;
  price: number;
  stock: number;
  images: string[];
  specifications: {
    cores?: number;
    threads?: number;
    baseClock?: string;
    boostClock?: string;
  };
}

const ProcessorPage = () => {
  const [processors, setProcessors] = useState<Processor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartLoading, setCartLoading] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchProcessors = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products`);
        setProcessors(response.data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProcessors();
  }, []);

  const addToCart = async (productId: string) => {
    setCartLoading((prev) => ({ ...prev, [productId]: true }));
    try {
      await axios.post(
        `${BACKEND_URL}/api/cart/add`,
        { productId, quantity: 1 },
        { withCredentials: true }
      );

      // ✅ Force re-fetch of cart data
      toast.success("Added to the cart!");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.");
    } finally {
      setCartLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading, please wait...
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 py-12">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img src="/i1.jpg" alt="Intel" className="h-20" />
        <h2 className="text-3xl font-bold">Processors</h2>
        <img src="/r1.jpg" alt="Ryzen" className="h-20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {processors.map((processor) => (
          <div
            key={processor._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden p-6 flex flex-col"
          >
            <div className="flex justify-center">
              <img
                src={processor.images[0] || "/placeholder.jpg"}
                alt={processor.model}
                className="w-32 h-32 object-contain"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">{processor.model}</h3>
              <p className="text-gray-600 font-medium">
                Brand: {processor.brand}
              </p>
              <p className="text-gray-700 text-lg font-bold">
                ₹{processor.price}
              </p>
              <p className="text-sm text-green-600">Stock: {processor.stock}</p>
            </div>

            <div className="mt-4 text-sm text-gray-700 border-t pt-4">
              <p>
                <strong>Cores:</strong>{" "}
                {processor.specifications.cores || "N/A"}
              </p>
              <p>
                <strong>Threads:</strong>{" "}
                {processor.specifications.threads || "N/A"}
              </p>
              <p>
                <strong>Base Clock:</strong>{" "}
                {processor.specifications.baseClock || "N/A"}
              </p>
              <p>
                <strong>Boost Clock:</strong>{" "}
                {processor.specifications.boostClock || "N/A"}
              </p>
            </div>

            <button
              onClick={() => addToCart(processor._id)}
              className={`mt-auto w-full py-2 text-white font-semibold rounded-md flex justify-center ${
                processor.brand.toLowerCase() === "intel"
                  ? "bg-blue-600"
                  : "bg-orange-600"
              } hover:opacity-90 transition`}
              disabled={cartLoading[processor._id]}
            >
              {cartLoading[processor._id] ? "Adding..." : "Add To Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessorPage;
