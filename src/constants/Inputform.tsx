import React, { useState } from "react";
import {IMAGES} from "../constants/images";
import './styles.css';

const InputForm: React.FC = () => {
    // 상태 관리를 위한 state 변수들
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Submit 이벤트 핸들러
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 입력된 값들 처리
        console.log("ID:", id);
        console.log("PW:", password);

        // 폼 제출 후 입력값 초기화
        setId("");
        setPassword("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-id">
                <input
                    type="text"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
            </div>
            <div className="input-password">
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <img src={IMAGES.loginBtnLarge} />
        </form>
    );
};

export default InputForm;
