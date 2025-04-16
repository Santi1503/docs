import { motion } from "framer-motion";

const Rocket = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <motion.path
      d="M12 2L8 7H16L12 2Z" // Punta del cohete
      fill="currentColor"
    />
    <motion.path
      d="M9 7H15V15H9V7Z" // Cuerpo del cohete
      fill="currentColor"
    />
    <motion.path
      d="M8 15L12 13L16 15V17L12 15L8 17V15Z" // Base del cohete
      fill="currentColor"
    />
    <motion.path
      d="M11 17H13V19H11V17Z" // Motor del cohete
      fill="currentColor"
    />
    <motion.g>
      {/* Llamas del cohete */}
      <motion.path
        initial={{ scale: 1, y: 0 }}
        animate={{
          scale: [1, 1.5, 1],
          y: [0, 2, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        d="M10 19L12 22L14 19H10Z"
        fill="#FFA500"
      />
    </motion.g>
  </svg>
);

const LoadingDots = () => {
  return (
    <div className="inline-flex space-x-1">
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        className="text-white"
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        className="text-white"
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        className="text-white"
      >
        .
      </motion.span>
    </div>
  );
};

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]"
    >
      <div className="text-center">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8 mx-auto"
        >
          <Rocket />
        </motion.div>
        
        <div className="flex items-center justify-center">
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white text-lg font-medium"
          >
            Preparando el universo
          </motion.p>
          <LoadingDots />
        </div>
      </div>
    </motion.div>
  );
} 