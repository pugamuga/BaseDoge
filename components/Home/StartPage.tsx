import PugamugaText from "./PugamugaText";
import SceneCanvas from "./SceneCanvas";

interface Iprops{
    currentY:number
}

export default function StartPage({currentY}:Iprops):JSX.Element {
  return (
    <>
      <div>
        <PugamugaText />
      </div>
      <div className="w-[100wh] h-[100vh]">
        <SceneCanvas currentY={currentY} />
      </div>
    </>
  )
}