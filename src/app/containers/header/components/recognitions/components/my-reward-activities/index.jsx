import React from 'react';

export const MyRewardActivities = () => {

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
                      <input className="btn btn-primary"
                             readOnly
                             value="Submit Recognition"/>
                      <input className="btn btn-success"
                             readOnly
                             value="Spend"
                             style={{width: '80px', marginLeft: '10px'}}/>
                  </div>
              </div>
          </span>
    );
};
