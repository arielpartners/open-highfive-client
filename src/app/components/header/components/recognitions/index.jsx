import React, {PropTypes} from 'react';

import Chart from './components/chart';

/* istanbul ignore next */
if (__WEBPACK__) {
    //require('!style!css!sass!./style.scss');
}

export const Recognitions = ({loggedIn}) => {

    let chartData = [
        {
            value: 1440,
            color: '#FF9900',
            highlight: '#FF5A5E',
            label: 'Excellence'
        },
        {
            value: 650,
            color: '#CC3300',
            highlight: '#5AD3D1',
            label: 'Accountability'
        },
        {
            value: 400,
            color: '#990000',
            highlight: '#FFC870',
            label: 'Initiative'
        },
        {
            value: 1387,
            color: '#0033CC',
            highlight: '#A8B3C5',
            label: 'Teamwork'
        },
        {
            value: 888,
            color: '#4D5360',
            highlight: '#616774',
            label: 'Empowerment'
        }
    ];

    const getMyRewardActivities = () => {
        return (
          <span>
              <div className="h5-stats-title">
                  My Reward Activities
              </div>
              <div className="h5-stats-content">
                  <div className="h5-mystats">20 <em>Given</em></div>
                  <div className="h5-mystats">80 <em>Remaining</em></div>
                  <div className="h5-mystats earned">150 <em>Earned</em></div>
                  <div className="clearfix"></div>
                  <div style={{marginTop: '20px'}}>
                      <input className="btn btn-primary" value="Submit Recognition"/>
                      <input className="btn btn-success" value="Spend" style={{width: '80px', marginLeft: '10px'}}/>
                  </div>
              </div>
          </span>
        );
    };

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
                        <div className="h5-stats-graph" style={{left: '-80px'}}>
                            <Chart chartData={chartData}/>
                            <div className="h5-stats-graph-value">4096 <em>To Date</em>
                            </div>
                        </div>
                        <div className="h5-stats-graph" style={{left: '80px'}}>
                            <div className="h5-stats-graph-value">693 <em>This Year</em>
                            </div>
                            <Chart chartData={chartData}/>
                        </div>
                        <div className="h5-stats-graph" style={{left: '240px'}}>
                            <div className="h5-stats-graph-value">158 <em>This Month</em>
                            </div>
                            <Chart chartData={chartData}/>
                        </div>
                        <div className="h5-stats-graph" style={{left: '400px'}}>
                            <div className="h5-stats-graph-value">75 <em>This Week</em>
                            </div>
                            <Chart chartData={chartData}/>
                        </div>

                        <div className="h5-stats-legend">
    <span
        className="h5-squaredot h5-stats-color-excellence"></span>
                            Excellence
                            <span
                                className="h5-squaredot h5-stats-color-accountability"></span>Accountability
                            <span
                                className="h5-squaredot h5-stats-color-initiative"></span>Initiative
                            <span className="h5-squaredot h5-stats-color-teamwork"></span>Teamwork
                            <span
                                className="h5-squaredot h5-stats-color-empowerment"></span>Empowerment
                        </div>
                    </div>
                </div>

                <div className="col-lg-3">
                    { loggedIn ? getMyRewardActivities() : null }
                </div>

            </div>
        </div>
    );
};

Recognitions.propTypes = {
    loggedIn: PropTypes.object
};
