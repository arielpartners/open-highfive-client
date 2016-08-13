/* global describe, it, beforeEach, afterEach, componentHandler */
import React from 'react';
import {shallow, mount} from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {ItemDetail} from './index';
import {EMPTY_ITEM} from '../../reducers/selected-item';

let expect = chai.expect;
chai.use(sinonChai);

/* eslint-disable no-unused-expressions, max-statements, no-console,  max-nested-callbacks */
describe('Item Detail', () => {
    let wrapper,
        props = {
            cancel: sinon.spy(),
            submit: sinon.spy(),
            item: EMPTY_ITEM
        };
    beforeEach(()=> {
        props = {
            cancel: sinon.spy(),
            submit: sinon.spy(),
            submitAndSelect: sinon.spy(),
            item: {}
        };
    });

    beforeEach(()=> {
        wrapper = shallow(<ItemDetail {...props} />);
    });
    afterEach(()=> {
        props.cancel.reset();
        props.submit.reset();
        props.item = EMPTY_ITEM;
    });

    describe('Component Lifecycle methods', ()=> {
        describe('componentWillMount', ()=> {
            it('should call componentHandler.upgradeDom', ()=> {
                componentHandler.upgradeDom = sinon.spy();
                wrapper = mount(<ItemDetail {...props} />);
                componentHandler.upgradeDom.called.should.be.ok;
            });
        });

        describe('componentDidUpdate', ()=> {
            it('should call componentHandler.upgradeDom', ()=> {
                wrapper = mount(<ItemDetail {...props} />);
                componentHandler.upgradeDom = sinon.spy();
                wrapper.update();
                componentHandler.upgradeDom.called.should.be.ok;
            });
        });
    });

    describe('render form', ()=> {
        beforeEach(()=> {
            wrapper = shallow(<ItemDetail {...props} />);
        });
        describe('inputs fields', ()=> {
            it('should render a text input for vendorId', ()=> {
                wrapper.find('input[type="text"][name="vendorId"]').should.be.ok;
            });

            it('should render a text input for siteId', ()=> {
                wrapper.find('input[type="text"][name="siteId"]').should.be.ok;
            });

            it('should render a text input for ipAddress', ()=> {
                wrapper.find('input[type="text"][name="ipAddress"]').should.be.ok;
            });

            it('should render a text input for phoneNumber', ()=> {
                wrapper.find('input[type="text"][name="phoneNumber"]').should.be.ok;
            });

            it('should render a checkbox for isEnabled', ()=> {
                wrapper.find('input[type="checkbox"][name="phoneNumber"]').should.be.ok;
            });

            it('should render an input for description', ()=> {
                wrapper.find('textarea[name="phoneNumber"]').should.be.ok;
            });
        });

        describe('title', ()=> {
            it('should set the form title as Add A Site when creating a new item', ()=> {
                wrapper.find('h2').contains('Add A Site');
            });

            it('should set the form title as Edit Site when updating an item', ()=> {
                props.item._id = 'notnull';
                wrapper = shallow(<ItemDetail {...props} />);
                wrapper.find('h2').contains('Edit Site');
            });
        });

        describe('buttons', ()=> {
            let button;

            describe('cancel', () => {
                it('should call the cancel method on props', ()=> {
                    wrapper = shallow(<ItemDetail {...props} />);

                    button = wrapper.find('button[type="reset"]');
                    button.simulate('click');
                    expect(props.cancel.called).to.equal(true);
                });
            });

            describe('save button', () => {
                it('should call onSubmit with submit method passed through props', ()=> {
                    wrapper = mount(<ItemDetail {...props} />);
                    wrapper.node.onSubmit = sinon.spy();
                    button = wrapper.find('button[type="submit"]');
                    button.prop('onClick')();
                    wrapper.node.onSubmit.args[0][2].should.equal(props.submit);
                });
            });

            describe('save and create another button', () => {
                it('should call onSubmit with submitAndSelect method passed through props', ()=> {
                    wrapper = mount(<ItemDetail {...props} />);
                    button = wrapper.find('.save-create');
                    wrapper.node.onSubmit = sinon.spy();
                    button.prop('onClick')();
                    wrapper.node.onSubmit.args[0][2].should.equal(props.submitAndSelect);
                });

                it('should render a save-create button if item does not have an _id', ()=> {
                    props.item = undefined;
                    wrapper = shallow(<ItemDetail {...props} />);
                    button = wrapper.find('.save-create');
                    button.length.should.equal(1);
                });

                it('should not render a save-create button if item has an _id', ()=> {
                    props.item._id = '4';
                    wrapper = shallow(<ItemDetail {...props} />);
                    button = wrapper.find('.save-create');
                    button.length.should.equal(0);
                });
            });
        });

    });

    describe('isValid', ()=> {
        it('should return true if result of querySelectorAll has no items', ()=> {
            const el = {
                querySelectorAll: ()=>[]
            };
            wrapper = mount(<ItemDetail {...props} />);

            wrapper.node.isValid(el).should.equal(true);
        });

        it('should return false if result of querySelectorAll has items', ()=> {
            const el = {
                querySelectorAll: ()=>[1, 2]
            };
            wrapper = mount(<ItemDetail {...props} />);
            wrapper.node.isValid(el).should.equal(false);
        });

        it('should query for invalid element with element.querySelectorAll', ()=> {
            const el = {
                querySelectorAll: sinon.stub().returns([])
            };
            wrapper = mount(<ItemDetail {...props} />);
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
        it('should call submit function with an object of form field input values if isValid returns true', ()=> {
            const submitFn = sinon.spy();
            const inputs = [
                {
                    id: 'name',
                    getAttribute: ()=>'text',
                    value: 'highfive'
                },
                {
                    id: 'enabled',
                    getAttribute: ()=>'checkbox',
                    checked: true
                }
            ];
            props.item = EMPTY_ITEM;
            wrapper = mount(<ItemDetail {...props} />);
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.onSubmit(form, inputs, submitFn);
            expect(submitFn.called).to.equal(true);
            expect(submitFn.args[0][0]).to.deep.equal({
                ...EMPTY_ITEM,
                name: 'highfive',
                enabled: true
            });
        });

        it('should add an invalid class name to the form if isValid returns false', ()=> {
            const submitFn = sinon.spy();
            wrapper = mount(<ItemDetail {...props} />);
            wrapper.node.isValid = sinon.stub().returns(false);
            wrapper.node.onSubmit(form, [], submitFn);
            expect(form.classList.add.args[0][0]).to.equal('invalid');
        });
    });
});
/* eslint-enable no-unused-expressions no-unused-expressions, max-statements, no-consol,e  max-nested-callbacks*/

