// atoms.ts
import { atom } from "recoil";

export const tokenState = atom({
    key: "tokenState", // 전역적으로 고유한 값
    default: "" // 초깃값
});