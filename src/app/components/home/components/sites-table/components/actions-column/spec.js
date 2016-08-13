
/* global describe, it */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {ActionsColumn} from './index';
import sinon from 'sinon';

/* eslint-disable max-nested-callbacks, no-unused-expressions */
describe('ActionsColumn', () => {
    const props = {
        rowData: {id: 1},
        metadata: {onChange: sinon.spy(), onEdit: sinon.spy(), onDelete: sinon.spy()}
    };

    it('should prevent event propagation on click', ()=> {
        const event = {
            stopPropagation: sinon.spy()
        };
        const wrapper = shallow(<ActionsColumn {...props} />);
        wrapper.simulate('click', event);
        expect(event.stopPropagation.called).to.equal(true);
    });

    it('should call metadata.onChange when checkbox changes', ()=> {
        const event = {
            target: { checked : true}
        };
        const checkbox = shallow(<ActionsColumn {...props} />).find('input[type="checkbox"]').shallow();
        checkbox.simulate('change', event);
        expect(props.metadata.onChange.called).to.equal(true);
    });

    it('should call metadata.onEdit when edit icon is clicked', ()=> {
        const editIcon = shallow(<ActionsColumn {...props} />).find('.edit').shallow();
        editIcon.simulate('click');
        expect(props.metadata.onEdit.called).to.equal(true);
    });

    it('should call metadata.onDelete when delete icon is clicked', ()=> {
        const deleteIcon = shallow(<ActionsColumn {...props} />).find('.delete').shallow();
        deleteIcon.simulate('click');
        expect(props.metadata.onDelete.called).to.equal(true);
    });
});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
