import React, {PropTypes} from 'react';

import {DoughnutChart as Chart} from './components/chart';
import {MyRewardActivities} from './components/my-reward-activities';

/* istanbul ignore next */
if (__WEBPACK__) {
    //require('!style!css!sass!./style.scss');
}

const configColors = [
  { color: '#FF9900', highlight: '#FF5A5E' },
  { color: '#CC3300', highlight: '#5AD3D1' },
  { color: '#990000', highlight: '#FFC870' },
  { color: '#0033CC', highlight: '#A8B3C5' },
  { color: '#4D5360', highlight: '#616774' }
];

const configureChip = (recognitions, k) => {
  const recognitionsData = recognitions[k] || [];
  let chipTotal = 0;
  const chipData = recognitionsData.map((companyValueData, index) => {
    chipTotal += companyValueData.count;
    return {
      value: companyValueData.count,
      color: configColors[index].color,
      highlight:  configColors[index].highlight,
      label: companyValueData.companyValue
    }
  });
  return {
    chipData,
    chipTotal
  }
};

export const Recognitions = ({loggedIn, recognitions}) => {
    const getRecognitionsCategory = (caption, period, left) => {
      const categoryData = configureChip(recognitions, period)
      return (
        <div className="h5-stats-graph" style={{left: left}}>
          <Chart chartData={categoryData.chipData}/>
          <div className="h5-stats-graph-value">{categoryData.chipTotal} <em>{caption}</em>
          </div>
        </div>
      )
    }

    return (
        <div className="container-fluid h5-stats">
            <div className="row">
                <div className="col-lg-3">
                    <div className="h5-stats-title">
                        Latest Recognitions
                    </div>
                    <div className="h5-stats-content">

                        <div className="h5-recognition-card h5-empowerment">
                            <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                                 alt="Julie Doe"/>
                            <a href="#" className="h5-recognized-person">Julie Doe</a> was
                            recognized for
                            <span className="h5-recognized-value">Empowerment</span> by <a
                            href="#" className="h5-recognized-by">Jack Johnson</a>
                            <span className="h5-recognized-date">8/16/2016</span>
                            <span className="h5-recognized-pts">20 pts / 300 pts total</span>
                            <div className="clearfix"></div>
                        </div>

                    </div>
                </div>

                <div className="col-lg-6 h5-stats-display" style={{
                    borderLeft: 'solid 1px #DBDEE1',
                    borderRight: 'solid 1px #DBDEE1'
                }}>
                    <div className="h5-stats-title">
                        Corporate Recognition Trends
                    </div>
                    <div className="h5-stats-content">
                      {getRecognitionsCategory('This week', 'week', '-80px')}
                      {getRecognitionsCategory('This Month', 'month', '80px')}
                      {getRecognitionsCategory('This Year', 'year', '240px')}
                      {getRecognitionsCategory('To Date', 'toDate', '400px')}

                        <div className="h5-stats-legend">
                            <span className="h5-squaredot h5-stats-color-excellence"> </span>Excellence
                            <span className="h5-squaredot h5-stats-color-accountability"> </span>Integrity
                            <span className="h5-squaredot h5-stats-color-initiative"> </span>Respect
                            <span className="h5-squaredot h5-stats-color-teamwork"> </span>Teamwork
                            <span className="h5-squaredot h5-stats-color-empowerment"> </span>Vigilance
                        </div>
                    </div>
                </div>

                <div className="col-lg-3">
                    { loggedIn ? <MyRewardActivities /> : null }
                </div>

            </div>
        </div>
    );
};

Recognitions.propTypes = {
    loggedIn: PropTypes.bool,
    recognitions: PropTypes.object
};
