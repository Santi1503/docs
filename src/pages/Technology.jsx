import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import reactData from "../data/react.json"

const sections = [
    "Inicializar proyecto",
    "Instalar librerias",
    "Estructura básica",
    "Comandos útiles",
    "Tips & extras",
]

const contentByTech = {
    react: reactData
}

export default function Technology() {
    const { techId } = useParams()
    const [activeSection, setActiveSection] = useState(sections[0])
    const [content, setContent] = useState({})

    useEffect(() => {
        const techKey = techId.toLocaleLowerCase()
        if (contentByTech[techKey]) {
            setContent(contentByTech[techKey])
        }
    }, [techId])

    return (
        <div className="min-h-screen flex bg-white">
            <aside className="w-64 bg-gray-100 p-6 border-r">
                <h2 className="text-xl font-bold mb-4 capitalize">{techId.replace(/-/g, " ")}</h2>
                <ul className="space-y-2">
                    {sections.map((section) => (
                        <li
                         key={section}
                         onClick={() => setActiveSection(section)}
                         className={`cursor-pointer px-3 py-2 rounded-md text-sm ${
                            activeSection === section
                             ? "bg-blue-500 text-white"
                             : "hover:bg-blue-100"
                         }`}
                        >
                            {section}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="flex-1 p-8">
                <h3 className="text-2xl font-semibold mb-4">{activeSection}</h3>
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner min-h-[300px]">
                    {content[activeSection] || "Contenido no disponible."}
                </div>
            </main>
        </div>
    )
}