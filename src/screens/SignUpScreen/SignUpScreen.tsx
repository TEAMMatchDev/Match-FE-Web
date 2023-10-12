import React, {Fragment, useCallback, useEffect, useState} from "react";
import {ALERTEXT} from "../../constants/alertText";
import {TEXT} from "../../constants/text";
import {IMAGES} from "../../constants/images";
import './styles.css';
import axios from "axios";
import * as process from "process";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {accessTokenState, refreshTokenState} from "../../state/loginState";
import {signAgreeState} from "../../state/agreeState";
import CheckBox from "../../components/CheckBox";

const baseUrl = process.env.REACT_APP_BASE_URL

const SignUpScreen: React.FC = () => {
    const [token, setToken] = useRecoilState(accessTokenState);
    const [refreshtoken, setRefreshToken] = useRecoilState(refreshTokenState);
    //const [method, setMethod] = useRecoilState(methodState)
    const [method, setMethod] = useState('signUp')

    const state = useRecoilValue(signAgreeState)

    const homeUrl = process.env.REACT_APP_PUBLIC_URL;

    const [email, setEmail] = useState<string>('')
    const [pw, setPassword] = useState<string>('')
    const [pwConfirm, setPasswordConfirm] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [certiNow, setCertiNow] = useState<string>('')
    const [certiConfirm, setCertiConfirm] = useState<string>('')
    const [chkOverlay, setChkOverlay] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [birthDate, setBirthDate] = useState<string>('')

    // 유효성 검사
    const [isName, setIsName] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false)
    const [isPhone, setIsPhone] = useState<boolean>(false)
    const [isCertiConfirm, setIsCertiConfirm] = useState<boolean>(false)
    const [isBirthDate, setIsBirthDate] = useState<boolean>(false)
    const [isPhoneOverlay, setIsPhoneOverlay] = useState<boolean>(false)
    const [isEmailOverlay, setIsEmailOverlay] = useState<boolean>(false)


    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState<string>('')
    const [emailMessage, setEmailMessage] = useState<string>('')
    const [passwordMessage, setPasswordMessage] = useState<string>('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('')
    const [phoneMessage, setPhoneMessage] = useState<string>('')
    const [certiConfirmMessage, setCertiConfirmMessage] = useState<string>('')
    const [birthMessage, setBirthMessage] = useState<string>('')
    const [chkOverlayMessage, setChkOverlayMessage] = useState<string>('');
    const [chkOverlayPhoneMessage, setChkOverlayPhoneMessage] = useState<string>('');
    const [chkOverlayEmailMessage, setChkOverlayEmailMessage] = useState<string>('');

    //성별 선택 버튼
    const [selectBtn, setSelectBtn] = useState(3);

    useEffect(() => {
        console.log('>>> Recoil 상태가 변경감지 --state 확인 : '+state)

        const syntheticPW =
            {
                target: {
                    value: pwConfirm,
                },
            } as React.ChangeEvent<HTMLInputElement>;
        const syntheicCerti =
            {
                target: {
                    value: certiNow,
                },
            } as React.ChangeEvent<HTMLInputElement>;
        const syntheicPhone =
            {
                target: {
                    value: phone,
                },
            } as React.ChangeEvent<HTMLInputElement>;


        handlePwConfirmChange(syntheticPW);
        handleCertiConfirmChange(syntheicCerti);
        handlePhoneChange(syntheicPhone);

    }, [state, email, pw, pwConfirm, name, phone, certiNow, certiConfirm, gender, birthDate, chkOverlayMessage])

    const handleBtnClick = (e: number) => {
        setSelectBtn(e);
        switch (e) {
            case 1:
                setGender('여성');
                break;
            case 2:
                setGender('남성');
                break;
            case 3:
                setGender('알 수 없음');
                break;
            default:
                setGender('알 수 없음');
                break;
        }
    }

    const handleSignUp = (email: string, pw: string, name: string, phone: string, gender: string, birthDate: string) => {

        //todo --|| !isCertiConfirm 추가해야함
        if (!isEmail)
            window.alert(ALERTEXT.idValFalse);
        else if (!isPassword)
            window.alert(ALERTEXT.pwValFalse);
        else if (!isPasswordConfirm)
            window.alert(ALERTEXT.pwIncorrect);
        else if (!isName)
            window.alert(ALERTEXT.nameValFalse);
        else if (!isPhone)
            window.alert(ALERTEXT.phoneValFalse);
        //else if (!isCertiConfirm)
        //     window.alert(ALERTEXT.certiValFalse);
        else if (!isBirthDate)
            window.alert(ALERTEXT.birthValFalse);
        else if (!state) {
            window.alert(ALERTEXT.agreeValFalse);
        }
        else if (!isPhoneOverlay)
            window.alert(ALERTEXT.chkOverlayPhone);
        else if (!isEmailOverlay)
            window.alert(ALERTEXT.chkOverlayEmail);

    }

    const postSignUp = () => {
        const afterSignUpUrl = `${homeUrl}`

        console.log('# 모든 유효성 검사 통과')

        try {
            const data = {
                email: email,
                password: pw,
                name: name,
                phone: phone,
                gender: gender,
                birthDate: birthDate
            };

            axios.post(
                baseUrl + `/auth/user`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then(function (res) {
                    if (res.status === 201 || res.status === 200) {
                        window.location.href = afterSignUpUrl

                        window.alert(res.data.message);
                        setToken(res.data.result.accessToken)
                        setRefreshToken(res.data.result.accessToken)

                        //console.log('>> ' + res.status + ' : accessToken: ' + res.data.result.accessToken)
                    }
                })
                .catch(function (error) {
                    if (axios.isAxiosError(error) && error.response) {

                        const {code} = error.response.data;

                        //console.log('>>>> ' + error.response.data) //U어쩌구
                        //console.log('>>>> ' + error.response.data.isSuccess) //false
                        //console.log('>>>> ' + error.response.status) //403
                        //console.log('>>>> ' + error.response.data.message) //message

                        if (!error.response.data.isSuccess) {
                            //window.alert(error.response.data.message);
                            window.alert('입력하신 값들을 다시 확인해주세요!');
                            console.log('>> ' + code + ' : ' + error.response.data.message);
                        }

                    }
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
            console.log('# 현재 입력한 pw: ' + passwordCurrent)
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
            console.log('# pw: ' + pw)
            console.log('# 현재 입력한 pwCon: ' + passwordConfirmCurrent)
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
            // console.log('# 전화번호 : '+phoneCurrent)
            // console.log('# setPhone한 전화번호 : '+phone)
        }
    }

    //todo 인증번호 확인 체크
    const handleCertiConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const certiConfirmCurrent = e.target.value
        setCertiNow(certiConfirmCurrent)

        if (certiConfirm === certiConfirmCurrent) {
            setCertiConfirmMessage(ALERTEXT.certiConfirmTrue)
            setIsCertiConfirm(true)
            console.log('# 올바른 인증번호: ' + certiConfirm);
            console.log('cerCon: ' + certiConfirmCurrent)
        } else {
            setCertiConfirmMessage(ALERTEXT.certiValFalse)
            setIsCertiConfirm(false)
        }
    };

    //todo 생년월일 validation
    const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const birthCurrent = e.target.value
        setBirthDate(birthCurrent)

        const currentDate = new Date();
        const year = parseInt(birthCurrent.substring(0, 4));
        const month = parseInt(birthCurrent.substring(4, 6));
        const day = parseInt(birthCurrent.substring(6, 8));

        if (e.target.value.length != 8 || /\s/.test(birthCurrent)) {
            setBirthMessage(ALERTEXT.birthValFalse)
            setIsBirthDate(false)
        } else {
            // 생년월일의 유효성 검사를 위해 최소 및 최대 날짜 설정
            const minDate = new Date('1800-01-01');
            const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // 만 0세 이상
            // 월이 1에서 12 사이인지 확인
            if (month < 1 || month > 12) {
                setBirthMessage(ALERTEXT.birthValFalse);
                setIsBirthDate(false);
                return;
            }
            // 일이 해당 월의 범위 내에 있는지 확인
            const daysInMonth = new Date(year, month, 0).getDate();
            if (day < 1 || day > daysInMonth) {
                setBirthMessage(ALERTEXT.birthValFalse);
                setIsBirthDate(false);
                return;
            }
            const inputDate = new Date(year, month - 1, day);

            if (inputDate < minDate || inputDate > maxDate) {
                // 유효하지 않은 생년월일인 경우
                setBirthMessage(ALERTEXT.birthValFalse);
                setIsBirthDate(false);
            } else {
                // 유효한 생년월일인 경우
                setBirthMessage(ALERTEXT.birthValTrue);
                setIsBirthDate(true);
            }
        }
    }

    //todo 전화번호 sms 인증
    const handleCertify = () => {
        console.log('인증번호 전송')

        try {
            const data = {
                phone: phone
            };

            axios.post(
                baseUrl + `/auth/sms`,
                data
            )
                .then((response) => {
                    setCertiConfirm(response.data.result.number);
                    window.alert('인증번호가 전송되었습니다. ');
                    console.log('# SignUpScreen -- axios post 요청 성공. 인증번호 : ' + response.data.result.number);
                    // console.log('pdataaaaa : '+pdata.contents);
                    // console.log('pdata:', JSON.stringify(pdata, null, 2));
                })
                .catch((error) => {
                    console.error('# SignUpScreen -- axios post Error fetching data:', error);
                });

        } catch (e) {
            console.error(e);
        }
    }

    //todo 전화번호 중복체크
    const handleOverlapPhone = async () => {
        console.log('# 입력된 전화번호 : ' + phone)

        const data = {
            phone: phone
        };

        try {
            axios.post(`${baseUrl}/auth/phone`, data)
                .then(function (res) {
                    if (res.status === 201 || res.status === 200) {
                        setChkOverlayPhoneMessage(res.data.result);
                        window.alert(res.data.result);
                        console.log('>> ' + res.status + ' : ' + res.data.result)
                        setIsPhoneOverlay(true)
                    }
                })
                .catch(function (error) {
                    if (axios.isAxiosError(error) && error.response) {

                        const {code} = error.response.data;

                        console.log('>>>> ' + error.response.data) //U어쩌구
                        console.log('>>>> ' + error.response.data.isSuccess) //false
                        console.log('>>>> ' + error.response.status) //403
                        console.log('>>>> ' + error.response.data.message) //message

                        if (!error.response.data.isSuccess) {
                            setChkOverlayPhoneMessage(error.response.data.message)
                            setIsPhoneOverlay(false)
                            setPhoneMessage(ALERTEXT.phoneOverlayValFalse)
                            setIsPhone(false)
                            window.alert(error.response.data.message);
                            console.log('>> ' + code + ' : ' + error.response.data.message);
                        }

                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    //todo 이메일 중복체크
    const handleOverlapEmail = async () => {
        console.log('# 입력된 전화번호 : ' + email)

        const data = {
            email: email
        };

        try {
            axios.post(`${baseUrl}/auth/email`, data)
                .then(function (res) {
                    if (res.status === 201 || res.status === 200) {
                        setChkOverlayEmailMessage(res.data.result);
                        window.alert(res.data.result);
                        console.log('>> ' + res.status + ' : ' + res.data.result)
                        setIsEmailOverlay(true)
                    }
                })
                .catch(function (error) {
                    if (axios.isAxiosError(error) && error.response) {

                        const {code} = error.response.data;

                        console.log('>>>> ' + error.response.data) //U어쩌구
                        console.log('>>>> ' + error.response.data.isSuccess) //false
                        console.log('>>>> ' + error.response.status) //403
                        console.log('>>>> ' + error.response.data.message) //message

                        if (!error.response.data.isSuccess) {
                            setChkOverlayEmailMessage(error.response.data.message)
                            setIsEmailOverlay(false)
                            setEmailMessage(ALERTEXT.phoneOverlayValFalse)
                            setIsEmail(false)
                            window.alert(error.response.data.message);
                            console.log('>> ' + code + ' : ' + error.response.data.message);
                        }

                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div className={"signUpTitle"}>회원가입</div>

            {/*todo 이메일 입력*/}
            <div className={"signUpInfo"}>
                <div className={"signUpInfo-certi-container"}>
                    <text className={"send-cert-txt"} style={{textDecorationLine: "none"}}>{TEXT.signUpEmail}</text>
                    <text className={"send-cert-txt"} style={{marginLeft: "-7rem", color: "#D14753"}}
                          onClick={handleOverlapEmail}>중복 체크
                    </text>
                </div>
                <div className={"signUpInfo-certi-container"}>
                    <input
                        className={"input"}
                        placeholder={"로그인에 사용할 이메일 입력"}
                        value={email !== null ? email : ""}
                        onChange={handleEmailChange}
                    />
                </div>
                {email.length > 0 &&
                    <span className={`alert-text ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
            </div>

            {/*todo 비밀번호 입력 & 비밀번호 확인*/}
            <div className={"signUpInfo"}>{TEXT.signUpPassword}
                <input
                    className={"input"}
                    placeholder={"비밀번호 입력 (영문,숫자,특수문자 조합 6~20자)"}
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
                    <span
                        className={`alert-text ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>}
            </div>

            {/*todo 이름 입력*/}
            <div className={"signUpInfo"}>{TEXT.signUpName}
                <input
                    className={"input"}
                    placeholder={"2글자 이상 5글자 미만으로 입력"}
                    value={name !== null ? name : ""}
                    onChange={handleNameChange}
                />
                {name.length > 0 &&
                    <span className={`alert-text ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
            </div>

            {/*todo 전화번호 입력*/}
            <div className={"signUpInfo"}>
                <div className={"signUpInfo-certi-container"}>
                    <text className={"send-cert-txt"} style={{textDecorationLine: "none"}}>{TEXT.signUpPhoneNum}</text>
                    <text className={"send-cert-txt"} style={{marginLeft: "-9.5rem", color: "#D14753"}}
                          onClick={handleOverlapPhone}>중복 체크
                    </text>
                </div>
                <div className={"signUpInfo-certi-container"}>
                    <input
                        className={"input"}
                        placeholder={"ex) 01012345678"}
                        value={phone !== null ? phone : ""}
                        onChange={handlePhoneChange}
                    />
                    <text className={"send-cert-txt"} style={{marginLeft: "-4.5rem"}} onClick={handleCertify}>인증번호 전송
                    </text>
                </div>
                {phone.length > 0 &&
                    <span className={`alert-text ${isPhone ? 'success' : 'error'}`}>{phoneMessage}</span>}
            </div>

            {/*todo 인증번호*/}
            <div className={"signUpInfo"}>
                <input
                    className={"input"}
                    placeholder={"인증번호 입력"}
                    value={certiNow !== null ? certiNow : ""}
                    onChange={handleCertiConfirmChange}
                />
                {certiNow.length > 0 &&
                    <span
                        className={`alert-text ${isCertiConfirm ? 'success' : 'error'}`}>{certiConfirmMessage}</span>}
            </div>

            <div className={"signUpInfo"}>{TEXT.signUpSex}</div>
            <div style={{marginLeft: 6}}>
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

            <div style={{width: "18rem", display:"inline-flex", justifyContent:"center"}}>
                <CheckBox props={method}/>
            </div>

            <div
                style={{marginBottom: "4.88rem"}}
                className={"sign-up-btn"}
                onClick={() => (isEmail && isPassword && isPasswordConfirm && isName && isPhone && isBirthDate && state && isPhoneOverlay && isEmail && isEmailOverlay)
                    ? postSignUp() : handleSignUp(email, pw, name, phone, gender, birthDate)}>
                가입하기
                {/*todo -- && isCertiConfirm 추가해야함*/}
            </div>
        </Fragment>

    );
}
export default SignUpScreen
