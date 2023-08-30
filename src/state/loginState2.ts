// atoms.ts
import { atom } from "recoil";
import { LoginProps } from "../constants/interfaces";

export const tokenState = atom({
    key: 'tokenState', // 전역적으로 고유한 값
    default: '' // 초깃값
});

// 사용자 정보를 저장하는 Recoil atom 생성
export const userAtom = atom<LoginProps>({
    key: 'userAtom', // 고유한 키값
    default: {} as LoginProps // 기본 값 (비어있는 객체로 초기화)
});

export const newUserAtom = atom({
    key: 'newuserAtom',
    default: {}
});