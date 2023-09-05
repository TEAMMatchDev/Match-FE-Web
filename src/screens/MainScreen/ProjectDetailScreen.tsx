import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TEXT } from "../../constants/text";

const baseUrl = 'https://prod.match-api-server.com';

const ProjectDetailScreen = () => {
    const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

    const params = useParams().projectId;
    const projectId = params;

    const [detailPData, setDetailPData] = useState<any>([]);

    useEffect(() => {
        console.log('pid: ' + projectId);

        try {
            const data = {
                projectId: projectId,
            };

            const config = {
                headers: {
                    "X-AUTH-TOKEN": "accessToken"
                }
            };

            // @ts-ignore
            const params = new URLSearchParams(data).toString();

            axios.get(
                `${baseUrl}/projects`,
                {
                    params: data,
                    ...config
                }
            )
                .then((response) => {
                    setDetailPData(response.data.result);
                })
                .catch(function (e) {
                    console.log(e);
                });
        } catch (e) {
            console.error(e);
        }
    }, [projectId, ]); //accessToken 추가필요

    return (
        <div>
            <div className="title">{TEXT.detailHeader}</div>
            <div className="detail-item-usge">
                usage : {detailPData.useages}
            </div>
            프로젝트 ID : {projectId}
        </div>
    );
};

export default ProjectDetailScreen;
