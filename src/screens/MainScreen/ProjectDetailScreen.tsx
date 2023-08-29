import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil'; // Import the useRecoilValue hook
import { tokenState } from '../../App'; // Import the accessTokenState

import axios from "axios";
import { TEXT } from "../../constants/text";

const baseUrl = 'https://www.match-api-server.com';

const ProjectDetailScreen = () => {
    const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
    const accessToken = useRecoilValue(tokenState); // Get the access token from Recoil

    const params = useParams().projectId;
    const projectId = params;

    const [pdata, setPData] = useState<any>([]);

    useEffect(() => {
        console.log('pid: ' + projectId);

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
                `${baseUrl}/projects`,
                {
                    params: data,
                    ...config
                }
            )
                .then((response) => {
                    setPData(response.data.result);
                    console.log('# ProjectDetailScreen -- axios get detail 요청 성공');
                    console.log('pdata : '+pdata);
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
            <div className="detail-item-usge">
                {pdata.usages ? `usage : ${pdata.usages}` : 'Loading...'}
            </div>
            프로젝트 ID : {projectId}
        </div>
    );
};

export default ProjectDetailScreen;
