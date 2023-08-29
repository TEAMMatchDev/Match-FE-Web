import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { useRecoilValue } from 'recoil'; // Import the useRecoilValue hook
import { tokenState } from '../../App'; // Import the accessTokenState

import axios from "axios";
import { TEXT } from "../../constants/text";
import './styles.css';

const baseUrl = 'https://www.match-api-server.com';

const ProjectDetailScreen = () => {
    const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
    const accessToken = useRecoilValue(tokenState); // Get the access token from Recoil

    const params = useParams().projectId;
    const projectId = params;

    const [pdata, setPData] = useState<any>([]);
    const [items, setItems] = useState<any[]>([]);


    useEffect(() => {
        //console.log('pid: ' + projectId);

        try {
            const data = {
                projectId: projectId,
            };

            const config = {
                headers: {
                    "X-AUTH-TOKEN": accessToken,
                }
            };

            axios.get(
                baseUrl+`/projects/${projectId}`,
                config
            )
                .then((response) => {
                    setPData(response.data.result);
                    setItems(response.data.result.projectImgList);
                    // console.log('# ProjectDetailScreen -- axios get detail 요청 성공');
                    // console.log('pdataaaaa : '+pdata.contents);
                    // console.log('pdata:', JSON.stringify(pdata, null, 2));
                })
                .catch(function (e) {
                    console.log(e);
                });
        } catch (e) {
            console.error(e);
        }
    }, [projectId, accessToken]);


    return (
        <div>
            <div className="title">{TEXT.detailHeader}</div>
            <div className="detail-item-usage">
                {pdata.usages ? `${pdata.usages}` : 'Loading...'}
            </div>

            <div className={"list-container"}>
                <ul>
                    {items.map((item) => (
                        <ListItem
                            imgId={item.imgId}
                            imgUrl={item.imgUrl}
                            sequence={item.sequence}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

interface ImageObject {
    imgId: number;
    imgUrl: string;
    sequence: number;
}
const ListItem: React.FC<ImageObject> = ({ imgId, imgUrl, sequence }) => {
    return (
        <div className="list-item">
            <img className={"detail-item-img"} src={imgUrl} alt="이미지"/>
        </div>
    );
}
export default ProjectDetailScreen;
