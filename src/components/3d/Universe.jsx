import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import GalaxyBackground from "./GalaxyBackground";
import WorldPlanet from "./WorldPlanet";
import useIsMobile from "../../hooks/useIsMobile";

export default function Universe() {
  const isMobile = useIsMobile();

  const planets = [
    {
      name: "Frontend",
      position: isMobile ? [-3, 3, 0] : [-8 , -2, 0],
      scale: isMobile ? 0.8 : 1,
      texture: "/textures/frontend.png",
    },
    {
      name: "Backend",
      position: isMobile ? [3, 3, 0] : [-3, -2, 0],
      scale: isMobile ? 0.8 : 1,
      texture: "/textures/backend.png",
    },
    {
      name: "Bases de Datos",
      position: isMobile ? [-3, -3, 0] : [2, -2, 0],
      scale: isMobile ? 0.8 : 1,
      texture: "/textures/db.png",
    },
    {
      name: "Más tecnologías",
      position: isMobile ? [3, -3, 0] : [7, -2, 0],
      scale: isMobile ? 0.8 : 1,
      texture: "/textures/moretech.png",
    },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      <GalaxyBackground />

      {planets.map((planet, i) => (
        <group key={i}>
          <WorldPlanet
            key={i}
            name={planet.name}
            position={planet.position}
            textureURL={planet.texture}
            scale={planet.scale}
          />
          <Text
              position={[planet.position[0], planet.position[1] + 2.2, planet.position[2]]}
              fontSize={isMobile ? 0.4 : 0.6}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {planet.name}
            </Text>
        </group>
      ))}

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}