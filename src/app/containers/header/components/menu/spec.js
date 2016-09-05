import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {Menu} from './index';
import sinon from 'sinon';

/* global describe, beforeEach, it */
describe('Header/Menu', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            logout: sinon.stub()
        };
        wrapper = shallow(<Menu {...props}/>);
    });

    describe('UI Structure', () => {
        // it('should have an Settings Link', () => {
        //     expect(wrapper.find('ul.navbar-right li').at(0).text()).to.eql('Settings');
        // });
        // it('should have an Admin Link', () => {
        //     expect(wrapper.find('ul.navbar-right li').at(1).text()).to.eql('Admin');
        // });
        // it('should have an Logout Link', () => {
        //     expect(wrapper.find('Link').text()).to.eql('Logout');
        // });
    });

    describe('UI Functionality', () => {
    });
});
