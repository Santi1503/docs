import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function Moon({ planetPosition }) {
  const moonRef = useRef();
  
  // Establece la posición inicial de la luna
  useEffect(() => {
    if (moonRef.current) {
      moonRef.current.position.set(
        planetPosition[0] + 2, 
        planetPosition[1] + 0.5, 
        planetPosition[2]
      );
    }
  }, [planetPosition]);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (moonRef.current) {
      const radius = 2; // Distancia al planeta
      const speed = 1.5; // Velocidad de rotación
      
      // Calculamos la posición orbital
      moonRef.current.position.x = planetPosition[0] + Math.cos(t * speed) * radius;
      moonRef.current.position.z = planetPosition[2] + Math.sin(t * speed) * radius;
      moonRef.current.position.y = planetPosition[1] + 0.5; // Ligeramente arriba del planeta
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial 
        color="#CCCCCC" 
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}