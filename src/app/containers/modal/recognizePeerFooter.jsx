import React from 'react';

export const RecognizePeerFooter = (props) => {
    return (
        <span>
            <input onClick={props.onClick}
              type="submit" className="btn btn-primary" value="High Five!" data-dismiss="modal"/>
            <input onClick={props.onClick}
              type="reset" className="btn btn-danger" value="Maybe Not" data-dismiss="modal"/>
        </span>
    );
};
