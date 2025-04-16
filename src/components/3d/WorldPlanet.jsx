import { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Vector3 } from "three";

export default function WorldPlanet({ position, textureURL, onClick, isSelected, name }) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, textureURL);

  const [targetScale, setTargetScale] = useState([1, 1, 1]);
  const [targetPosition, setTargetPosition] = useState(position);

  useEffect(() => {
    if (isSelected) {
      setTargetScale([4, 4, 4]);
      setTargetPosition([0, 0, 7]);
    } else {
      setTargetScale([1, 1, 1]);
      setTargetPosition(position);
    }
  }, [isSelected, position]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (mesh) {
      // Rotación si no está seleccionado
      if (!isSelected) {
        mesh.rotation.y += 0.002;
      }

      // Interpolación suave de posición y escala
      mesh.position.lerp(new Vector3(...targetPosition), 0.05);
      mesh.scale.lerp(new Vector3(...targetScale), 0.05);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={targetScale}
      onClick={(e) => {
        e.stopPropagation();
        onClick(name);
      }}
    >
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}