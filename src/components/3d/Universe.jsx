import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, useProgress } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { useState, Suspense, useEffect } from "react";
import GalaxyBackground from "./GalaxyBackground";
import WorldPlanet from "./WorldPlanet";
import useIsMobile from "../../hooks/useIsMobile";
import LoadingScreen from "../LoadingScreen";
import useVerticalScrollCamera from "../../hooks/useVerticalScrollCamera";

function UniverseContent() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Usa el hook mejorado
  useVerticalScrollCamera(isMobile);

  const planets = isMobile
    ? [
        {
          name: "Frontend",
          position: [0, 0, 0],
          scale: 0.5,
          texture: "/textures/frontend.png",
          id: "frontend"
        },
        {
          name: "Backend",
          position: [0, -5, 0],
          scale: 0.5,
          texture: "/textures/backend.png",
          id: "backend"
        },
        {
          name: "Bases de Datos",
          position: [0, -10, 0],
          scale: 0.5,
          texture: "/textures/db.png",
          id: "bases-de-datos"
        },
        {
          name: "Más tecnologías",
          position: [0, -15, 0],
          scale: 0.5,
          texture: "/textures/moretech.png",
          id: "mas-tecnologias"
        },
      ]
    : [
        {
          name: "Frontend",
          position: [-8 , -2, 0],
          scale: 1,
          texture: "/textures/frontend.png",
          id: "frontend"
        },
        {
          name: "Backend",
          position: [-3, -2, 0],
          scale: 1,
          texture: "/textures/backend.png",
          id: "backend"
        },
        {
          name: "Bases de Datos",
          position: [2, -2, 0],
          scale: 1,
          texture: "/textures/db.png",
          id: "bases-de-datos"
        },
        {
          name: "Más tecnologías",
          position: [7, -2, 0],
          scale: 1,
          texture: "/textures/moretech.png",
          id: "mas-tecnologias"
        },
      ];

  const handlePlanetClick = (planetName) => {
    const planet = planets.find(p => p.name === planetName);
    if (planet) {
      setSelectedPlanet(planetName);
      setTimeout(() => {
        navigate(`/world/${planet.id}`);
      }, 500);
    }
  };

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      <GalaxyBackground />

      {planets.map((planet, i) => (
        <group key={i}>
          <WorldPlanet
            name={planet.name}
            position={planet.position}
            textureURL={planet.texture}
            scale={planet.scale}
            onClick={handlePlanetClick}
            isSelected={selectedPlanet === planet.name}
          />
          <Text
            position={[planet.position[0], planet.position[1] + 2.2, planet.position[2]]}
            fontSize={isMobile ? 0.4 : 0.6}
            color="white"
            anchorX="center"
            anchorY="middle"
            visible={!selectedPlanet || selectedPlanet === planet.name}
          >
            {planet.name}
          </Text>
        </group>
      ))}

      {!isMobile && (
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enabled={!selectedPlanet && !isMobile} // Deshabilita OrbitControls en móvil
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          maxAzimuthAngle={0}
          minAzimuthAngle={0}
        />
      )}
    </>
  );
}

function LoadingManager({ setIsLoading }) {
  const { progress, loaded } = useProgress();
  
  useEffect(() => {
    if (loaded && progress === 100) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [progress, loaded, setIsLoading]);

  return null;
}

export default function Universe() {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const canvasRef = useRef();

  // Asegurar que el canvas capture eventos táctiles correctamente
  useEffect(() => {
    if (canvasRef.current && isMobile) {
      const canvas = canvasRef.current;
      
      // Deshabilitar el comportamiento predeterminado de scroll en el canvas
      const preventScroll = (e) => {
        e.preventDefault();
      };
      
      canvas.addEventListener('touchmove', preventScroll, { passive: false });
      
      return () => {
        canvas.removeEventListener('touchmove', preventScroll);
      };
    }
  }, [isMobile]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Canvas 
        ref={canvasRef}
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ 
          touchAction: "none", // Importante para eventos táctiles
          height: "100vh", 
          width: "100vw",
          position: "fixed", // Para que no haya scroll del navegador
          top: 0,
          left: 0
        }}
        onCreated={({ gl }) => {
          // Asegurarse de que el canvas tenga el tamaño correcto
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
      >
        <Suspense fallback={null}>
          <UniverseContent />
          <LoadingManager setIsLoading={setIsLoading} />
        </Suspense>
      </Canvas>
      
      {/* Indicador de scroll más visible */}
      {isMobile && !isLoading && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white bg-black/50 px-4 py-2 rounded-full z-50">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
            <span className="text-sm font-medium mt-1">Desliza para explorar</span>
          </div>
        </div>
      )}
    </>
  );
}