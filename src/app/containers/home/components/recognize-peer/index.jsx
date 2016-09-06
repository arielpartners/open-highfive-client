import React from 'react';
import cx from 'classnames';
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

export const RecognizePeer = ({user, users, createRecognition}) => {
    let form,
        newUserHidden = true,
        statics = [
            {senderEmail : user.email},
            {organizationName: 'DHS'},
            {points: 1}
        ],
        inputs = [],
        userList = users || [],
        addInput = (input) => {
            inputs.push(input);
        };

    const
        ADD_NEW = 'Add New',
        labelClass = 'mdl-textfield__label',
        inputClass = 'mdl-textfield__input',
        errorClass = 'mdl-textfield__error',
        fieldSetClass = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label extrawide',
        receiverOnChange = (event) => {
            const selectedUser =  event.target.options[event.target.selectedIndex].value;
            newUserHidden = selectedUser === ADD_NEW ? false : true;
            /* eslint-disable no-console */
                console.log('user email changed', event.target.options[event.target.selectedIndex].value);
            /* eslint-enable no-console */
        };

    return (
        <form onSubmit={
            (event) => event.preventDefault() &
            onSubmit(form, getFormData, inputs, createRecognition, statics)
        }
              noValidate
              ref={(ref)=> {
                  form = ref;
              }}
              className="col-lg-3 recognize-peer">

            <h2 className="h5-sectionhdr">Reward Someone <em>for a deed well done</em></h2>

            <div className="form-group h5-margintop20">
                <select name="receiverEmail"
                        className="form-control"
                        onChange={receiverOnChange}
                        tabIndex={1}
                        required
                        ref={addInput}>
                    <option value="" disabled selected hidden>Select an Employee</option>
                    {
                        userList.map(
                            (user)=>(
                                <option
                                    value={user.email} key={user.email}>{user.firstName + ' ' + user.lastName}</option>
                            )
                        )
                    }
                    <option value={ADD_NEW}>Add a New User</option>
                </select>
            </div>

            <div className="form-group">
                <textarea ref={addInput}
                          className="form-control"
                          tabIndex={2}
                          required
                          placeholder="Write a few words about what they did or why it was memorable" id="occurrence"
                          name="description"></textarea>
            </div>
            <div className="form-group">
                <select name="corporateValueName"
                        className="form-control"
                        tabIndex={3}
                        required
                        ref={addInput}>
                    <option value="" disabled selected hidden>Select a Category</option>
                    <option value="Teamwork">Teamwork</option>
                    <option value="Improvement">Improvement</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Experiment">Experiment</option>
                </select>
            </div>

            { /* Commenting out because we might go back to this later */ }
            {/*<fieldset className="form-group" name="corporateValueName">*/}
                {/*<label>Select a Core Value that was demonstrated:</label>*/}
                {/*<div className="radio">*/}
                    {/*<label>*/}
                        {/*<input type="radio" name="corpvalue" id="corpvalueExcellence" value="Integrity"/>*/}
                        {/*<strong>Teamwork</strong>: Support My Team Members*/}
                    {/*</label>*/}
                {/*</div>*/}
                {/*<div className="radio">*/}
                    {/*<label>*/}
                        {/*<input type="radio" name="corpvalue" id="corpvalueAccountability" value="Vigilance"/>*/}
                        {/*<strong>Improvement</strong>: Streamline My Organization*/}
                    {/*</label>*/}
                {/*</div>*/}
                {/*<div className="radio">*/}
                    {/*<label>*/}
                        {/*<input type="radio" name="corpvalue" id="corpvalueInitiative" value="Respect"/>*/}
                        {/*<strong>Delivery</strong>: Continuous Product Delivery*/}
                    {/*</label>*/}
                {/*</div>*/}
                {/*<div className="radio">*/}
                    {/*<label>*/}
                        {/*<input type="radio" name="corpvalue" id="corpvalueTeamwork" value="Excellence"/>*/}
                        {/*<strong>Experiment</strong>: Open to New Ideas*/}
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
            <div className={ cx('mdl-card__supporting-text', {hide: newUserHidden}) }>
                <div className="mdl-card__supporting-text">
                    <div className={fieldSetClass}>
                        <input ref={addInput}
                               className={inputClass}
                               type="text"
                               required={true}
                               tabIndex={4}
                               name="newUserName"/>
                        <label className={labelClass} htmlFor="newUserName">Firstname Lastname</label>
                        <span className={errorClass}>Password is required</span>
                    </div>
                    <div className={fieldSetClass}>
                        <input ref={addInput}
                               className={inputClass}
                               required={true}
                               tabIndex={5}
                               type="email"
                               name="newUserEmail"/>
                        <label className={labelClass} htmlFor="newUserEmail">Email</label>
                        <span className={errorClass}>Valid email address is required</span>
                    </div>

                </div>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Give your Reward" data-dismiss="modal"/>
                <input type="reset" className="btn btn-danger" value="Start Over" data-dismiss="modal"/>
            </div>
        </form>
    );
};
