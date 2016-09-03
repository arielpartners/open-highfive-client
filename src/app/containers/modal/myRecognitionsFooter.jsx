import React from 'react';

export const MyRecognitionsFooter = (props) => {
    return (
      <span>
        <button onClick={props.onClick}
                type="reset" className="btn btn-default" data-dismiss="modal">Close</button>
      </span>
    );
};
