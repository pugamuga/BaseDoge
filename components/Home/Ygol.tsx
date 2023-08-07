import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function Ygol(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
): JSX.Element {
  return (
    <div {...props}>
      <div className=" relative  md:h-4 md:w-4 h-2 w-2">
        <div className="absolute md:w-4 h-[1px] w-2 bg-white " />
        <div className="absolute w-[1px] md:h-4 h-2 bg-white" />
      </div>
    </div>
  );
}
