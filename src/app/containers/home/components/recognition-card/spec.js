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
            receiverName: 'tester',
            senderName: 'test',
            dateCreated: '01/01/2001',
            points: 10,
            corporateValueName: 'Teamwork'
        };

        wrapper = shallow(<RecognitionCard {...props}/>);
    });

    describe('UI Structure', () => {
        it('should have an image for the user', () => {
            expect(wrapper.find('img')).to.have.length(1);
        });

        it('should have links for the reciever and sender', () => {
            expect(wrapper.find('.h5-recognized-person a')).to.have.length(1);
        });

        it('should have places for points, and corporateValue', () => {
            expect(wrapper.find('h3')).to.have.length(1);
            expect(wrapper.find('blockquote span')).to.have.length(1);
        });
    });

    describe('Data Population', () => {
        it('should have have correct data written', () => {
            expect(wrapper.find('.h5-recognized-person a').text()).to.eql(props.receiverName);
            expect(wrapper.find('blockquote span').text()).to.eql(props.points + ' Points from ' + props.senderName);
            expect(wrapper.find('h3').text()).to.eql(props.corporateValueName);
        });
    });
});
