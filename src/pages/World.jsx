import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { techLogos } from "../components/TechLogos"

const techByWorld = {
    frontend: ["React", "Vite", "Angular", "Tailwindcss", "Framer Motion"],
    backend: ["Node.js"],
    "bases-de-datos": ["Firebase", "MongoDB", "MySQL"],
    "mas-tecnologias": ["Jenkins", "Docker", "Git", "Python"],
}

export default function World() {
    const { worldId } = useParams()
    const technologies = techByWorld[worldId] || []
    const navigate = useNavigate()

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-[#12141f] bg-dots px-6 py-10"
        >
            <span className="flex gap-6 justify-start">
            {/* Botón Atrás */}
            <button 
                onClick={() => navigate(-1)} 
                className="text-white border-1 border-white bg-slate-900 p-2 rounded-lg mb-6 cursor-pointer"
            >
                Atrás
            </button>

            <h2 className="inline-block text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-200
                             text-transparent bg-clip-text
                             drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] capitalize">
                {worldId.replace(/-/g, " ")}
            </h2>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {technologies.map((tech, index) => {
                    const LogoComponent = techLogos[tech.toLowerCase()]
                    return (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => 
                                navigate(`/world/${worldId}/${tech.toLowerCase().replace(/\s/g, "-")}`)
                            }
                            className="relative aspect-video rounded-2xl border-4 border-white bg-slate-900 p-6 
                                     shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden
                                     flex flex-col items-center justify-center group"
                        >
                            <div className="text-sky-300 mb-4 transition-transform group-hover:scale-110">
                                {LogoComponent ? <LogoComponent /> : 
                                    <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold">
                                        {tech[0]}
                                    </div>
                                }
                            </div>
                            <h3 className="text-xl font-medium text-center text-white">
                                {tech}
                            </h3>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}