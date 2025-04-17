// hooks/useVerticalScrollCamera.js
import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export default function useVerticalScrollCamera(enabled = true) {
  const { camera } = useThree();

  useEffect(() => {
    if (!enabled) return;

    let targetY = camera.position.y;

    const handleScroll = (e) => {
      // Puedes ajustar este valor para mayor/menor sensibilidad
      const delta = e.deltaY * 0.02;
      targetY -= delta;

      // Limita el movimiento vertical si quieres (opcional)
      targetY = Math.max(-15, Math.min(5, targetY));
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [camera, enabled]);

  useFrame(() => {
    // Suaviza el movimiento hacia el targetY
    if (enabled) {
      camera.position.y += (targetY - camera.position.y) * 0.1;
    }
  });
}