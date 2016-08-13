/* global describe, it, beforeEach */
import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {Header} from './index';

let expect = chai.expect;
chai.use(sinonChai);

/* eslint-disable no-unused-expressions, max-statements, no-console */
describe('Header', () => {
    let props;
    beforeEach(()=> {
        props = {
            logout: sinon.spy(),
            loggedIn: true
        };
    });

    describe('render form', ()=> {
        it('should render a visible button to logout', ()=> {
            props.loggedIn = false;
            let wrapper = shallow(<Header {...props} />);
            let button = wrapper.find('.logout-btn');
            button.hasClass('invisible').should.be.ok;
        });

        it('should not render a visible button to logout', ()=> {
            let wrapper = shallow(<Header {...props} />);
            let button = wrapper.find('.logout-btn');
            button.hasClass('invisible').should.not.be.ok;
        });
    });

    describe('logout', () => {
        it('should call the logout method on props', ()=> {
            const wrapper = shallow(<Header {...props} />);
            const button = wrapper.find('.logout-btn');
            button.simulate('click');
            expect(props.logout.called).to.equal(true);
        });
    });
});
