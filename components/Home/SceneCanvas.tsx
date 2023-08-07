import { Float, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion as m } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userWidthState } from "../../state/recoilState";
import Border from "./Border";
import DogeModel from "./DogeModel";

interface Iprops {
  currentY: number;
}

export default function SceneCanvas({ currentY }: Iprops): JSX.Element {
  const [userWidth, setUserWidth] = useRecoilState<number>(userWidthState);

  const [dogeSmall, setDogeSmall] = useState<boolean>(false);
  const [dogeBig, setDogeBig] = useState<boolean>(false);

  const cameraZoom: number = userWidth >= 770 ? 75 : 40;

  useEffect(() => {
    console.log(dogeBig);
    console.log(dogeSmall);
  }, [dogeBig, dogeSmall]);
  return (
    <>
      <Canvas
        orthographic
        camera={{
          position: [0, 21, 24],
          zoom: cameraZoom,
        }}
      >
        <Float speed={1} floatIntensity={0.1}>
          <Html
            position={userWidth >= 770 ? [-6, 7, 0] : [0, 15, 0]}
            className="select-none  cursor-pointer opacity-20 hover:opacity-100 tr-300 scale-75 hover:scale-100"
            transform
            center
          >
            <div
              onMouseEnter={() => {
                setDogeBig(true);
              }}
              onMouseLeave={() => {
                setDogeBig(false);
              }}
              className="h-[200px] w-[200px] hover:bg-black/60 bg-black/0 tr-300  backdrop-blur-sm relative"
            >
              <Border isBack position="w-full h-full" />
              <AnimatePresence>
                {dogeBig && (
                  <m.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src="./assets/doge_big.png"
                    alt="big"
                    className=" absolute w-[100px] mid"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {dogeBig && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute mid text-white font-stalinist text-[8px] w-full"
                  >
                    <p className="mb-[150px]  w-full text-center">
                      Others at 26
                    </p>
                    <p className="mt-[150px]  w-full text-center">Children, work, business...</p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </Html>
        </Float>
        <Float speed={1} floatIntensity={0.15}>
          <Html
            position={userWidth >= 770 ? [6, 7, 0] : [0, 4, 1]}
            className="select-none  cursor-pointer opacity-20 hover:opacity-100 tr-300 scale-75 hover:scale-100"
            transform
            center
          >
            <div
              onMouseEnter={() => {
                setDogeSmall(true);
              }}
              onMouseLeave={() => {
                setDogeSmall(false);
              }}
              className="h-[200px] w-[200px] hover:bg-black/60 bg-black/0 tr-300  backdrop-blur-sm relative"
            >
              <Border isBack position="w-full h-full" />
              <AnimatePresence>
                {dogeSmall && (
                  <m.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src="./assets/doge_small.png"
                    alt="big"
                    className=" absolute w-[50px] mid"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {dogeSmall && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute mid text-white font-stalinist text-[8px] w-full"
                  >
                    <p className="mb-[150px] w-full text-center">Me at 26</p>
                    <p className="mt-[150px] w-full text-center">
                      Create  <br /> big doge site
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </Html>
        </Float>
        <Suspense>
          <DogeModel currentY={currentY} />
        </Suspense>
      </Canvas>
    </>
  );
}
