import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './actions';
import {ItemDetail} from './components/item-detail';
import {SitesTable} from './components/sites-table';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

export const Home = ({logout, loadItems, items, selectedItem,
                     selectItem, createItem, updateItem, deleteItem, createAndSelectItem}) => {
    return (
            <div className="home-component">

                <div className="main-content">
                    <div className="actions">
                        <button className="mdl-button mdl-js-button mdl-button--raised"
                                onClick={()=>selectItem({})}>Add A Site
                        </button>
                    </div>
                    <SitesTable loadItems={loadItems}
                                updateItem={updateItem}
                                selectItem={selectItem}
                                selectedItem={selectedItem}
                                deleteItem={deleteItem}
                                sites={items}/>

                    {
                        (selectedItem) ?
                            <div className="form-modal">
                                <ItemDetail item={selectedItem}
                                            submitAndSelect={createAndSelectItem}
                                            submit={selectedItem._id ? updateItem : createItem}
                                            cancel={()=>selectItem()}/>
                            </div>
                            : null
                    }
                </div>
            </div>
    );
};

Home.propTypes = {
    createItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    loadItems: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};

/* istanbul ignore next  */
const mapStateToProps = (state) => state;

/* istanbul ignore next  */
const mapDispatchToProps = (dispatch) => (
    bindActionCreators({...Actions}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
