import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Text, useProgress } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { useState, useRef, Suspense, useEffect } from "react";
import GalaxyBackground from "./GalaxyBackground";
import WorldPlanet from "./WorldPlanet";
import useIsMobile from "../../hooks/useIsMobile";
import LoadingScreen from "../LoadingScreen";
import Moon from "./Moon";

// Componente para manejar la posición de la cámara
function CameraController({ cameraY }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.y = cameraY;
  }, [camera, cameraY]);
  
  return null;
}

function UniverseContent({ cameraY }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  // Debugging para verificar cambios en el estado de hover
  useEffect(() => {
    console.log("Planeta en hover:", hoveredPlanet);
  }, [hoveredPlanet]);

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
      {/* Controlador de cámara */}
      {isMobile && <CameraController cameraY={cameraY} />}
      
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
            onPointerOver={() => setHoveredPlanet(planet.name)}
            onPointerOut={() => setHoveredPlanet(null)}
          />
          
          {!isMobile && hoveredPlanet === planet.name && (
            <Moon planetPosition={planet.position} />
          )}
          
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
          enabled={!selectedPlanet && !isMobile}
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
  const [cameraY, setCameraY] = useState(0);

  const moveCameraY = (direction) => {
    setCameraY(prev => {
      const newY = prev + (direction * 5);
      return Math.max(-15, Math.min(newY, 5));
    });
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <Suspense fallback={null}>
          <UniverseContent cameraY={cameraY} />
          <LoadingManager setIsLoading={setIsLoading} />
        </Suspense>
      </Canvas>
      
      {/* Botones de navegación para móviles */}
      {isMobile && !isLoading && (
        <div className="fixed bottom-10 right-5 flex flex-col space-y-2 z-50">
          <button 
            onClick={() => moveCameraY(1)} 
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white"
            aria-label="Subir"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
          <button 
            onClick={() => moveCameraY(-1)} 
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white"
            aria-label="Bajar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}