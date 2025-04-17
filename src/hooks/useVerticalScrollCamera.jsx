import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function useVerticalScrollCamera(enabled = true) {
  const state = useThree();
  const [touchStartY, setTouchStartY] = useState(null);
  
  useEffect(() => {
    if (!enabled || !state?.camera) return;
    
    const { camera } = state;
    let cameraY = 0;
    
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY || 0;
      cameraY -= delta * 0.005;
      cameraY = Math.max(-15, Math.min(cameraY, 5)); // Ajusta este rango según sea necesario
      camera.position.y = cameraY;
    };
    
    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };
    
    const handleTouchMove = (e) => {
      if (touchStartY === null) return;
      
      const touchY = e.touches[0].clientY;
      const delta = touchStartY - touchY;
      
      cameraY += delta * 0.01; // Ajusta la sensibilidad
      cameraY = Math.max(-15, Math.min(cameraY, 5));
      camera.position.y = cameraY;
      
      setTouchStartY(touchY);
    };
    
    // Eventos de rueda (desktop)
    window.addEventListener("wheel", handleWheel, { passive: false });
    
    // Eventos táctiles (móvil)
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [state, enabled, touchStartY]);
}