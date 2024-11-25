import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo-Binus.png";
import Background from "../assets/images/LP-Wallpaper.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const handlePlayClick = () => {
    navigate("/decision");
  };

  return (
    <section
      className="relative flex items-center justify-center h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Overlay with full responsiveness */}
      <div className="absolute inset-0 bg-orange-200 opacity-30"></div>

      {/* Logo in top-right corner */}
      <motion.img
        src={Logo}
        alt="Logo"
        className="absolute top-4 right-4 h-16 sm:h-20 lg:h-20" // Adjust size responsively
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <div className="relative text-center px-4">
        <figure className="mt-8">
          <div className="flex flex-row sm:flex-row sm:justify-center sm:space-x-4">
            {/* Responsive animations for text */}
            <motion.span
              className="font-bungee text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 mx-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            >
              Snakes
            </motion.span>
            <motion.span
              className="font-bungee text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              And
            </motion.span>
            <motion.span
              className="font-bungee text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 mx-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            >
              Ladders
            </motion.span>
          </div>

          {/* Play button */}
          <figcaption className="mt-10">
            <motion.button
              className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
              onClick={handlePlayClick}
            >
              Play
            </motion.button>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}