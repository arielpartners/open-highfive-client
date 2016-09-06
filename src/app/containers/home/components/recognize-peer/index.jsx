import React from 'react';
import {getFormData} from '../../../../index';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('./style.scss');
}

const isValid = (form) => {
    return form.querySelectorAll('*:invalid').length === 0;
};

/* eslint-disable max-params */
const onSubmit = (form, getData, inputs, createRecognition, statics) => {
    form.classList.remove('invalid');

    if (!isValid(form)) {
        form.classList.add('invalid');
    } else {
        createRecognition(Object.assign(getData(inputs), ...statics));
    }
};
/* eslint-enable max-params */

export const RecognizePeer = ({users, createRecognition}) => {
    let form,
        statics = [
            {senderEmail : 'test@test.com'},
            {corporateValueName: 'Integrity'},
            {organizationName: 'Ariel Partners'},
            {points: 1}
        ],
        inputs = [],
        userList = users || [],
        addInput = (input) => {
            inputs.push(input);
        };

    return (
        <form onSubmit={(event) => event.preventDefault() &
                       onSubmit(form, getFormData, inputs, createRecognition, statics)}
              noValidate
              ref={(ref)=> {
                  form = ref;
              }}
              className="col-lg-3 recognize-peer">

            <h2 className="h5-sectionhdr">Reward Someone <em>for a deed well done</em></h2>

            <div className="form-group h5-margintop20">
                <select name="receiverEmail" className="form-control" required ref={addInput}>
                    <option value="" disabled selected hidden>Select an Employee</option>
                    {
                        userList.map(
                            (user)=>(
                                <option
                                    value={user.email} key={user.email}>{user.firstName + ' ' + user.lastName}</option>
                            )
                        )
                    }
                </select>
            </div>

            <div className="form-group">
                <textarea ref={addInput}
                          className="form-control"
                          required
                          placeholder="Write a few words about what they did or why it was memorable" id="occurrence"
                          name="description"></textarea>
            </div>

            {/*<fieldset className="form-group">*/}
                {/*<label>Select a Core Value that was demonstrated:</label>*/}
                {/*<div className="radio">*/}
                    {/*<label>*/}
                        {/*<input type="radio" name="corpvalue" id="corpvalueExcellence" value="Integrity"/>*/}
                        {/*<strong>Integrity</strong>: Service Before Sell*/}
                    {/*</label>*/}
                {/*</div>*/}
                {/*<div className="radio">*/}
                    {/*<label>*/}
                        {/*<input type="radio" name="corpvalue" id="corpvalueAccountability" value="Vigilance"/>*/}
                        {/*<strong>Vigilance</strong>: Guarding America*/}
                    {/*</label>*/}
                {/*</div>*/}
                {/*<div className="radio disabled">*/}
                    {/*<label>*/}
                        {/*<input type="radio" name="corpvalue" id="corpvalueInitiative" value="Respect"/>*/}
                        {/*<strong>Respect</strong>: Honoring our Partners*/}
                    {/*</label>*/}
                {/*</div>*/}
                {/*<div className="radio disabled">*/}
                    {/*<label>*/}
                        {/*<input type="radio" name="corpvalue" id="corpvalueTeamwork" value="Excellence"/>*/}
                        {/*<strong>Excellence</strong>: Exceeding Expectations*/}
                    {/*</label>*/}
                {/*</div>*/}
                {/*<div className="radio disabled">*/}
                    {/*<label>*/}
                        {/*<input type="radio" name="corpvalue" id="corpvalueEmpowerment" value="Accountability"/>*/}
                        {/*<strong>Accountability</strong>: Taking Ownership*/}
                    {/*</label>*/}
                {/*</div>*/}
            {/*</fieldset>*/}

            {/*<div className="form-group">*/}
                {/*<select name="points" className="form-control" required ref={addInput}>*/}
                    {/*<option value="" disabled selected hidden>Select a Recognition Level</option>*/}
                    {/*<option value="50">50</option>*/}
                    {/*<option value="40">40</option>*/}
                    {/*<option value="30">30</option>*/}
                    {/*<option value="20">20</option>*/}
                    {/*<option value="10">10</option>*/}
                {/*</select>*/}
                {/*<p>You have <strong>70 points</strong> left to award this month</p>*/}
            {/*</div>*/}

            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Give your Reward" data-dismiss="modal"/>
                <input type="reset" className="btn btn-danger" value="Start Over" data-dismiss="modal"/>
            </div>
        </form>
    );
};
