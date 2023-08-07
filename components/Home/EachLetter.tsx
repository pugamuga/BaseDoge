import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useRecoilState } from "recoil";
import { glitch } from "../../state/recoilState";

interface IProps {
  letter: string;
}

export default function EachLetter({ letter }: IProps): JSX.Element {
  const [glitchOn, setGlitchOn] = useState(true);
  const [glitchOnRec, setGlitchOnRec] = useRecoilState<boolean>(glitch);

  useEffect(() => {
    setTimeout(() => {
      setGlitchOn(false);
    }, 450);
  }, []);
  return (
    <>
      <>
        <m.div
          layout
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          title={letter}
          id={glitchOn || glitchOnRec ? "glitchOn" : "glitch"}
          className="text-center "
        >
          <div className="text-center ">
            <span aria-hidden="true" className="md:inline hidden">
              {letter}
            </span>
          </div>
          <div className="text-center ">{letter}</div>
          <div className="text-center ">
            <span aria-hidden="true" className="md:inline hidden">
              {letter}
            </span>
          </div>
        </m.div>
      </>
    </>
  );
}
