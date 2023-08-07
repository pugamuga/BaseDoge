import { atom } from "recoil";

export const userWidthState = atom<number>({
  key: "userWidthState",
  default: 0,
});
export const progressLoading = atom<number>({
  key: "progressLoading",
  default: 0,
});
export const fakeProgressLoading = atom<number>({
  key: "fakeProgressLoading",
  default: 0,
});
export const glitch = atom<boolean>({
  key: "glitch",
  default: false,
});
export const actionState = atom<"IDLE_EXP" | "WALK_EXP" | "RUN_EXP"|"WALK_EXP_BACK">({
  key: "actionState",
  default: "IDLE_EXP",
});
export const distanceState = atom<number>({
  key: "distanceState",
  default: 0,
});
export const photoCurrent = atom<number>({
  key: "photoCurrent",
  default: 1,
});
export const heightOfSite = atom<number>({
  key: "heightOfSite",
  default: 0,
});
export const loadingExperienceState = atom<number>({
  key: "loadingExperienceState",
  default: 0,
});
export const onAnimationEndState = atom<boolean>({
  key: "onAnimationEndState",
  default: false,
});
export const browserState = atom<string>({
  key: "browserState",
  default: "none",
});
