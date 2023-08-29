import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {TEXT} from "../../constants/text";
const ProjectDetailScreen = () => {
    const params = useParams().projectId;
    //const [detailBoardData, setDetailBoardData] = useState<any>([])
    const projectId  = params;



    // 이제 컴포넌트 로직에서 projectId를 사용할 수 있습니다.
    useEffect(() => {
        console.log('pidd: '+projectId);

        /*axios.get(`http://localhost:3001/board/${params}`)
            .then((response) => {
                setDetailBoardData(response.data)
            })

            .catch(function(error) {
                console.log( error)
            })*/
    }, [projectId])


    return (
        <div>
            <div className="title">{TEXT.detailHeader}</div>
            프로젝트 ID : {projectId}
        </div>
    );
}
export default ProjectDetailScreen