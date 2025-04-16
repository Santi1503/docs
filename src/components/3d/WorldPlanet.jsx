import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useSpring, animated } from "@react-spring/three";

export default function WorldPlanet({ position, textureURL, onClick, isSelected, name }) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, textureURL);

  const springs = useSpring({
    scale: isSelected ? [4, 4, 4] : [1, 1, 1],
    position: isSelected ? [0, 0, 7] : position,
    config: { mass: 2, tension: 170, friction: 20 }
  });

  useFrame(() => {
    if (meshRef.current && !isSelected) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <animated.mesh
      ref={meshRef}
      position={springs.position}
      scale={springs.scale}
      onClick={(e) => {
        e.stopPropagation();
        onClick(name);
      }}
    >
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        map={texture}
      />
    </animated.mesh>
  );
}