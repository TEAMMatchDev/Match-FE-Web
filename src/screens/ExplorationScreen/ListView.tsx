import React, { useState } from 'react';

const ListView = () => {

    const [project, setProject] = useState(null);

    return (
        <ul className='listView'>
            {
                project &&
                project.map((v, inx) => {
                    return <NewsRow key={inx} row={v} />
                })
            }
        </ul>
    );
};

export default ListView;