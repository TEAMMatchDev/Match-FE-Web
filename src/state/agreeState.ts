import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 페이지가 변경되더라도 상태관리를 유지하기 위해 사용
const { persistAtom } = recoilPersist();

//결제 동의
export const payAgreeState = atom({
    key: 'payAgreeState',
    default: true,
    effects_UNSTABLE: [persistAtom]
});

//회원가입
export const signAgreeState = atom({
    key: 'signAgreeState',
    default: true,
    effects_UNSTABLE: [persistAtom]
});