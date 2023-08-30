import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 페이지가 변경되더라도 상태관리를 유지하기 위해 사용
const { persistAtom } = recoilPersist();

export const LoginState = atom<boolean>({
    key: 'LoginState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const refreshTokenState = atom({
    key: 'refreshTokenState',
    default: localStorage.getItem('refreshToken') || null, // 이전에 저장된 refreshToken이 있다면 가져옴
    effects_UNSTABLE: [persistAtom],
});

export const accessTokenState = atom({
    key: 'accessTokenState',
    default: null,
    effects_UNSTABLE: [persistAtom]
});

export const TokenState = atom<string | null>({
    key: 'TokenState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

