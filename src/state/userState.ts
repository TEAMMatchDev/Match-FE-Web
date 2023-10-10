import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 페이지가 변경되더라도 상태관리를 유지하기 위해 사용
const { persistAtom } = recoilPersist();

export const userNameState = atom({
    key: 'userNameState',
    default: '',
    effects_UNSTABLE: [persistAtom]
});

export const userTelState = atom({
    key: 'userTelState',
    default: '',
    effects_UNSTABLE: [persistAtom]
});

