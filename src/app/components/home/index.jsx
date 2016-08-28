import React from 'react';

/* istanbul ignore next */
if (__WEBPACK__) {
  //require('!style!css!sass!./style.scss');
}

export const Home = () => {
    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">

          <h2>Submit a Recognition</h2>

          <div className="form-group">
            <label for="staffName">Employee Name *</label>
            <select id="staffName" name="staffName" className="form-control">
              <option value="">Select employee name</option>
            </select>
          </div>

          <div className="form-group">
            <label for="occurrence">Occurence *</label>
            <textarea className="form-control" placeholder="Describe the reason that prompts for this recognition"
                      id="occurrence"
                      name="occurrence">
            </textarea>
          </div>

          <fieldset className="form-group">
            <label>Demonstrated Corporate Value *</label>
            <div className="radio">
              <label>
                <input type="radio" name="corpvalue" id="corpvalueExcellence" value="Excellence"/>
                  Excellence
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" name="corpvalue" id="corpvalueAccountability" value="Accountability"/>
                  Accountability
              </label>
            </div>
            <div className="radio disabled">
              <label>
                <input type="radio" name="corpvalue" id="corpvalueInitiative" value="Initiative"/>
                  Initiative
              </label>
            </div>
            <div className="radio disabled">
              <label>
                <input type="radio" name="corpvalue" id="corpvalueTeamwork" value="Teamwork"/>
                  Teamwork
              </label>
            </div>
            <div className="radio disabled">
              <label>
                <input type="radio" name="corpvalue" id="corpvalueEmpowerment" value="Empowerment"/>
                  Empowerment
              </label>
            </div>
          </fieldset>

          <div className="form-group">
            <label for="rewardPoints">Reward Points *</label>
            <select id="rewardPoints" name="rewardPoints" className="form-control">
              <option value="">Select reward points</option>
              <option value="50">50</option>
              <option value="40">40</option>
              <option value="30">30</option>
              <option value="20">20</option>
              <option value="10">10</option>
            </select>
          </div>

          <input type="submit" className="btn btn-primary" value="High Five!"/>
          <input type="reset" className="btn btn-danger" value="Maybe Not"/>

        </div>

        <div className="col-lg-6 h5-mobilehidden">

          <h2>Recent Recognitions</h2>
          <div className="h5-recognition-card h5-empowerment">
            <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                 alt="Julie Doe"/>
              <a href="#" className="h5-recognized-person">Julie Doe</a> was recognized for
              <span className="h5-recognized-value">Empowerment</span> by
            <a href="#" className="h5-recognized-by">Jack Johnson</a>
              <span className="h5-recognized-date">8/16/2016</span>
              <span className="h5-recognized-pts">20 pts / 300 pts total</span>
              <div className="clearfix"></div>
          </div>

          <div className="h5-recognition-card h5-empowerment">
            <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                 alt="Julie Doe"/>
              <a href="#" className="h5-recognized-person">Julie Doe</a> was recognized for
              <span className="h5-recognized-value">Empowerment</span> by
            <a href="#" className="h5-recognized-by">Jack Johnson</a>
              <span className="h5-recognized-date">8/16/2016</span>
              <span className="h5-recognized-pts">20 pts / 300 pts total</span>
              <div className="clearfix"></div>
          </div>

          <div className="h5-recognition-card h5-empowerment">
            <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                 alt="Julie Doe"/>
              <a href="#" className="h5-recognized-person">Julie Doe</a> was recognized for
              <span className="h5-recognized-value">Empowerment</span> by
            <a href="#" className="h5-recognized-by">Jack Johnson</a>
              <span className="h5-recognized-date">8/16/2016</span>
              <span className="h5-recognized-pts">20 pts / 300 pts total</span>
              <div className="clearfix"></div>
          </div>

          <div className="h5-recognition-card h5-empowerment">
            <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                 alt="Julie Doe"/>
              <a href="#" className="h5-recognized-person">Julie Doe</a> was recognized for
              <span className="h5-recognized-value">Empowerment</span> by
            <a href="#" className="h5-recognized-by">Jack Johnson</a>
              <span className="h5-recognized-date">8/16/2016</span>
              <span className="h5-recognized-pts">20 pts / 300 pts total</span>
              <div className="clearfix"></div>
          </div>

          <div className="h5-recognition-card h5-empowerment">
            <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                 alt="Julie Doe"/>
              <a href="#" className="h5-recognized-person">Julie Doe</a> was recognized for
              <span className="h5-recognized-value">Empowerment</span> by
            <a href="#" className="h5-recognized-by">Jack Johnson</a>
              <span className="h5-recognized-date">8/16/2016</span>
              <span className="h5-recognized-pts">20 pts / 300 pts total</span>
              <div className="clearfix"></div>
          </div>

          <div className="h5-recognition-card h5-empowerment">
            <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                 alt="Julie Doe"/>
              <a href="#" className="h5-recognized-person">Julie Doe</a> was recognized for
              <span className="h5-recognized-value">Empowerment</span> by
            <a href="#" className="h5-recognized-by">Jack Johnson</a>
              <span className="h5-recognized-date">8/16/2016</span>
              <span className="h5-recognized-pts">20 pts / 300 pts total</span>
              <div className="clearfix"></div>
          </div>

          <div className="h5-recognition-card h5-empowerment">
            <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                 alt="Julie Doe"/>
              <a href="#" className="h5-recognized-person">Julie Doe</a> was recognized for
              <span className="h5-recognized-value">Empowerment</span> by
            <a href="#" className="h5-recognized-by">Jack Johnson</a>
              <span className="h5-recognized-date">8/16/2016</span>
              <span className="h5-recognized-pts">20 pts / 300 pts total</span>
              <div className="clearfix"></div>
          </div>

          <div className="clearfix"></div>
        </div>

        <div className="col-lg-3">

          <h2>For Managers</h2>

          <ul className="list-unstyled list-group h5-quicklinks">
            <li className="list-group-item"><a href="#">
              <span className="glyphicon glyphicon-ok"></span> Approve Recognitions</a>
            </li>
            <li className="list-group-item"><a href="#">
              <span className="glyphicon glyphicon-list"></span> My Organization</a>
            </li>
            <li className="list-group-item"><a href="#">
              <span className="glyphicon glyphicon-user"></span> Manage Users</a>
            </li>
            <li className="list-group-item"><a href="#">
              <span className="glyphicon glyphicon-stats"></span> Program Reports</a>
            </li>
          </ul>

          <h2>For Administrators</h2>

          <ul className="list-unstyled list-group h5-quicklinks">
            <li className="list-group-item"><a href="#">
              <span className="glyphicon glyphicon-cog"></span> Manage Corporate Values</a>
            </li>
            <li className="list-group-item"><a href="#">
              <span className="glyphicon glyphicon-user"></span> Manage Users</a>
            </li>
            <li className="list-group-item">
              <a href="#"><span className="glyphicon glyphicon-shopping-cart"></span> Manage Reward Store</a>
            </li>
            <li className="list-group-item">
              <a href="#"><span className="glyphicon glyphicon-ok"></span> Approve Recognitions</a>
            </li>
            <li className="list-group-item"><a href="#">
              <span className="glyphicon glyphicon-list"></span> My Organization</a>
            </li>
            <li className="list-group-item"><a href="#">
              <span className="glyphicon glyphicon-stats"></span> Program Reports</a>
            </li>
          </ul>

        </div>

      </div>
    </div>
  );
};