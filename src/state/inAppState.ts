import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 페이지가 변경되더라도 상태관리를 유지하기 위해 사용
const { persistAtom } = recoilPersist();

export const inAppState = atom({
    key: 'inAppState',
    default: false, //TODO) 앱에서 보낸 요청인지 여부 (true : from App, false : web )
    effects_UNSTABLE: [persistAtom]
});


