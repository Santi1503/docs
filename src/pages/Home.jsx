import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Universe from "../components/3d/Universe";

const worlds = [
  { name: "Frontend", color: "from-pink-400 to-pink-600" },
  { name: "Backend", color: "from-blue-400 to-blue-600" },
  { name: "Bases de Datos", color: "from-green-400 to-green-600" },
  { name: "Más tecnologías", color: "from-yellow-400 to-yellow-600" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fondo 3D */}
      <div className="absolute inset-0 z-0">
        <Universe />
      </div>

      {/* Contenido UI encima */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
      </div>
    </div>
  );
}