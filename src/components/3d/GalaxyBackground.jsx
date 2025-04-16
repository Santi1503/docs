import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function GalaxyBackground() {
  const texture = useLoader(THREE.TextureLoader, "/textures/galaxy.png"); // cambia por tu imagen

  return (
    <mesh>
      <sphereGeometry args={[60, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}