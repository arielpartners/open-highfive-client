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
        const labelClass = 'mdl-textfield__label',
            inputClass = 'mdl-textfield__input',
            errorClass = 'mdl-textfield__error',
            fieldSetClass = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label extrawide',
            receiverOnChange = (event) => {
                /* eslint-disable no-console */
                console.log('user email changed', event.target.options[event.target.selectedIndex].value);
                /* eslint-enable no-console */
            };

        let {user, users, createRecognition} = this.props,
            form,
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
                    <select name="receiverEmail"
                            className="form-control"
                            required
                            onChange={receiverOnChange}
                            ref={addInput}>
                        <option value="" disabled selected hidden>Select an Employee</option>
                        {
                            userList.map(
                                (employee)=>(
                                    <option
                                        value={employee.email}
                                        key={employee.email}>{employee.firstName + ' ' + employee.lastName}</option>
                                )
                            )
                        }
                        <option value="AddNew">Add a New User</option>
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
                    &nbsp;
                    <input type="reset" className="btn btn-danger" value="Start Over" data-dismiss="modal"/>
                </div>
            </form>
        );
    }
}
/* eslint-enable max-len */
