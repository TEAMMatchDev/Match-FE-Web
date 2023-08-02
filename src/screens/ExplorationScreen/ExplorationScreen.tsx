import {Fragment, useState} from "react";
import {IMAGES} from "../../constants/images";
import './style.css';

const ExplorationScreen = () => {
    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <Fragment>
            <div className={"header"}>우리가 바라온 세상</div>
            <div className={"search-container"}>
                <img className={"search-icon"} src={IMAGES.search}/>
                <input className={"search"} type={"text"} value={search} onChange={onChange} placeholder={"프로젝트를 검색해보세요 (문장, 단어 호환)"}/>
            </div>
            <div className={"popular-project"}>진행 중인 인기 프로젝트</div>
        </Fragment>
    )
}
export default ExplorationScreen