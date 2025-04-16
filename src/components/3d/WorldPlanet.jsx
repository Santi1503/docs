import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function WorldPlanet({ position, textureURL }) {
  const meshRef = useRef();

  const texture = useLoader(TextureLoader, textureURL);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        map={texture}
      />
    </mesh>
  );
}