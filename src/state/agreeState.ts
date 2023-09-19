import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 페이지가 변경되더라도 상태관리를 유지하기 위해 사용
const { persistAtom } = recoilPersist();

export const methodState = atom({ //signUp, pay
    key: 'methodState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})
//결제 동의는 전부 동의여야 함
export const payAgreeState = atom({
    key: 'payAgreeState',
    default: true,
    effects_UNSTABLE: [persistAtom]
});

//회원가입 필수동의1
export const signAgreeState1 = atom({
    key: 'signAgreeState1',
    default: true,
    effects_UNSTABLE: [persistAtom]
});
//회원가입 필수동의2
export const signAgreeState2 = atom({
    key: 'signAgreeState2',
    default: true,
    effects_UNSTABLE: [persistAtom]
});