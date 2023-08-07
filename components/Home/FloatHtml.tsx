import Border from "./Border";

export default function FloatHtml({children}:any):JSX.Element {
  return (
    <div className="h-[200px] w-[200px] hover:bg-black/60 bg-black/0 tr-300  backdrop-blur-sm ">
      <Border isBack position="w-full h-full"/>
      {children}
    </div>
  ) 
}