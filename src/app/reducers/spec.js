/* global describe */
describe('Reducers', ()=> {
    require('./error/spec');
    require('./modal/spec');

    require('../containers/header/reducers/spec');
    require('../containers/home/reducers/spec');
});
