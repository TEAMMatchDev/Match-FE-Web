import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 페이지가 변경되더라도 상태관리를 유지하기 위해 사용
const { persistAtom } = recoilPersist();

export const windowState = atom({
    key: 'windowState',
    default: false,
    effects_UNSTABLE: [persistAtom]
});


