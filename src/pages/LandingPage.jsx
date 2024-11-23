import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo-Binus.png";
import Background from "../assets/LP-Wallpaper.png";

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
      <div className="absolute inset-0 bg-orange-200 opacity-40"></div>

      <div className="relative text-center px-4">
        {/* Logo animation */}
        <motion.img
          alt="Logo"
          src={Logo}
          className="mx-auto h-32 sm:h-40"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <figure className="mt-8">
          <div className="flex flex-row sm:flex-row sm:justify-center sm:space-x-4">
            {/* Responsive animations for text */}
            <motion.span
              className="font-edu text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 mx-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            >
              Snake
            </motion.span>
            <motion.span
              className="font-edu text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              and
            </motion.span>
            <motion.span
              className="font-edu text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 mx-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            >
              Ladder
            </motion.span>
          </div>

          {/* Play button */}
          <figcaption className="mt-10">
            <motion.button
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base"
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