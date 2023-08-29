import React from "react";
import { useParams } from "react-router-dom";
const ProjectDetailScreen = () => {
    const { projectId } = useParams();

    // 이제 컴포넌트 로직에서 projectId를 사용할 수 있습니다.

    return (
        <div>
            {/* 프로젝트 세부 정보 렌더링 */}
            프로젝트 ID: {projectId}
        </div>
    );
}
export default ProjectDetailScreen