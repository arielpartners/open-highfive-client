import React from 'react';
import {getFormData} from '../../../../index';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('./style.scss');
}

export const RecognizePeer = ({users, }) => {
    let userList = users || [];
    return (
        <div className="col-lg-3 recognize-peer">

            <h2 className="h5-sectionhdr">Reward Someone <em>for a deed well done</em></h2>

            <div className="form-group h5-margintop20">
                <select id="staffName" name="staffName" className="form-control">
                    <option value="">Select an Employee</option>
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
                <textarea className="form-control"
                          placeholder="Write a few words about what they did or why it was memorable" id="occurrence"
                          name="occurrence"></textarea>
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

            <div className="form-group">
                <select id="rewardPoints" name="rewardPoints" className="form-control">
                    <option value="">Select a Recognition Level</option>
                    <option value="50">50</option>
                    <option value="40">40</option>
                    <option value="30">30</option>
                    <option value="20">20</option>
                    <option value="10">10</option>
                </select>
                <p>You have <strong>70 points</strong> left to award this month</p>
            </div>

            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Give your Reward" data-dismiss="modal"/>
                <input type="reset" className="btn btn-danger" value="Start Over" data-dismiss="modal"/>
            </div>
        </div>
    );
};
