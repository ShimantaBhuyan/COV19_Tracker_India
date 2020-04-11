import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import './StateData.css';

const StateData = ({
    state,
    confirmed,
    active,
    recovered,
    deaths,
    lastupdatedtime,
    deltaconfirmed,
    deltarecovered,
    deltadeaths
    }) => {  
    return (
      <Card className="root">        
        <CardContent>
          <p color="primary" className="title">
            {state}
          </p>
          <Divider variant="middle"/>
          <p>
            Confirmed: <span className="confirmed">
                {confirmed} <sup className="deltaconfirmed">[+{deltaconfirmed}]</sup>
            </span>
          </p>
          <p>
            Active: <span className="active">
                {active}
            </span>
          </p>
          <p>
            Recovered: <span className="recovered">
                {recovered} <sup className="deltarecovered">[+{deltarecovered}]</sup>
            </span>
          </p>
          <p>
            Deaths: <span className="deaths">
                {deaths} <sup className="deltadeaths">[+{deltadeaths}]</sup>
            </span>
          </p>
          <p>
            Last updated at: <span variant="body2" component="p" className="lastUpdated">
                {lastupdatedtime}
            </span>
          </p>
        </CardContent>
      </Card>
    ); 

    /* return (
        <div className="state__data">
            {state && (
                <div className="state_data">
                    <p className="state__">
                        State: 
                    </p>
                    <p className="state__value">
                        {state}
                    </p>
                </div>
            )}

            {confirmed && (
                <div className="state_data">
                    <p className=" state__ state__confirmed">
                        Confirmed Cases: 
                    </p>
                    <p className="state__value state__confirmed__value">
                        {confirmed} [+{deltaconfirmed}]
                    </p>
                </div>
            )}

            {active && (
                <div className="state_data">
                    <p className="state__ state__active">
                        Active Cases: 
                    </p>
                    <p className="state__value state__active__value">
                        {active}
                    </p>
                </div>
            )}
            
            {recovered && (
                <div className="state_data">
                    <p className="state__ state__recovered">
                        Recovered: 
                    </p>
                    <p className="state__value state__recovered__value">
                        {recovered} [+{deltarecovered}]
                    </p>
                </div>
            )}
            
            {deaths && (
                <div className="state_data">
                    <p className="state__ state__deaths">
                        Deaths: 
                    </p>
                    <p className="state__value state__deaths__value">
                        {deaths} [+{deltadeaths}]
                    </p>
                </div>
            )}

            {lastupdatedtime && (
                <div className="state_data">
                    <p className="state__ state__lastupdatedtime">
                        Last updated at: <Fragment>{lastupdatedtime}</Fragment>
                    </p>
                </div>
            )}
        </div>
    );  */
};

export default StateData;