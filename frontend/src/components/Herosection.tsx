import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/hero1.png",
  "/hero2.png",
  "/hero3.png",

]; // Update with actual paths


const sliderImages = [
  "/hero1.png",
  "/hero2.png",
  "/hero3.png",
  "/hero4.png",
  "/hero5.png",
  "/hero6.png",
];
export default function HeroSection() {
    const [index, setIndex] = useState(0);

  return (
    <section className="relative w-full h-auto flex flex-col items-center justify-center mt-12 py-10">
      {/* Static Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-black pb-6"
      >
        <h1 className="text-4xl font-bold">Welcome to Dream Build</h1>
      </motion.div>

      {/* Image Grid */}
      <div className="grid grid-cols-3 w-full ">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: i * 0.2 }}
            className="w-full h-auto flex justify-center items-center"
          >
            <img
              src={src}
              alt={`Hero Image ${i + 1}`}
              className="w-full h-full object-cover rounded-sm shadow-lg"
            />
          </motion.div>
        ))}
      </div>

      <div className="relative w-full max-w-6xl h-[400px] mt-10 overflow-hidden flex justify-center items-center">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-full flex justify-center items-center"
          >
            <img
              src={sliderImages[index]}
              alt="Sliding Image"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
