import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Planet({ position, color = "#00bcd4" }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}