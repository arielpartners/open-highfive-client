import {SELECT_ITEM, UPDATE_ITEM, CREATE_ITEM} from '../../actions';

export const EMPTY_ITEM = {
    _id: null,
    vendorId: '',
    siteId: '',
    ipAddress: '',
    description: '',
    phoneNumber: '',
    streetAddress: '',
    isEnabled: false
};

//-------------------------------------------------------------------
// SELECTED ITEM STORE
//-------------------------------------------------------------------
/* eslint-disable indent, complexity */
export const selectedItem = (state = null, {type, payload} = {}) => {
    switch (type) {
        case SELECT_ITEM:
            return payload || null;
        case UPDATE_ITEM:
            return null;
        case CREATE_ITEM:
            return null;
        default:
            return state;
    }
};
/* eslint-enable indent, complexity */
