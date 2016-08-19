// When reducer complexity is minimal it may not require a 'reducers' directory
// Use reducers.js in component root folder instead
// see actions.js for an example
import {application} from './application';
import {items} from './items';
import {selectedItem} from './selected-item';

export {
    application,
    items,
    selectedItem
};
