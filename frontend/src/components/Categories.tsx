import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Processor", img: "cpu.png" },
  { name: "Graphic Card", img: "gc.png" },
  { name: "RAM", img: "ram.png" },
  { name: "Motherboards", img: "mb.png" },
  { name: "Storage", img: "ns.png" },
  { name: "Accessories", img: "kb.png" },
];

const Categories = () => {
  const navigate= useNavigate()
  return (
    <div className="text-center py-12 ">
      <h2 className="text-4xl font-bold mb-8 text-gray-900 tracking-wide">
        CATEGORIES
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-6">
        {categories.map((category, index) => (
          <div key={category.name} className="flex flex-col  items-center">
            <motion.div
              className="bg-white shadow-xl rounded-3xl p-8 flex justify-center items-center transition-transform duration-300 hover:shadow-2xl w-40 md:w-48 h-40 md:h-48 shadow-b-3 shadow-r-3"
              whileHover={{ scale: 1.05, rotate: 2 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => {
                navigate("/processors")
              }}
            >
              <motion.img
                src={category.img}
                alt={category.name}
                className="w-36 h-36 md:w-44 md:h-44"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <p className="text-lg font-semibold text-gray-800 mt-2">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
