import React, {PropTypes} from 'react';

import {DoughnutChart as Chart} from './components/chart';
// import MyRewardActivities from './components/my-reward-activities';

/* istanbul ignore next */
if (__WEBPACK__) {
    //require('./style.scss');
}

// TODO: Colors need to be mapped to corporate values not index
const configColors = [
    {color: '#00578C', highlight: '#FF5A5E'},
    {color: '#330099', highlight: '#5AD3D1'},
    {color: '#007700', highlight: '#FFC870'},
    {color: '#FF6600', highlight: '#A8B3C5'},
    {color: '#007700', highlight: '#616774'},
    {color: '#009700', highlight: '#619774'},
    {color: '#005700', highlight: '#616774'},
    {color: '#003700', highlight: '#613774'}
];

const configureChip = (recognitions, k) => {
    const recognitionsData = (recognitions || {})[k] || [];
    let chipTotal = 0;
    const chipData = recognitionsData.map((companyValueData, index) => {
        chipTotal += companyValueData.points;
        return {
            value: companyValueData.points,
            color: configColors[index].color,
            highlight: configColors[index].highlight,
            label: companyValueData.corporateValue
        };
    });
    return {
        chipData,
        chipTotal
    };
};

export const Metrics = ({metrics}) => {

    /* eslint-disable max-params, react/no-multi-comp */
    const getRecognitionsCategory = (caption, period, left) => {
        const categoryData = configureChip(metrics, period);

        return (
            <div className="h5-stats-graph" style={{left: left}}>
                <Chart chartData={categoryData.chipData}/>
                <div className="h5-stats-graph-value">{categoryData.chipTotal} <em>{caption}</em>
                </div>
            </div>
        );
    };
    /* eslint-enable max-params, react/no-multi-comp */

    return (
        <div className="container-fluid h5-mobilehidden">
            <div className="row">

                    <div className="h5-stats-content">
                        {getRecognitionsCategory('This week', 'week', '-80px')}
                        {getRecognitionsCategory('This Month', 'month', '80px')}
                        {getRecognitionsCategory('This Year', 'year', '240px')}
                        {getRecognitionsCategory('To Date', 'toDate', '400px')}

                        <div className="h5-stats-legend">
                            <span className="h5-squaredot h5-stats-color-teamwork"> </span>Teamwork
                            <span className="h5-squaredot h5-stats-color-improvement"> </span>Improvement
                            <span className="h5-squaredot h5-stats-color-delivery"> </span>Respect
                            <span className="h5-squaredot h5-stats-color-experiment"> </span>Experiment
                        </div>
                    </div>

                <div className="col-lg-4" style={{background: '#BFEFFF', marginRight: '-10px'}}>
                    { /* loggedIn ? <MyRewardActivities /> : null */ }
                </div>

            </div>
        </div>
    );
};

Metrics.propTypes = {
    loggedIn: PropTypes.bool,
    metrics: PropTypes.object
};
