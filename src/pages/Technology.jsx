import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import reactData from "../data/react.json";
import angularData from "../data/angular.json";
import awsData from "../data/aws.json";
import dockerData from "../data/docker.json";
import firebaseData from "../data/firebase.json";
import framerMotionData from "../data/framer-motion.json";
import githubData from "../data/github.json";
import jenkinsData from "../data/jenkins.json";
import kubernetesData from "../data/kubernetes.json";
import mongoDBData from "../data/mongodb.json";
import mysqlData from "../data/mysql.json";
import nodejsData from "../data/nodejs.json";
import pythonData from "../data/python.json";
import tailwindcssData from "../data/tailwindcss.json";
import terraformData from "../data/terraform.json";
import viteData from "../data/vite.json";

const sections = [
  "Inicializar proyecto",
  "Instalar librerías",
  "Estructura básica",
  "Comandos útiles",
  "Tips & extras",
];

const contentByTech = {
  react: reactData,
  angular: angularData,
  aws: awsData,
  docker: dockerData,
  firebase: firebaseData,
  framermotion: framerMotionData,
  github: githubData,
  jenkins: jenkinsData,
  kubernetes: kubernetesData,
  mongodb: mongoDBData,
  mysql: mysqlData,
  nodejs: nodejsData,
  python: pythonData,
  tailwindcss: tailwindcssData,
  terraform: terraformData,
  vite: viteData,
};

export default function Technology() {
  const { worldId, techId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [content, setContent] = useState({});
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const techKey = techId.toLowerCase();
    if (contentByTech[techKey]) {
      setContent(contentByTech[techKey]);
    }
  }, [techId]);

  const copyToClipboard = (text, index) => {
    const codeBlock = text.match(/```bash\n([\s\S]*?)```/);
    const codeToCopy = codeBlock ? codeBlock[1] : text;

    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopied(false);
      setCopiedIndex(null);
    }, 2000);
  };

  const renderContent = (contentSection) => {
    if (!contentSection || !Array.isArray(contentSection)) return "Contenido no disponible.";

    const fullText = contentSection.join("\n");
    const parts = fullText.split(/```(?:bash|jsx)?\n|```/);

    return parts.map((part, index) => {
      if (!part) return null;

      if (index % 2 === 0) {
        return (
          <p key={index} className="mb-4 whitespace-pre-line">
            {part}
          </p>
        );
      }

      return (
        <div key={index} className="relative">
          <div className="bg-slate-800 text-gray-200 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
            {part.split("\n").map((line, lineIndex) => (
              <div key={lineIndex} className="py-1">
                {line}
              </div>
            ))}
          </div>
          <button
            onClick={() => copyToClipboard(part, index)}
            className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded p-1 text-xs flex items-center"
          >
            {copied && copiedIndex === index ? "¡Copiado!" : "Copiar"}
          </button>
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex bg-[#12141f] bg-dots"
    >
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-screen w-64 bg-slate-900 p-6 border-r border-slate-700 transition-transform duration-300 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 capitalize text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
          {techId.replace(/-/g, " ")}
        </h2>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li
              key={section}
              onClick={() => {
                setActiveSection(section);
                setShowSidebar(false);
              }}
              className={`cursor-pointer px-3 py-2 rounded-md text-sm ${
                activeSection === section
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-800"
              }`}
            >
              {section}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <span className="flex gap-4 items-center mb-6 flex-wrap">
          {/* Botón toggle menú móvil */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden text-white border border-slate-700 bg-slate-800 p-2 rounded-lg cursor-pointer hover:bg-slate-700 transition"
          >
            {showSidebar ? (<FaTimes className="m-1 h-4 w-5" />) : (<FaBars className="m-1 h-4 w-5" />)}
          </button>

          {/* Botón Atrás */}
          <button
            onClick={() => navigate(`/world/${worldId}`)}
            className="text-white border border-slate-700 bg-slate-800 p-2 rounded-lg cursor-pointer hover:bg-slate-700 transition"
          >
            Atrás
          </button>

          <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            {activeSection}
          </h3>
        </span>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={activeSection}
          className="bg-slate-900 border border-slate-700 p-6 rounded-lg shadow-lg min-h-[300px] text-gray-200"
        >
          {renderContent(content[activeSection])}
        </motion.div>
      </main>
    </motion.div>
  );
}