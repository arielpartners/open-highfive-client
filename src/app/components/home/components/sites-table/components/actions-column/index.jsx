import React from 'react';

export const ActionsColumn = ({data, rowData, metadata}) => {
    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleChange = (e) => {
        metadata.onChange(e.target.checked, rowData);
    };

    return (
        <div onClick={handleClick}>
            <label className="is-enabled mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect">
                <input type="checkbox"
                       id={rowData.vendorId + rowData.siteId}
                       className="mdl-icon-toggle__input"
                       onChange={handleChange}
                       defaultChecked={data}/>
                <i className="mdl-icon-toggle__label material-icons check">check</i>
                <i className="mdl-icon-toggle__label material-icons remove">remove</i>
            </label>
            <span className="other-actions">
                <i className="edit material-icons" onClick={()=>metadata.onEdit(rowData)}>edit</i>
                <i className="delete material-icons" onClick={()=>metadata.onDelete(rowData)}>delete</i>
            </span>
        </div>
    );
};
