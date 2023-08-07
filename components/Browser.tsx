import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { browserState } from '../state/recoilState';

export default function Browser():JSX.Element|null {
  const [browser, setBrowser] = useRecoilState(browserState);

  useEffect(() => {
    setBrowser(getBrowser());
  }, []);

  const getBrowser = () => {
    let userAgent = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";

    if (userAgent.indexOf("Edge") > -1) {
      browserName = "Edge";
      browserVersion = userAgent.split("Edge/")[1];
    } else if (userAgent.indexOf("Chrome") > -1) {
      browserName = "Chrome";
      browserVersion = userAgent.split("Chrome/")[1];
    } else if (userAgent.indexOf("Firefox") > -1) {
      browserName = "Firefox";
      browserVersion = userAgent.split("Firefox/")[1];
    } else if (userAgent.indexOf("Safari") > -1) {
      browserName = "Safari";
      browserVersion = userAgent.split("Version/")[1];
    } else {
        browserName = "none";
        browserVersion = "none";
    }

    return `${browserName} `;
  }

  return null
}


