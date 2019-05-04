import React from 'react';

import './spinner.css';

const Spinner = () => {
    return (
        <div className="lds-css ng-scope" style={{margin: "150px"}}>
            <div className="lds-rolling">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Spinner;