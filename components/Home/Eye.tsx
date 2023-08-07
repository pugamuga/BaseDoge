import {
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";
import useMouseMove from "../../hooks/useMouseMove";



export default function Eye(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
): JSX.Element {
//   const [glitchOn, setGlitchOn] = useRecoilState<boolean>(glitch);
const posEye = useMouseMove()
  return (
    <>
      <div
        // onClick={(e) => {
        //   setGlitchOn((prev) => !prev);
        // }}
        {...props}
      >
        <img
          style={{
            marginLeft: posEye.x/15,
            marginBottom:posEye.y>=0? -posEye.y/16:-posEye.y/2,
          }}
          src="./eye_gif/zrachok.png"
          className=""
        />
        <img
          src="./eye_gif/newEye.gif"
          alt=""
          className="absolute top-0 transform left-1/2 -translate-x-1/2"
        />
      </div>
    </>
  );
}
