import React, {Fragment} from "react";
import {TEXT} from "../../constants/text";
import './styles.css';

const SignUpScreen = () => {
/*    const [selectBtn, setSelectBtn] = React.useState();
    const GetClick = (e) => {
        setSelectBtn((e.target.id))
    }
    React.useEffect(
        (e) => {
            if (selectBtn !== null) {

            }, [selectBtn]
        }
    )*/

    return (
        <Fragment>
            <div style={{fontSize: 30, fontWeight: "bold", marginBottom: 64, marginTop: 24}}>회원가입</div>

            <div className={"signUpInfo"}>{TEXT.signUpEmail}</div>
            <input className={"input"} placeholder={"로그인에 사용할 이메일 입력"}/>

            <div className={"signUpInfo"} style={{marginTop: 21}}>{TEXT.signUpPassword}</div>
            <input className={"input"} placeholder={"비밀번호 입력 (영문, 숫자 조합 6~20자)"}/>
            <input className={"input"} style={{marginTop: 10, marginBottom: 21}} placeholder={"비밀번호 확인"}/>

            <div className={"signUpInfo"}>{TEXT.signUpName}</div>
            <input className={"input"} placeholder={"이름 입력"}/>

            <div className={"signUpInfo"} style={{marginTop: 21}}>{TEXT.signUpPhoneNum}</div>
            <input className={"input"} placeholder={"ex) 01012345678"}/>
            <input className={"input"} style={{marginTop: 10, marginBottom: 21}} placeholder={"인증번호 입력"}/>

            <div className={"signUpInfo"} style={{marginTop: 21}}>{TEXT.signUpSex}</div>
            <div style={{marginTop: 6}}>
                <button className={"sexBtn"} style={{marginRight: 6}}>여성</button>
                <button className={"sexBtn"} style={{marginRight: 6}}>남성</button>
                <button className={"sexBtn"} style={{marginRight: 6, width: 90}}>선택 안함</button>
            </div>

            <div className={"signUpInfo"} style={{marginTop: 21}}>{TEXT.signUpBirth}</div>
            <input className={"input"} placeholder={"ex) 19990101"}/>
        </Fragment>
    )
}
export default SignUpScreen
