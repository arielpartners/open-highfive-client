/* global describe, it */
import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Home} from './index';
import {ItemDetail} from './components/item-detail';

describe('Home component suite', () => {
    describe('Logged out', ()=> {
        it('should render the Login Component', ()=> {
            const props = {
                login: sinon.spy(),
                logout: sinon.spy(),
                loadItems: sinon.spy(),
                createItem: sinon.spy(),
                selectItem: sinon.spy(),
                updateItem: sinon.spy(),
                deleteItem: sinon.spy(),
                items: [],
                loggedIn: false
            };
            const wrapper = shallow(<Home {...props} />);
            expect(wrapper.find('Login')).to.have.length(1);
        });
    });

    describe('Logged in', ()=> {
        let globalProps = {
            login: () => {
            },
            logout: sinon.spy(),
            selectItem: sinon.spy(),
            loadItems: sinon.spy(),
            createItem: sinon.spy(),
            updateItem: sinon.spy(),
            deleteItem: sinon.spy(),
            items : [],
            loggedIn: true
        };

        describe('Error handling', ()=> {
            it('should display an error message if an error is defined', ()=> {
                const props = {
                        ...globalProps,
                        error: {message: 'the db went missing'},
                        items: [],
                        selectedItem: {}
                    },
                    wrapper = shallow(<Home {...props} />);

                expect(wrapper.text()).to.contain(props.error.message);
            });
        });

        describe('Item Detail', ()=> {
            it('should not render item detail component if selected item is null', ()=> {
                const props = {
                    ...globalProps
                };
                props.selectedItem = null;
                const wrapper = shallow(<Home {...props} />);
                expect(wrapper.find(ItemDetail).length).to.equal(0);
            });

            it('should contain a button that will call selectItem with an empty Object', ()=> {
                const props = {
                        ...globalProps,
                        selectItem: sinon.spy()
                    },
                    wrapper = shallow(<Home {...props} />),
                    button = wrapper.find('button[onClick]');
                button.simulate('click');
                expect(props.selectItem.args[0][0]).to.deep.equal({});
            });

            it('should set cancel prop on item detail with a method that calls selectItem with no args', ()=> {
                const props = {
                        ...globalProps,
                        selectedItem: {},
                        selectItem: sinon.spy()
                    },
                    wrapper = mount(<Home {...props} />),
                    itemDetail = wrapper.find(ItemDetail);

                itemDetail.props().cancel();
                expect(props.selectItem.args[0].length).to.equal(0);
            });
        });

        describe('Login Component', ()=> {
            it('should not render', ()=> {
                const props = {
                        ...globalProps,
                        items: [{_id: 'foo'}],
                        selectedItem: {_id: 'foo'}
                    },
                    wrapper = shallow(<Home {...props} />);

                expect(wrapper.find('Login')).to.have.length(0);
            });
        });

        describe('Connects the React home component to a Redux store', () => {
            it('should not test the connect logic by convention, its not worth the effort');
        });

    });

    describe('Redux', () => {
        require('./reducers/spec');
        require('./components/login/reducers/spec');
        require('./actions/spec');
        require('./components/login/actions/spec');
    });

    describe('Subcomponents', () => {
        require('./components/header/spec');
        require('./components/login/spec');
        require('./components/sites-table/spec');
        require('./components/item-detail/spec');
    });

});
