import React from 'react';
import {Doughnut} from 'react-chartjs';

export const DoughnutChart = ({chartData}) => {
    const chartOptions = {
        percentageInnerCutout: 85,
        borderWidth: 0
    };

    if (!chartData) {
        return null;
    }

    return (
        <Doughnut data={chartData} options={chartOptions} height="120" width="300"/>
    );
};
