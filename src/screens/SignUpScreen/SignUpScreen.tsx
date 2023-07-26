import React, {Fragment, useState} from "react";
import {TEXT} from "../../constants/text";
import {IMAGES} from "../../constants/images";
import './styles.css';
import axios from "axios";

const baseUrl = 'https://www.match-api-server.com';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [pw, setPassword] = useState('');
    const [checkpw, setChkPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [selectBtn, setSelectBtn] = useState<number | null>(null);
    const handleBtnClick = (e: number) => {
        setSelectBtn(e);
        switch (e){
            case 1: setGender('여성'); break;
            case 2: setGender('남성'); break;
            case 3: setGender('알 수 없음'); break;
            default: setGender('알 수 없음'); break;
        }
    }

    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        // 추가적인 체크박스가 있다면 여기에 추가
    });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [name]: checked,
        }));
    };

    const handleSelectAll = () => {
        setCheckboxes((prevCheckboxes) => {
            const allChecked = Object.values(prevCheckboxes).every((isChecked) => isChecked);
            const updatedCheckboxes: { [key: string]: boolean } = {};
            Object.keys(prevCheckboxes).forEach((checkbox) => {
                updatedCheckboxes[checkbox] = !allChecked;
            });
            return { ...prevCheckboxes, ...updatedCheckboxes };
        });
    };

    const handleSignUp = (email:string, pw:string, name:string, phone:string, gender:string, birthDate:string) => {
        const afterSignUpUrl = `https://localhost:3000`

        const data = {
            email: email,
            password : pw,
            name: name,
            phone: phone,
            gender: gender,
            birthDate: birthDate
        };

        axios.post(
            baseUrl+`/auth/user`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(function (response) {
                console.log("post 성공", response);

                //로그인 성공 시 아래 url로 하이퍼링크
                window.location.href = afterSignUpUrl
            })
            .catch(function (error) {
                // 오류발생시 실행
                console.log("post 실패", error);
            })
            .then(function () {
                // 항상 실행
                //console.log("데이터 요청 완료");
            });
    }

    return (
        <Fragment>
            <div className={"signUpTitle"}>회원가입</div>

            <div className={"signUpInfo"}>{TEXT.signUpEmail}</div>
            <input className={"input"} placeholder={"로그인에 사용할 이메일 입력"} value={email} onChange={(e) => setEmail(e.target.value)} />

            <div className={"signUpInfo"} style={{marginTop: "1.31rem"}}>{TEXT.signUpPassword}</div>
            <div><input className={"input"} placeholder={"비밀번호 입력 (영문, 숫자 조합 6~20자)"} value={pw} onChange={(e) => setPassword(e.target.value)} /></div>
            <div><input className={"input"} style={{marginTop: 10, marginBottom: 21}} placeholder={"비밀번호 확인"} value={checkpw} onChange={(e) => setChkPassword(e.target.value)}/></div>

            <div className={"signUpInfo"}>{TEXT.signUpName}</div>
            <input className={"input"} placeholder={"이름 입력"} value={name} onChange={(e => setName(e.target.value))} />

            <div className={"signUpInfo"} style={{marginTop: 21}}>{TEXT.signUpPhoneNum}</div>
            <div><input className={"input"} placeholder={"ex) 01012345678"} value={phone} onChange={(e => setPhone(e.target.value))} /></div>
            <div><input className={"input"} style={{marginTop: 10, marginBottom: 21}} placeholder={"인증번호 입력"}/></div>

            <div className={"signUpInfo"} style={{marginTop: 21}}>{TEXT.signUpSex}</div>
            <div style={{marginTop: 6}}>
                <button className={"sexBtn"}
                        onClick={() => handleBtnClick(1)}
                        style={{marginRight: 6, backgroundColor: selectBtn === 1 ? "#262626" : "#F7F7F7", color: selectBtn === 1 ? "#F7F7F7" : "#666666"}}
                >여성</button>
                <button className={"sexBtn"}
                        onClick={() => handleBtnClick(2)}
                        style={{marginRight: 6, backgroundColor: selectBtn === 2 ? "#262626" : "#F7F7F7", color: selectBtn === 2 ? "#F7F7F7" : "#666666"}}
                >남성</button>
                <button className={"sexBtnNone"}
                        onClick={() => handleBtnClick(3)}
                        style={{marginRight: 6, backgroundColor: selectBtn === 3 ? "#262626" : "#F7F7F7", color: selectBtn === 3 ? "#F7F7F7" : "#666666", width: 90}}
                >선택 안함</button>
            </div>

            <div className={"signUpInfo"} style={{marginTop: 21}}>{TEXT.signUpBirth}</div>
            <input className={"input"} placeholder={"ex) 19990101"} value={birthDate} onChange={(e => setBirthDate(e.target.value))} />

            <div className={"chkBox"}>
                <label>
                    <input type="checkbox" checked={Object.values(checkboxes).every((isChecked) => isChecked)} onChange={handleSelectAll} />
                    전체 선택
                </label>
                <br />
                <label>
                    <input type="checkbox" name="checkbox1" checked={checkboxes.checkbox1} onChange={handleCheckboxChange} />
                    {TEXT.chkBox1}
                </label>
                <br />
                <label>
                    <input type="checkbox" name="checkbox2" checked={checkboxes.checkbox2} onChange={handleCheckboxChange} />
                    {TEXT.chkBox2}
                </label>
                <br />
                <label>
                    <input type="checkbox" name="checkbox3" checked={checkboxes.checkbox3} onChange={handleCheckboxChange} />
                    {TEXT.chkBox3}
                </label>
                <br />
                <label>
                    <input type="checkbox" name="checkbox4" checked={checkboxes.checkbox4} onChange={handleCheckboxChange} />
                    {TEXT.chkBox4}
                </label>
            </div>
            
            <div style={{marginBottom: "4.88rem"}}><img src={IMAGES.signupBtn}  onClick={() => handleSignUp(email, pw, name, phone, gender, birthDate)}/></div>
        </Fragment>
    )
}
export default SignUpScreen
