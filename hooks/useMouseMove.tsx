import { useEffect, useState } from "react";
interface IProps {
  x: number;
  y: number;
}

export default function useMouseMove() {
  const [posEye, setposEye] = useState<IProps>({ x: 0, y: 0 });

  const mouseMoving = (event: any) => {
    const mouseY = event.clientY;
    const mouseX = event.clientX;
    const screenY = window.innerHeight;
    const screenX = window.innerWidth;
    const positionX = Number(((mouseX / screenX) * 200 - 100).toFixed());
    const positionY = Number(((mouseY / screenY) * 100 - 15).toFixed());
    setposEye({ x: positionX, y: positionY });
  };

  useEffect(() => {
    addEventListener("mousemove", mouseMoving);

    return () => {
      removeEventListener("mousemove", mouseMoving);
    };
  }, []);
  return posEye;
}
