import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function useVerticalScrollCamera(enabled = true) {
  const { camera } = useThree();
  const yPositionRef = useRef(0);
  const touchStartYRef = useRef(null);
  
  useEffect(() => {
    if (!enabled) return;
    
    // Posición inicial
    yPositionRef.current = camera.position.y;
    
    // Manejo de eventos de rueda para desktop
    const handleWheel = (e) => {
      const delta = e.deltaY;
      yPositionRef.current -= delta * 0.005;
      yPositionRef.current = Math.max(-15, Math.min(yPositionRef.current, 5));
      camera.position.y = yPositionRef.current;
    };
    
    // Manejo de eventos táctiles para móvil
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (touchStartYRef.current === null) return;
      
      // Calculamos cuánto se ha movido el dedo
      const touchY = e.touches[0].clientY;
      const delta = touchStartYRef.current - touchY;
      
      // Actualizamos la posición de la cámara
      yPositionRef.current += delta * 0.02; // Mayor sensibilidad para móviles
      yPositionRef.current = Math.max(-15, Math.min(yPositionRef.current, 5));
      camera.position.y = yPositionRef.current;
      
      // Actualizamos la posición de inicio para el próximo movimiento
      touchStartYRef.current = touchY;
      
      // Prevenimos el scroll del navegador
      e.preventDefault();
    };
    
    // Registramos los eventos
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false }); // Importante usar passive: false
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [camera, enabled]);
}