import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const worlds = [
    {name: "Frontend", color: "from-pink-400 to-pink-600"},
    {name: "Backend", color: "from-blue-400 to-blue-600"},
    {name: "Bases de Datos", color: "from-green-400 to-green-600"},
    {name: "Más tecnologías", color: "from-yellow-400 to-yellow-600"},
]

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
            <h1 className="text-4xl font-bold mb-10">Explora mis mundos tecnológicos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap 6">
                {worlds.map((world, index) => (
                    <motion.div
                     key={index}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => navigate(`/world/${world.name.toLowerCase().replace(/\s/g, '-')}`)}
                     className={`bg-gradient-to-br ${world.color} text-white p-6 rounded-2xl shadow-lg cursor-pointer w-64 h-40 flex items-center justify-center text-2xl font-semibold`}
                    >
                        {world.name}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}