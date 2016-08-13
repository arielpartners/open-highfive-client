// When reducer complexity is minimal it may not require a 'reducers' directory
// Use reducers.js in component root folder instead
// see actions.js for an example
import {application} from './application';
import {error} from './error';
import {user} from './user';
import {items} from './items';
import {selectedItem} from './selected-item';
import {loggedIn} from '../components/login/reducers';

export {
    application,
    user,
    loggedIn,
    error,
    items,
    selectedItem
};
