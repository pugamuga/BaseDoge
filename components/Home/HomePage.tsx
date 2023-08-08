import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { useRecoilState } from "recoil";
import {
  fakeProgressLoading,
  heightOfSite,
  userWidthState,
} from "../../state/recoilState";
import Loader from "../Loader";
import MobileMenu from "./MobileMenu";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const baseConfig = {
  chainId: "0x2105", // Base Mainnet
  chainName: "Base",
  nativeCurrency: {
    name: "Base",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://base.blockpi.network/v1/rpc/public"],
};

interface Iprops {
  currentY: number;
}

export default function HomePage({ currentY }: Iprops): JSX.Element {
  const [meta, setMeta] = useState<boolean>(false)
  const [address, setAddress] = useState<string>('')
  const [userWidth, setUserWidth] = useRecoilState<number>(userWidthState);
  const [fakeLoader, setfakeLoader] =
    useRecoilState<number>(fakeProgressLoading);
  const [isDragable, setDragable] = useState<boolean>(false);
  const [heightSite, setHeightSite] = useRecoilState<number>(heightOfSite);

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const account = await signer.getAddress();

        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [baseConfig],
        });
        console.log("Connected to account:", account);
        setMeta(true)
        setAddress(account.toString())
      } catch (error) {
        console.error("User rejected the request:", error);
      }
    } else {
      console.log("MetaMask is not installed!");
    }
  }

  const dragZones = [
    {
      positions: {
        right: userWidth / 2 - 44,
        left: -userWidth / 2 + 44,
        top: 0,
        bottom: 0,
      },
    },
  ];

  useEffect(() => {
    if (currentY < 90) {
      setDragable(false);
    }
    console.log(heightSite);
  }, [currentY]);

  function shortenAddress(address:string, chars = 4) {
    return address
      ? `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
      : '';
  }

  return (
    <>
      <AnimatePresence>{fakeLoader < 100 && <Loader />}</AnimatePresence>
      {/* <AnimatePresence>
        {currentY > 90 && isDragable && (
          <MobileMenu isDragable={isDragable} currentY={currentY} />
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {userWidth >= 770 && fakeLoader === 100 ? (
          <>
            <m.div
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              exit={{ y: 0 }}
              transition={{ delay: 3.1, duration: 1.7, easy: "easeOut" }}
              className=" text-white/100 fixed top-0 pt-3 select-none flex items-center w-screen px-[5vw] justify-between  pb-2 font-stalinist z-[22000000] bg-black/30
          backdrop-blur-sm
          "
            >
              <a
                href="https://twitter.com/onBaseDoge"
                target="blank"
                className="top-btn "
              >
                Twitter
              </a>
              <div>
                <Link
                  to="exp"
                  spy={true}
                  smooth={true}
                  offset={125}
                  duration={500}
                  className="top-btn"
                >
                  Collection
                </Link>
              </div>
              <div>
                <Link
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={150}
                  duration={500}
                  className="top-btn"
                >
                  About
                </Link>
              </div>
              <div>
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={1200}
                  duration={500}
                  className="top-btn bg-white text-black px-2 py-1"
                  onClick={connectWallet}
                >
                  {!meta?'Connect':shortenAddress(address,2)}
                </Link>
              </div>
              <div
                style={{ width: `${heightSite}%` }}
                className=" absolute h-[1px] left-0 bottom-0  bg-white/50 backdrop-blur-sm"
              />
            </m.div>
          </>
        ) : (
          currentY > 90 &&
          fakeLoader === 100 && (
            <m.div
              onClick={() => {
                setDragable(true);
              }}
              drag
              dragConstraints={dragZones[0].positions}
              style={{ left: userWidth / 2 - 40 }}
              className="fixed  z-[22000000] top-1 "
            >
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, easy: "easeOut" }}
                className=" w-20 h-20 bg-black/30  rounded-full 
            border-[1px] border-white/10 backdrop-blur-sm superflex"
              >
                <div className="text-white font-stalinist text-xs">
                  <Link
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                  >
                    At top
                  </Link>
                </div>
              </m.div>

              {/* {currentY > 90 && isDragable && (
                <m.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 25 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 1.4, easy: "easeOut" }}
                  className=" bg-black/30 backdrop-blur-[2px] w-20 h-20 rounded-full absolute top-0 left-0 pointer-events-none border-[1px] border-white/10"
                ></m.div>
              )} */}
            </m.div>
          )
        )}
      </AnimatePresence>
    </>
  );
}
