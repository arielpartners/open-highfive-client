import React from 'react';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('./style.scss');
}

export const Greeting = ({user, myRecognitions}) => {

    let haveRecognitions = myRecognitions && myRecognitions.length > 0 ? true : false;

    return (
        <h2 className="h5-sectionhdr" >
            <span>Hello {user.firstName}!</span>
            { haveRecognitions ? <em>You've been given a recognition</em> : null }
        </h2>
    );
};
