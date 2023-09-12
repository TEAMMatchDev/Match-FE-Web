import React, {Fragment, useCallback, useEffect, useState} from "react";
import {ALERTEXT} from "../../constants/alertText";
import {TEXT} from "../../constants/text";
import {IMAGES} from "../../constants/images";
import './styles.css';
import axios from "axios";

const baseUrl = 'https://prod.match-api-server.com';

const SignUpScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [pw, setPassword] = useState<string>('')
    const [pwConfirm, setPasswordConfirm] = useState<string>('')
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>('');

    // 유효성 검사
    const [isName, setIsName] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false)
    const [isPhone, setIsPhone] = useState<boolean>(false)
    const [isBirthDate, setIsBirthDate] = useState<boolean>(false)

    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState<string>('')
    const [emailMessage, setEmailMessage] = useState<string>('')
    const [passwordMessage, setPasswordMessage] = useState<string>('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('')
    const [phoneMessage, setPhoneMessage] = useState<string>('')
    const [birthMessage, setBirthMessage] = useState<string>('')


    const [selectBtn, setSelectBtn] = useState<number | null>(null);

    useEffect(() => {
        const syntheticEvent = { target: { value: pwConfirm, }, } as React.ChangeEvent<HTMLInputElement>;
        handlePwConfirmChange(syntheticEvent);

    },[email,pw,pwConfirm,name,phone,gender,birthDate])
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
        checkbox4: false
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
        const afterSignUpUrl = `https://www.official-match.kr`

        try{
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
        } catch (e) {
            console.log(e);
        }


    }

    //todo 이메일 validation
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)

        if (emailRegex.test(emailCurrent)) {
            setEmailMessage(ALERTEXT.idValTrue)
            console.log(emailMessage)
            setIsEmail(true)
        } else {
            setEmailMessage(ALERTEXT.idValFalse)
            console.log(emailMessage)
            setIsEmail(false)
        }
    }

    //todo 비밀번호 형식 체크
    const handlePWChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,20}$/
        const passwordCurrent = e.target.value
        setPassword(passwordCurrent)

        if (passwordRegex.test(passwordCurrent) && !/\s/.test(passwordCurrent)) {
            setPasswordMessage(ALERTEXT.pwValTrue)
            setIsPassword(true)
            console.log('pw: '+passwordCurrent)
        } else {
            setPasswordMessage(ALERTEXT.pwValFalse)
            setIsPassword(false)
        }
    };

    //todo 비밀번호 확인 체크
    const handlePwConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordConfirmCurrent = e.target.value
        setPasswordConfirm(passwordConfirmCurrent)

        if (pw === passwordConfirmCurrent) {
            setPasswordConfirmMessage(ALERTEXT.pwConfirmTrue)
            setIsPasswordConfirm(true)
            console.log('pw: '+pw)
            console.log('pwCon: '+passwordConfirmCurrent)
        } else {
            setPasswordConfirmMessage(ALERTEXT.pwIncorrect)
            setIsPasswordConfirm(false)
        }
    };

    //todo 이름 validation
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nameCurrent = e.target.value
        setName(nameCurrent)
        if (e.target.value.length < 2 || e.target.value.length > 5 || /\s/.test(nameCurrent)) {
            setNameMessage(ALERTEXT.nameValFalse)
            setIsName(false)
        } else {
            setNameMessage(ALERTEXT.nameValTrue)
            setIsName(true)
        }
    }

    //todo 전화번호 validation
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneCurrent = e.target.value
        setPhone(phoneCurrent)
        if (e.target.value.length != 11 || /\s/.test(phoneCurrent)) {
            setPhoneMessage(ALERTEXT.phoneValFalse)
            setIsPhone(false)
        } else {
            setPhoneMessage(ALERTEXT.phoneValTrue)
            setIsPhone(true)
        }
    }

    //todo 출생연도 validation
    const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const birthCurrent = e.target.value
        setBirthDate(birthCurrent)
        if (e.target.value.length != 8 || /\s/.test(birthCurrent)) {
            setBirthMessage(ALERTEXT.birthValFalse)
            setIsBirthDate(false)
        } else {
            setBirthMessage(ALERTEXT.birthValTrue)
            setIsBirthDate(true)
        }
    }

    return (
        <Fragment>
            <div className={"signUpTitle"}>회원가입</div>

            {/*todo 이메일 입력*/}
            <div className={"signUpInfo"}>{TEXT.signUpEmail}
                <input
                    className={"input"}
                    placeholder={"로그인에 사용할 이메일 입력"}
                    value={email !== null ? email : ""}
                    onChange={handleEmailChange}
                />
                {email.length > 0 &&
                    <span className={`alert-text ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
            </div>

            {/*todo 비밀번호 입력 & 비밀번호 확인*/}
            <div className={"signUpInfo"}>{TEXT.signUpPassword}
                <input
                    className={"input"}
                    placeholder={"비밀번호 입력 (영문, 숫자 조합 6~20자)"}
                    value={pw !== null ? pw : ""}
                    onChange={handlePWChange}
                />
                {pw.length > 0 &&
                    <span className={`alert-text ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>}
                <input
                    className={"input"}
                    placeholder={"비밀번호 확인"}
                    style={{marginTop: "0.31rem"}}
                    value={pwConfirm !== null ? pwConfirm : ""}
                    onChange={handlePwConfirmChange}
                />
                {pwConfirm.length > 0 &&
                    <span className={`alert-text ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>}
            </div>

            {/*todo 이름 입력*/}
            <div className={"signUpInfo"}>{TEXT.signUpName}
                <input
                    className={"input"}
                    placeholder={"2글자 이상 5글자 미만으로 입력해주세요."}
                    value={name !== null ? name : ""}
                    onChange={handleNameChange}
                />
                {name.length > 0 &&
                    <span className={`alert-text ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
            </div>

            {/*todo 전화번호 입력*/}
            <div className={"signUpInfo"}>{TEXT.signUpPhoneNum}
                <input
                    className={"input"}
                    placeholder={"ex) 01012345678"}
                    value={phone !== null ? phone : ""}
                    onChange={handlePhoneChange}
                />
                {phone.length > 0 &&
                    <span className={`alert-text ${isPhone ? 'success' : 'error'}`}>{phoneMessage}</span>}
            </div>


            <div className={"signUpInfo"}>
                <input className={"input"} style={{marginTop: 10, marginBottom: 21}} placeholder={"인증번호 입력"}/>
            </div>

            <div className={"signUpInfo"}>{TEXT.signUpSex}</div>
            <div style={{marginTop: 6}}>
                <button className={"sexBtn"}
                        onClick={() => handleBtnClick(1)}
                        style={{
                            marginRight: 6,
                            backgroundColor: selectBtn === 1 ? "#262626" : "#F7F7F7",
                            color: selectBtn === 1 ? "#F7F7F7" : "#666666"
                        }}
                >여성
                </button>
                <button className={"sexBtn"}
                        onClick={() => handleBtnClick(2)}
                        style={{
                            marginRight: 6,
                            backgroundColor: selectBtn === 2 ? "#262626" : "#F7F7F7",
                            color: selectBtn === 2 ? "#F7F7F7" : "#666666"
                        }}
                >남성
                </button>
                <button className={"sexBtnNone"}
                        onClick={() => handleBtnClick(3)}
                        style={{
                            backgroundColor: selectBtn === 3 ? "#262626" : "#F7F7F7",
                            color: selectBtn === 3 ? "#F7F7F7" : "#666666",
                            width: 90
                        }}
                >선택 안함
                </button>
            </div>

            {/*todo 출생연도 입력*/}
            <div className={"signUpInfo"}>{TEXT.signUpBirth}
                <input
                    className={"input"}
                    placeholder={"ex) 19990101"}
                    value={birthDate !== null ? birthDate : ""}
                    onChange={handleBirthChange}
                />
                {birthDate.length > 0 &&
                    <span className={`alert-text ${isBirthDate ? 'success' : 'error'}`}>{birthMessage}</span>}
            </div>


            <div className={"label-container"}>
                <label className={"label"}>
                    <input type="checkbox" checked={Object.values(checkboxes).every((isChecked) => isChecked)}
                           onChange={handleSelectAll}/>
                    &nbsp;&nbsp;전체 선택
                </label>
                <label className={"label"}>
                    <input type="checkbox" name="checkbox1" checked={checkboxes.checkbox1}
                           onChange={handleCheckboxChange}/>
                    &nbsp;&nbsp;{TEXT.chkBox1}
                </label>
                <label className={"label"}>
                    <input type="checkbox" name="checkbox2" checked={checkboxes.checkbox2}
                           onChange={handleCheckboxChange}/>
                    &nbsp;&nbsp;{TEXT.chkBox2}
                </label>
                <label className={"label"}>
                    <input type="checkbox" name="checkbox3" checked={checkboxes.checkbox3}
                           onChange={handleCheckboxChange}/>
                    &nbsp;&nbsp;{TEXT.chkBox3}
                </label>
                <label className={"label"}>
                    <input type="checkbox" name="checkbox4" checked={checkboxes.checkbox4}
                           onChange={handleCheckboxChange}/>
                    &nbsp;&nbsp;{TEXT.chkBox4}
                </label>
            </div>

            <div style={{marginBottom: "4.88rem"}}>
                <img src={IMAGES.signupBtn} alt="회원가입"
                     onClick={() => handleSignUp(email, pw, name, phone, gender, birthDate)}/>
            </div>
        </Fragment>
    );
}
export default SignUpScreen
