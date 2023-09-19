import React, {useCallback, useEffect, useState} from "react";
import './styles.css'
import {TEXT} from "../constants/text";
import {IMAGES} from "../constants/images";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {methodState, payAgreeState} from "../state/agreeState";

const CheckBox = ({ props } : any) => {

    const setPayAgreeState = useSetRecoilState(payAgreeState)

    const [selectAllChecked, setSelectAllChecked] = useState(true); // State for "전체 선택"

    const [initialCheckList, setInitialCheckList] = useState([
        { id: 'checkbox1', value: 'value1', disabled: false, label: TEXT.pay3AgreeCK1, isChecked: true },
    ])
    const [payAgreeCheckboxList, setAgreeCheckboxList] = useState([
        { id: 'checkbox1', value: 'value1', disabled: false, label: TEXT.pay3AgreeCK1, isChecked: true },
        { id: 'checkbox2', value: 'value2', disabled: false, label: TEXT.pay3AgreeCK2, isChecked: true },
    ]);
    const [signUpAgreeCheckList, setSignUpAgreeCheckList] = useState([
        { id: 'checkbox1', value: 'value1', disabled: false, label: TEXT.chkBox1, isChecked: true },
        { id: 'checkbox2', value: 'value2', disabled: false, label: TEXT.chkBox2, isChecked: true },
        { id: 'checkbox3', value: 'value3', disabled: false, label: TEXT.chkBox3, isChecked: true },
        { id: 'checkbox4', value: 'value4', disabled: false, label: TEXT.chkBox4, isChecked: true },
    ]);

    const [checkboxList, setCheckboxList] = useState(initialCheckList);

    useEffect(() => {
        setPayAgreeState(selectAllChecked)

        /*if (props ==='pay'){
            setCheckboxList(payAgreeCheckboxList);
            console.log('# Checkbox --props: '+props)
        }
        else if (props === 'signUp') {
            //todo --필수동의 항목 1,2 체크 state 저장 해야 됨
            setCheckboxList(signUpAgreeCheckList);
            console.log('# Checkbox --props: '+props)
        }*/
    },[selectAllChecked])

    const [isOpen, setIsOpen] = useState(false);
    const handleCheckboxChange = (checkboxId: string) => {
        const updatedList = checkboxList.map((checkbox) =>
            checkbox.id === checkboxId ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
        );

        setCheckboxList(updatedList);
        console.log('# 체크박스 : '+updatedList)
        // console.log('pdataaaaa : '+pdata.contents);
        console.log('# 체크박스 data:', JSON.stringify(updatedList, null, 2));

        // Check if all checkboxes are checked

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
    };
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

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
                    전체 선택
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

