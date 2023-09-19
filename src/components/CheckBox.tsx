import React, {useCallback, useEffect, useState} from "react";
import './styles.css'
import {TEXT} from "../constants/text";
import {IMAGES} from "../constants/images";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {signAgreeState, payAgreeState} from "../state/agreeState";

const CheckBox = ({ props } : any) => {

    const setPayAgreeState = useSetRecoilState(payAgreeState)
    const setSignAgreeState = useSetRecoilState(signAgreeState)
    const state = useRecoilValue(signAgreeState)

    const [selectAllChecked, setSelectAllChecked] = useState(true); // State for "전체 선택"

    const [title, setTitle] = useState('');

    const [initialCheckList, setInitialCheckList] = useState([
        { id: 'checkbox1', value: 'value1', disabled: false, label: TEXT.pay3AgreeCK1, isChecked: true },
    ])
    const payAgreeCheckboxList = useState([
        { id: 'checkbox1', value: 'value1', disabled: false, label: TEXT.pay3AgreeCK1, isChecked: true },
        { id: 'checkbox2', value: 'value2', disabled: false, label: TEXT.pay3AgreeCK2, isChecked: true },
    ]);
    const signUpAgreeCheckList = useState([
        { id: 'checkbox1', value: 'value1', disabled: false, label: TEXT.chkBox1, isChecked: true },
        { id: 'checkbox2', value: 'value2', disabled: false, label: TEXT.chkBox2, isChecked: true },
        { id: 'checkbox3', value: 'value3', disabled: false, label: TEXT.chkBox3, isChecked: true },
        { id: 'checkbox4', value: 'value4', disabled: false, label: TEXT.chkBox4, isChecked: true },
    ]);
    const [checkboxList, setCheckboxList] = useState(initialCheckList);

    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        agreeTypeHandler(props)

        stateCheck()

    },[props]);

    const agreeTypeHandler = (props: string)=> {
        if (props ==='pay'){
            setTitle(TEXT.pay3Agree)
            setCheckboxList([
                { id: 'checkbox1', value: 'value1', disabled: false, label: TEXT.pay3AgreeCK1, isChecked: true },
                { id: 'checkbox2', value: 'value2', disabled: false, label: TEXT.pay3AgreeCK2, isChecked: true },
            ]);
        }
        else if (props === 'signUp') {
            setTitle('전체 동의')
            setCheckboxList([
                { id: 'checkbox1', value: 'value1', disabled: false, label: TEXT.chkBox1, isChecked: true },
                { id: 'checkbox2', value: 'value2', disabled: false, label: TEXT.chkBox2, isChecked: true },
                { id: 'checkbox3', value: 'value3', disabled: false, label: TEXT.chkBox3, isChecked: true },
                { id: 'checkbox4', value: 'value4', disabled: false, label: TEXT.chkBox4, isChecked: true },
            ]);
        }
    }

    const handleCheckboxChange = (checkboxId: string) => {
        const updatedList = checkboxList.map((checkbox) =>
            checkbox.id === checkboxId ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
        );
        setCheckboxList(updatedList);

        const isCheckbox1Checked = updatedList.some(checkbox => checkbox.id === 'checkbox1' && checkbox.isChecked);
        const isCheckbox2Checked = updatedList.some(checkbox => checkbox.id === 'checkbox2' && checkbox.isChecked);
        if (isCheckbox1Checked && isCheckbox2Checked) { //1과2가 선택됐을 때
            stateCheck()
        }
        console.log('# chk1: '+isCheckbox1Checked)
        console.log('# chk2: '+isCheckbox2Checked)
        //console.log('# 체크박스 : '+updatedList)
        //console.log('# 체크박스 data:', JSON.stringify(updatedList, null, 2));

        const allChecked = updatedList.every((checkbox) => checkbox.isChecked);
        setSelectAllChecked(allChecked);
    };

    const handleSelectAllChange = () => {
        const updatedList = checkboxList.map((checkbox) => ({
            ...checkbox,
            isChecked: !selectAllChecked,
        }));
        setCheckboxList(updatedList);
        setSelectAllChecked(!selectAllChecked);

        //전체선택일 때 state true
        if(!selectAllChecked) {
            stateCheck()
        }
        console.log('# AllChk: '+ !selectAllChecked)
    };
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const stateCheck = () => {
        if (props ==='pay'){
            //todo --결제동의 )  전체동의 -> 필수동의
            setPayAgreeState(selectAllChecked);
            console.log('# Checkbox --props: '+props)
        }
        else if (props === 'signUp') {
            //todo --회원가입 ) checkbox1,2 체크 -> 필수동의
            setSignAgreeState(true);

            console.log('# Checkbox --props: '+props)
            console.log('# Checkbox --signAgreestate 검사: '+state)
        }
    }

    return (
        <div className={"checkbox-container"}>
            <div className={"acceptance-container"}>
                <label className={"label"}>
                    <input
                        type="checkbox"
                        checked={selectAllChecked}
                        onChange={handleSelectAllChange}
                        style={{
                            appearance: 'none',
                            backgroundSize: '100% 100%',
                            width: '1.5rem',
                            height: '1.5rem',
                            backgroundPosition: '50%',
                            backgroundImage: selectAllChecked ? `url(${IMAGES.checkedBtn})` : `url(${IMAGES.uncheckedBtn})`,
                        }}/>
                    {title}
                </label>
                {isOpen ? (
                    <img src={IMAGES.toggleUp} className={"toggle-arrow"} alt="toggle_up"
                         onClick={handleToggle}/>
                ) : (
                    <img src={IMAGES.toggleDown} className={"toggle-arrow"} alt="toggle_down"
                         onClick={handleToggle}/>
                )}
            </div>
            <ul style={{display: isOpen ? "block" : "none"}}>
                <div className="clause-container">
                    {checkboxList.map((checkbox) => (
                        <div key={checkbox.id} className="label">
                            <input
                                type="checkbox"
                                id={checkbox.id}
                                value={checkbox.value}
                                disabled={checkbox.disabled}
                                checked={checkbox.isChecked}
                                style={{
                                    appearance: 'none',
                                    backgroundSize: '100% 100%',
                                    width: '1.5rem',
                                    height: '1.5rem',
                                    backgroundPosition: '50%',
                                    backgroundImage: checkbox.isChecked ? `url(${IMAGES.checkedBtn})` : `url(${IMAGES.uncheckedBtn})`,
                                }}
                                onChange={() => handleCheckboxChange(checkbox.id)}
                            />
                            <label className="label" htmlFor={checkbox.id}>
                                {checkbox.label}
                            </label>
                            <button className={"clause-btn"}>{TEXT.pay3AgreeLook}</button>

                        </div>
                    ))}
                </div>
            </ul>

        </div>
    );
}

export default CheckBox;

