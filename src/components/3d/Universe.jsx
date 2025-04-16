import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, useProgress } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { useState, Suspense, useEffect } from "react";
import GalaxyBackground from "./GalaxyBackground";
import WorldPlanet from "./WorldPlanet";
import useIsMobile from "../../hooks/useIsMobile";
import LoadingScreen from "../LoadingScreen";

function UniverseContent() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planets = [
    {
      name: "Frontend",
      position: isMobile ? [-3, 1, 0] : [-8 , -2, 0],
      scale: isMobile ? 0.8 : 1,
      texture: "/textures/frontend.png",
      id: "frontend"
    },
    {
      name: "Backend",
      position: isMobile ? [3, 1, 0] : [-3, -2, 0],
      scale: isMobile ? 0.8 : 1,
      texture: "/textures/backend.png",
      id: "backend"
    },
    {
      name: "Bases de Datos",
      position: isMobile ? [-3, -5, 0] : [2, -2, 0],
      scale: isMobile ? 0.8 : 1,
      texture: "/textures/db.png",
      id: "bases-de-datos"
    },
    {
      name: "Más tecnologías",
      position: isMobile ? [3, -5, 0] : [7, -2, 0],
      scale: isMobile ? 0.8 : 1,
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

      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enabled={!selectedPlanet} 
      />
    </>
  );
}

function LoadingManager({ setIsLoading }) {
  const { progress, loaded } = useProgress();
  
  useEffect(() => {
    if (loaded && progress === 100) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Pequeño retraso para asegurar que todo esté renderizado
    }
  }, [progress, loaded, setIsLoading]);

  return null;
}

export default function Universe() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <Suspense fallback={null}>
          <UniverseContent />
          <LoadingManager setIsLoading={setIsLoading} />
        </Suspense>
      </Canvas>
    </>
  );
}