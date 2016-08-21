import React from 'react';
import {connect} from 'react-redux';
import {Doughnut} from 'react-chartjs';

const DoughnutChart = ({chartData}) => {
    const chartOptions = {
        percentageInnerCutout: 85,
        borderWidth: 0,
        responsive: true
    };
    return (
        <Doughnut data={chartData} options={chartOptions} height="150"/>
    );
};
export default connect(() => ({}), undefined, undefined, {pure: false})(DoughnutChart);
