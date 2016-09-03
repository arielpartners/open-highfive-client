import React from 'react';

export const RecognizePeer = () => {

    return (
        <span>
            <div className="form-group">
              <label for="staffName">Employee Name *</label>
              <select id="staffName" name="staffName" className="form-control">
                <option value="">Select employee name</option>
              </select>
            </div>
            <div className="form-group">
              <label for="occurrence">Occurence *</label>
              <textarea
                className="form-control"
                placeholder="Describe the reason that prompts for this recognition"
                id="occurrence"
                name="occurrence"></textarea>
            </div>
            <fieldset className="form-group">
              <label>Demonstrated Corporate Value *</label>
              <div className="radio">
                <label>
                <input type="radio" name="corpvalue" id="corpvalueExcellence" value="Excellence"/>
                Excellence
                </label>
              </div>
              <div className="radio">
                <label>
                <input type="radio" name="corpvalue" id="corpvalueAccountability" value="Accountability"/>
                Accountability
                </label>
              </div>
              <div className="radio disabled">
                <label>
                <input type="radio" name="corpvalue" id="corpvalueInitiative" value="Initiative"/>
                Initiative
                </label>
              </div>
              <div className="radio disabled">
                <label>
                <input type="radio" name="corpvalue" id="corpvalueTeamwork" value="Teamwork"/>
                Teamwork
                </label>
              </div>
              <div className="radio disabled">
                <label>
                <input type="radio" name="corpvalue" id="corpvalueEmpowerment" value="Empowerment"/>
                Empowerment
                </label>
              </div>
            </fieldset>

            <div className="form-group">
              <label for="rewardPoints">Reward Points *</label>
              <select id="rewardPoints" name="rewardPoints" className="form-control">
                <option value="">Select reward points</option>
                <option value="50">50</option>
                <option value="40">40</option>
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
              </select>
            </div>
        </span>
    );
};

export const RecognizePeerFooter = (props) => {
    return (
        <span>
            <input onClick={props.onClick}
              type="submit" className="btn btn-primary" value="High Five!" data-dismiss="modal"/>
            <input onClick={props.onClick}
              type="reset" className="btn btn-danger" value="Maybe Not" data-dismiss="modal"/>
        </span>
    );
};
