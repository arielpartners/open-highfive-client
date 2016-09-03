import React from 'react';

export const MyRecognitions = () => {

    return (
        <span>
            <img
              src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
              className="roundheadshot" alt="Julie Doe"/>
            <p><a href="#">Julie Doe</a></p>
            <p>just recognized you for
            </p><h2>Teamwork</h2>
            <span className="h5-recognized-pts">20 pts</span><p></p>

            <h3><span className="glyphicon glyphicon-thumbs-up"></span> Say Thank You</h3>
        </span>
    );
};
