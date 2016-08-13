import React, {PropTypes, Component} from 'react';
// import componentHandler from 'material-design-lite/src/mdlComponentHandler.js';


/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

export const getFormData = (inputs, originalItem) => (
    Object.assign({}, originalItem,
        inputs.reduce((data, input)=> {
            const type = input.getAttribute('type');
            const name = input.id;
            data[name] = /(radio|checkbox)/i.test(type) ? input.checked : input.value;
            return data;
        }, {})
    )
);

export class ItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        componentHandler.upgradeDom();
    }
    componentDidUpdate(){
        componentHandler.upgradeDom();
    }

    isValid(form) {
        return form.querySelectorAll('*:invalid').length === 0;
    }

    onSubmit(form, inputs, submitFn) {
        if (this.isValid(form)) {
            form.classList.remove('invalid');
            submitFn(getFormData(inputs, this.props.item), {});
        } else {
            form.classList.add('invalid');
        }
    }

    render() {
        const {item = {}, cancel, submit, submitAndSelect} = this.props,
            inputs = [],
            addInput = (input) => {
                inputs.push(input);
            },
            labelClass = 'mdl-textfield__label',
            inputClass = 'mdl-textfield__input',
            fieldSetClass = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label',
            title = item._id ? 'Edit Site' : 'Add A Site';
        let form;
        return (
            <div className="item-detail-component mdl-card mdl-shadow--6dp">
                <div className="mdl-card__title mdl-color--black mdl-color-text--white">
                    <h2 className="mdl-card__title-text">{title}</h2>
                </div>
                <form ref={(ref)=> {form = ref}}
                      className="mdl-card__supporting-text"
                      noValidate>
                    <div className={fieldSetClass}>
                        <label className={labelClass}
                               htmlFor="vendorId">Vendor ID</label>
                        <input type="text"
                               id="vendorId"
                               required={true}
                               defaultValue={item.vendorId}
                               className={inputClass}
                               ref={addInput}/>

                    </div>
                    <div className={fieldSetClass}>
                        <label className={labelClass}
                               htmlFor="siteId">Site ID</label>
                        <input type="text"
                               id="siteId"
                               defaultValue={item.siteId}
                               className={inputClass}
                               required={true}
                               ref={addInput}/>
                    </div>
                    <div className={fieldSetClass}>
                        <label className={labelClass}
                               htmlFor="ipAddress">IP Address</label>
                        <input type="text"
                               id="ipAddress"
                               defaultValue={item.ipAddress}
                               className={inputClass}
                               required={true}
                               ref={addInput}/>
                    </div>
                    <label className="mdl-checkbox mdl-js-checkbox">
                        <input type="checkbox"
                               ref={addInput}
                               defaultChecked={item.isEnabled}
                               id="isEnabled"
                               className="mdl-checkbox__input"/>
                        <span className="mdl-checkbox__label">Enabled</span>
                    </label>

                    <div className={fieldSetClass}>
                        <label className={labelClass}>Phone Number</label>
                        <input type="text"
                               defaultValue={item.phoneNumber}
                               className={inputClass}
                               id="phoneNumber"
                               ref={addInput}/>
                    </div>
                    <div className={fieldSetClass}>
                        <label className={labelClass}>Street Address</label>
                        <input type="text"
                               className={inputClass}
                               defaultValue={item.streetAddress}
                               id="streetAddress"
                               ref={addInput}/>
                    </div>
                    <div className={fieldSetClass}>
                        <label className={labelClass} htmlFor="description">Description</label>
                        <textarea name="description"
                                  id="description"
                                  defaultValue={item.description}
                                  className={inputClass}
                                  ref={addInput}/>
                    </div>
                </form>
                <div className="mdl-card__actions">
                    <button type="reset"
                            className="mdl-button mdl-js-button mdl-js-ripple-effect"
                            onClick={()=>cancel()}>Cancel
                    </button>
                    {
                        !item._id ?
                        <button type="button"
                                className="save-create
                                           mdl-button
                                           mdl-button--colored
                                           mdl-js-button
                                           mdl-js-ripple-effect"
                                onClick={()=>this.onSubmit(form, inputs, submitAndSelect, {})}>Save &amp; Add Another
                        </button>
                        : null
                    }
                    <button type="submit"
                            className="mdl-button
                                       mdl-button--colored
                                       mdl-js-button
                                       mdl-js-ripple-effect"
                            onClick={()=>this.onSubmit(form, inputs, submit)}>Save
                    </button>
                </div>
            </div>
        );
    }
}

ItemDetail.propTypes = {
    item: React.PropTypes.object,
    cancel: React.PropTypes.func.isRequired
};
