/*
 Copyright (c) 2015 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it, beforeEach, afterEach, componentHandler */
import React from 'react';
import {Login} from './';
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

/* eslint-disable no-unused-expressions, max-statements, no-console, camelcase, max-nested-callbacks */
describe('Login component', () => {
    let wrapper,
        props = {};
    beforeEach(()=> {
        props = {
            login: sinon.spy(),
            changeEmail: sinon.spy(),
            changePassword: sinon.spy(),
        };
    });
    afterEach(()=> {
        props.login.reset();
        props.changeEmail.reset();
        props.changePassword.reset();
    });
    describe('Component Lifecycle methods', ()=> {
        describe('componentWillMount', ()=> {
            it('should call componentHandler.upgradeDom', ()=> {
                componentHandler.upgradeDom = sinon.spy();
                wrapper = mount(<Login {...props} />);
                componentHandler.upgradeDom.called.should.be.ok;
            });
        });

        describe('componentDidUpdate', ()=> {
            it('should call componentHandler.upgradeDom', ()=> {
                wrapper = mount(<Login {...props} />);
                componentHandler.upgradeDom = sinon.spy();
                wrapper.update();
                componentHandler.upgradeDom.called.should.be.ok;
            });
        });
    });
    describe('render form', ()=> {
        beforeEach(()=> {
            wrapper = shallow(<Login {...props} />);
        });
        it('should render three email fields', () => {
            const input = wrapper.find('input[type="text"]');
            expect(input).to.have.length(3);
        });
        it('should render three password fields', () => {
            const input = wrapper.find('input[type="password"]');
            expect(input).to.have.length(3);
        });
        it('should render a submit button', () => {
            const button = wrapper.find('button[type="submit"]');
            expect(button).to.have.length(1);
        });
    });
    describe('buttons', ()=> {
        let button;
        it('should call props.login when submit is clicked in the normal case', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            button.simulate('click');
            expect(props.login.called).to.equal(true);
        });
        it('should not call props.login when submit is clicked if the form is invalid', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(false);
            button.simulate('click');
            expect(props.login.called).to.equal(false);
        });
        it('should display an error message if an error is defined', ()=> {
            props.error = {message: 'oops something broke'};
            wrapper = mount(<Login {...props} />);
            wrapper.find('button[type="submit"]');
            expect(wrapper.text()).to.contain(props.error.message);
        });
    });
    describe('isValid', ()=> {
        it('should return true if result of querySelectorAll has no items', ()=> {
            const el = {
                querySelectorAll: ()=>[]
            };
            wrapper = mount(<Login {...props} />);

            wrapper.node.isValid(el).should.equal(true);
        });

        it('should return false if result of querySelectorAll has items', ()=> {
            const el = {
                querySelectorAll: ()=>[1, 2]
            };
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid(el).should.equal(false);
        });

        it('should query for invalid element with element.querySelectorAll', ()=> {
            const el = {
                querySelectorAll: sinon.stub().returns([])
            };
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid(el);
            el.querySelectorAll.args[0][0].should.equal('*:invalid');
        });
    });
    describe('onSubmit', ()=> {
        let form;
        beforeEach(()=> {
            form = {
                classList: {
                    add: sinon.spy(),
                    remove: sinon.spy()
                }
            };
        });
        it('should call login function with correct form field input values if isValid returns true', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'user_pass',
                    getAttribute: ()=>'password',
                    value: 'password'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.onSubmit(form, inputs);
            expect(props.login.called).to.equal(true);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(false);
            expect(props.login.args[0][0]).to.deep.equal({
                email: 'a@b.com',
                user_pass: 'password'
            });
        });
        it('should not call login function if isValid returns false', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'user_pass',
                    getAttribute: ()=>'password',
                    value: 'password'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(false);
            wrapper.node.onSubmit(form, inputs);
            expect(props.login.called).to.equal(false);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(true);
        });
    });
});
