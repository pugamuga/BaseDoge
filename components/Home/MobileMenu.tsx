import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";

interface Iprops {
  isDragable: boolean;
  currentY: number;
}

export default function MobileMenu({
  isDragable,
  currentY,
}: Iprops): JSX.Element {
  const [click, setClick] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setClick(false);
    }, 600);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen  flex flex-col justify-between py-[20vh] items-center z-[22000002] uppercase">
        <Section click={click} delay={click ? 0.1 : 0.6}>
          <Link to="home" spy={true} smooth={true} offset={0} duration={500}>
            Home
          </Link>
        </Section>
        <Section click={click} delay={click ? 0.3 : 0.4}>
          About
        </Section>
        <Section click={click} delay={click ? 0.5 : 0.2}>
          <Link
            to="exp"
            spy={true}
            smooth={true}
            offset={125}
            duration={500}
          >
            Experience
          </Link>
        </Section>
        <Section click={click} delay={click ? 0.7 : 0}>
          Contact
        </Section>
      </div>
    </>
  );
}

function Section({ click, children, delay }: any): JSX.Element {
  const [glitchState, setGlitchState] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setGlitchState(false);
    }, 1500);
  }, []);
  return (
    <>
      <m.p
        transition={{
          delay: delay,
          duration: click ? 1.2 : 0.3,
          easy: click ? "easyIn" : "easeOut",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        id={glitchState ? "glitchOn" : "glitch"}
        className="text-white font-stalinist text-[24px]"
      >
        {children}
      </m.p>
    </>
  );
}
