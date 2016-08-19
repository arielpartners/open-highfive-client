/* global describe, beforeEach */
//import React from 'react';
// import {shallow} from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
//import {Header} from './index';

//let expect = chai.expect;
chai.use(sinonChai);

/* eslint-disable no-unused-expressions, max-statements, no-console */
describe('Header', () => {

    beforeEach(()=> {
        this.props = {
            logout: sinon.spy(),
            loggedIn: true
        };
    });

    describe('render form', ()=> {

    });

});
