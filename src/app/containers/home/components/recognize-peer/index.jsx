import React, {Component} from 'react';
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

/* global $ */
/* eslint-disable max-len */
export class RecognizePeer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
    }

    componentDidUpdate() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
    }

    componentDidMount() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
        $('[data-toggle="popover"]').popover();
    }

    componentDidUpdate() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
        $('[data-toggle="popover"]').popover();
    }

    render() {
        let {users, createRecognition} = this.props;

        let form,
            statics = [
                {senderEmail : 'test@test.com'},
                {organizationName: 'DHS'},
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

                <h2 className="h5-sectionhdr">
                    <a href="#" data-toggle="popover" data-trigger="hover" data-placement="left" title=""
                       data-content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi."
                       data-original-title="How to Give a Point">
                        <span className="glyphicon glyphicon-question-sign" style={{fontSize: '70%'}}></span>
                    </a> Give a Point
                </h2>

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
                <div className="form-group">
                    <select name="corporateValueName" className="form-control" required ref={addInput}>
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

                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Give your Reward" data-dismiss="modal"/>
                    &nbsp;
                    <input type="reset" className="btn btn-danger" value="Start Over" data-dismiss="modal"/>
                </div>
            </form>
        );
    }
}
/* eslint-enable max-len */
