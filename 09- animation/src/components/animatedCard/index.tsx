import { motion } from "framer-motion";

const AnimatedCard = () => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-lg overflow-hidden"
      initial={{ opacity: 0, x: "-100%", y: "100%" }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="bg-red-600"> Image </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Card Title</h2>
        <p className="text-gray-700">This is a simple card description.</p>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
