import React, {Component, PropTypes} from 'react';
import Griddle from 'griddle-react';
import {ActionsColumn} from './components/actions-column';

/* istanbul ignore next  */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

const columnMetadata = [
    {
        columnName: "vendorId",
        displayName: "Vendor ID",
        locked: true,
        visible: false
    },
    {
        columnName: "siteId",
        displayName: "Site ID",
        cssClassName: "site-id",
        locked: false,
        visible: true
    },
    {
        columnName: "ipAddress",
        displayName: "IP Address",
        cssClassName: "ip-address",
        locked: false,
        visible: true
    },
    {
        columnName: "description",
        displayName: "Description",
        cssClassName: "description",
        locked: false,
        visible: false
    },
    {
        columnName: "phoneNumber",
        displayName: "Phone Number",
        cssClassName: "phone-number",
        locked: false,
        visible: true
    },
    {
        columnName: "streetAddress",
        displayName: "Street Address",
        cssClassName: "streetAddress",
        locked: false,
        visible: true
    },
    {
        columnName: "isEnabled",
        displayName: "Enabled",
        cssClassName: "actions",
        customComponent: ActionsColumn,
        locked: false,
        visible: true
    }
];

/* eslint-disable no-shadow, max-len*/
export class SitesTable extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadItems();
        const enableColumn = columnMetadata.find((col)=>col.columnName === 'isEnabled');
        enableColumn.onChange = (value, rowData)=> {
            const oldItem = this.props.sites.find(
                (site) => site.vendorId === rowData.vendorId && site.siteId === rowData.siteId
            );
            const item = {...oldItem, isEnabled: value};
            this.props.updateItem(item);
        };
        enableColumn.onDelete = this.props.deleteItem;
        enableColumn.onEdit = this.props.selectItem;
    }

    render() {
        const {sites, selectItem} = this.props;
        const rowMetadata = {
            bodyCssClassName: (rowData) => (
                (this.props.selectedItem && rowData._id === this.props.selectedItem._id) ? "selected" : null
            )
        };

        return (
            <div className="sites-table-component">
                <Griddle
                    tableClassName="mdl-data-table mdl-js-data-table"
                    sortAscendingComponent={decodeURI('%E2%96%B2')}
                    rowMetadata={rowMetadata}
                    onRowClick={(row)=> { selectItem(row.props.data)}}
                    sortDescendingComponent={decodeURI('%E2%96%BC')}
                    columnMetadata={columnMetadata}
                    results={sites}
                    columns={['vendorId', 'siteId', 'ipAddress', 'description', 'phoneNumber', 'streetAddress', 'isEnabled']}
                    enableSort={true}
                    showSettings={false}
                    showFilter={true}
                    showPager={true}
                    resultsPerPage={25}/>
            </div>
        );
    }
}

SitesTable.propTypes = {
    sites: PropTypes.array.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    loadItems: PropTypes.func.isRequired
};