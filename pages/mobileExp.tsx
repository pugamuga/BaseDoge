import Link from "next/link";
import { Suspense } from "react";
import { useRecoilState } from "recoil";
import ExpiriencePage from "../components/Expirience/ExpiriencePage";
import WalkingScene from "../components/Expirience/WalkingScene";
import LoaderMobile from "../components/LoaderMobile";
import {
  loadingExperienceState,
  onAnimationEndState,
  userWidthState,
} from "../state/recoilState";

export default function mobileExp(): JSX.Element {
  const [animationEnd, setAnimationEnd] = useRecoilState(onAnimationEndState);
  console.log(animationEnd);

  return (
    <>
      {!animationEnd && <LoaderMobile />}
      <div className="fixed text-white font-stalinist top-5 left-5 z-[20] cursor-pointer">
        <Link href={"/"}>Back</Link>
      </div>
      <div className="w-full h-screen">
        <Suspense>
          <WalkingScene />
        </Suspense>
      </div>
    </>
  );
}
