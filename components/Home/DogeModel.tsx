import {
  CubicBezierLine,
  Html,
  Line,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import useMouseMove from "../../hooks/useMouseMove";
import {
  fakeProgressLoading,
  glitch,
  progressLoading,
  userWidthState,
} from "../../state/recoilState";
import GlassesVR from "./GlassesVR";

interface Iprops{
  currentY:number
}

export default function DogeModel({currentY}:Iprops): JSX.Element {
  const [userWidth, setUserWidth] = useRecoilState<number>(userWidthState);
  const [loading, setLoading] = useRecoilState<number>(progressLoading);
  const [glitchOn, setGlitchOn] = useRecoilState<boolean>(glitch);
  const [fakeLoader, setfakeLoader] =
    useRecoilState<number>(fakeProgressLoading);

  const { progress } = useProgress();

  const posEye = useMouseMove();

  const dogeMain = useGLTF("./models/body/body.gltf");
  const vrHelmet = useGLTF("./models/body/helmet.glb");

  const dogeMainAnim = useAnimations(dogeMain.animations);
  const vrHelmetAnimMesh = useAnimations(vrHelmet.animations);

  const camera = useThree((state) => state.camera);

  const lightOneRef = useRef<any>();
  const lightTwoRef = useRef<any>();

  useEffect(() => {
    // setLoading(progress);
    setLoading(100);
    dogeMainAnim.actions?.IDLE?.play();
    vrHelmetAnimMesh.actions?.IDLE_VR?.play();
  }, []); 

  useFrame((state, delta) => {
    if (fakeLoader === 100) {
      if (lightOneRef.current.intensity < 0.3) {
        lightOneRef.current.intensity += 0.001;
      }
    }
    if (fakeLoader === 100) {
      if (lightTwoRef.current.intensity < 1) {
        lightTwoRef.current.intensity += 0.005;
      }
    }
    state.camera.lookAt(0, 8, 0);
    if (userWidth >= 770) {
      camera.zoom = 75;
    } else {
      camera.zoom = 40;
    }
  });

  return (
    <>
      <directionalLight
        ref={lightTwoRef}
        position={[0, 2, -5]}
        intensity={0}
        color={"white"}
      />

      <directionalLight ref={lightOneRef} position={[0, 3, 2]} intensity={0} />
      <primitive ref={dogeMainAnim.ref} object={dogeMain.scene} />
      <ambientLight intensity={1} />

      <mesh
        onPointerEnter={() => {
          setGlitchOn(true);
        }}
        onPointerLeave={() => {
          setGlitchOn(false);
        }}
        onClick={() => {
          setGlitchOn((prev) => !prev);
        }}
        scale={5}
        position={userWidth >= 770 ? [0, 0, -10] : [0, 2, -10]}
      >
        <sphereGeometry />
        <meshBasicMaterial color={"black"} />
      </mesh>
      <Html center position={[0, 0, -7]}>
        <div
          onClick={() => {
            setGlitchOn((prev) => !prev);
          }}
          className="relative "
        >
          <div
            id="grad"
            className="md:w-[290px] w-[180px] h-[320px]  md:h-[320px] bg-black "
          />
          <div className="bg-black w-[280px] h-[80px] md:w-[380px] md:h-[120px] md:bottom-[-120px] absolute bottom-0 transform left-1/2 -translate-x-1/2 " />
        </div>
      </Html>
      <group
        //@ts-ignore
        ref={vrHelmetAnimMesh.ref}
      >

        <mesh
          //@ts-ignore
          geometry={vrHelmet.nodes.Cube007.geometry}
          //@ts-ignore
          material={vrHelmet.nodes.Cube007.material}
        />
        <mesh
          //@ts-ignore
          geometry={vrHelmet.nodes.Cube007_1.geometry}
          //@ts-ignore
          material={vrHelmet.nodes.Cube007_1.material}
        />
        <mesh
          //@ts-ignore
          geometry={vrHelmet.nodes.Cube007_2.geometry}
          //@ts-ignore
          material={vrHelmet.nodes.Cube007_2.material}
        />
        <Html
          onClick={() => {
            setGlitchOn((prev) => !prev);
          }}
          transform
          position={[0, 0, 0.746]}
          prepend={true}
          //@ts-ignore
          occlude={[vrHelmetAnimMesh.ref]}
          center
          className="mt-[6px]"
        >
          <GlassesVR fakeLoader={fakeLoader} currentY={currentY}/>
        </Html>
      </group>
    </>
  );
}
