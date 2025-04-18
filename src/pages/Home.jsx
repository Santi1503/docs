import Universe from "../components/3d/Universe";
import { motion, AnimatePresence } from "framer-motion";

const letterAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      type: "spring",
      damping: 10,
      stiffness: 100
    }
  })
};

export default function Home() {
  const title = "Explora mi";
  const title2 = "mundo tech";
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617]">
      <Universe />
      
      {/* Título animado con fondo borroso */}
      <AnimatePresence>
        <div className="absolute top-0 left-0 w-full z-10 pt-12 px-4">
          <div className="text-center">
            {/* Fondo borroso */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-xl py-6 px-4 -z-10"
            />
            
            <div className="relative inline-block p-4">
              {title.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
                  initial="initial"
                  animate="animate"
                  className={`inline-block text-4xl sm:text-5xl md:text-6xl font-bold
                    ${char === " " ? "mr-2 sm:mr-4" : ""}
                    bg-gradient-to-r from-white to-blue-200
                    text-transparent bg-clip-text
                    drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="relative inline-block p-4">
              {title2.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
                  initial="initial"
                  animate="animate"
                  className={`inline-block text-4xl sm:text-5xl md:text-6xl font-bold
                    ${char === " " ? "mr-2 sm:mr-4" : ""}
                    bg-gradient-to-r from-white to-blue-200
                    text-transparent bg-clip-text
                    drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            {/* Línea decorativa animada */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent
                max-w-2xl mx-auto mt-4"
            />
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}