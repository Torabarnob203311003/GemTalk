import React from 'react';

function Ans({ ans, key }) {
    console.log(ans, key);
    return (
        <div>
            <h1>
                {ans}
            </h1>
        </div>
    );
}

export default Ans;
