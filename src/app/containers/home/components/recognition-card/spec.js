import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {RecognitionCard} from './index';
// import sinon from 'sinon';


/* global describe, beforeEach, it */
describe('RecognitionCard', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            receiver: 'tester',
            sender: 'test',
            date: '01/01/2001',
            points: 10,
            corporateValue: 'Teamwork'
        };

        wrapper = shallow(<RecognitionCard {...props}/>);
    });

    describe('UI Structure', () => {
        it('should have an image for the user', () => {
            expect(wrapper.find('img')).to.have.length(1);
        });

        it('should have links for the reciever and sender', () => {
            expect(wrapper.find('a.h5-recognized-person')).to.have.length(1);
            expect(wrapper.find('a.h5-recognized-by')).to.have.length(1);
        });

        it('should have spans for date, points, and corporateValue', () => {
            expect(wrapper.find('span.h5-recognized-value')).to.have.length(1);
            expect(wrapper.find('span.h5-recognized-date')).to.have.length(1);
            expect(wrapper.find('span.h5-recognized-pts')).to.have.length(1);
        });
    });
});
