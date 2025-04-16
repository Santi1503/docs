import { useNavigate, useParams } from "react-router-dom"

const techByWorld = {
    frontend: ["React", "Vite", "Angular"],
    backend: ["Node.js", "Express", "Firebase functions"],
    "bases-de-datos": ["Firebase", "MongoDB", "MySQL"],
    "mas-tecnologias": ["Jenkins", "Docker", "Git"],
}

export default function World() {
    const { worldId } = useParams()
    const technologies = techByWorld[worldId] || []
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white px-6 py-10">
            <h2 className="text-3xl font-bold mb-6 capitalize">
                {worldId.replace(/-/g, " ")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {technologies.map((tech, index) => (
                    <div 
                     key={index} 
                     onClick={() => 
                        navigate(`/world/${worldId}/${tech.toLowerCase().replace(/\s/g, "-")}`)
                     }
                     className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer text-center text-lg font-medium">
                        {tech}
                    </div>
                ))}
            </div>
        </div>
    )
}