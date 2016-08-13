/* global describe, it, beforeEach */
import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import {SitesTable} from './';
import sinon from 'sinon';

/* eslint-disable max-nested-callbacks, no-unused-expressions, max-statements */
describe('Sites Table', () => {
    const item = {
        _id: 'foo',
        vendorId: 'lg',
        siteId: '123',
        description: 'item description',
        phoneNumber: '212555-1234',
        ipAddress: '127.0.0.1',
        isEnabled: true
    };

    const props = {
        loadItems: sinon.spy(),
        sites: [item],
        selectedItem: item,
        selectItem: sinon.spy(),
        updateItem: sinon.spy(),
        deleteItem: sinon.spy()
    };

    describe('Table', ()=> {
        let table;
        let wrapper = mount(<SitesTable {...props} />);

        beforeEach(()=> {
            table = wrapper.find('Griddle');
        });

        it('should render a table listing the sites', ()=> {
            expect(table.length).to.equal(1);
            expect(table.props().results).to.equal(props.sites);
        });

        it('should have vendorId, statusId, ipAddress, description, street address, isEnabled as columns', ()=> {
            expect(table.props().columns).to.deep.equal([
                'vendorId',
                'siteId',
                'ipAddress',
                'description',
                'phoneNumber',
                'streetAddress',
                'isEnabled']
            );
        });

        it('should set a selected class on the row of the selected item', ()=>{
            expect(wrapper.find('tr.selected').length).to.equal(1);
        });

        it('should not set a selected class on a  row  if there is no selected item', ()=>{
            wrapper = mount(<SitesTable {...props} selectedItem={null} />);
            expect(wrapper.find('tr.selected').length).to.equal(0);
        });

        it('should set prop onRowClick to call selectItem with row data', ()=> {
            table.props().onRowClick({props: {data: item}});
            expect(props.selectItem.called).to.equal(true);
            expect(props.selectItem.args[0][0]).to.equal(item);
        });

        describe('isEnabled column', ()=>{
            let columnMetadata;
            beforeEach(()=>{
                const metadata = table.props().columnMetadata;
                columnMetadata = metadata.find((data)=>data.columnName === 'isEnabled');
            });

            it('should have an onChange method in its metadata that calls props.updateItem', ()=>{
                columnMetadata.onChange(false, item);
                expect(props.updateItem.args[0][0]).to.deep.equal({...item, isEnabled: false});
            });

            it('should set selectItem on its metadata as onEdit', ()=>{
                columnMetadata.onEdit(item);
                expect(props.selectItem.args[0][0]).to.deep.equal(item);
            });

            it('should set deleteItem on its metadata as onDelte', ()=>{
                columnMetadata.onDelete(item);
                expect(props.deleteItem.args[0][0]).to.deep.equal(item);
            });
        });
    });

    describe('Subcomponents', () => {
        require('./components/actions-column/spec');
    });
});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
