import React, { Component } from 'react';
import logo from './logo.svg';
import StateData from './StateData';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './App.css';
import { Button } from '@material-ui/core';

class App extends Component {
  state = {
    loaded : false,
    States: [],
    statesData: [],
    statecode: undefined,
    stateName: undefined,
    confirmed: undefined,
    active: undefined,
    recovered: undefined,
    deaths: undefined,
    lastupdatedtime: undefined,
    deltaconfirmed: undefined,
    deltarecovered: undefined,
    deltadeaths: undefined
  }

  componentDidMount() {    
    window.addEventListener("load", this.getStatesList);  
    window.addEventListener("load", this.showStatesData);
  }

  setStatesData = (stateCode, stateName) => {
    if(stateCode && stateName) {      
      this.setState({
        statecode: stateCode,
        stateName: stateName
      });
      try{
        let stateData = this.state.statesData.filter((st) => { 
          return (st.statecode === stateCode.toUpperCase());
        });
        this.setState({
          confirmed: stateData[0].confirmed,
          active: stateData[0].active,
          recovered: stateData[0].recovered,
          deaths: stateData[0].deaths,
          lastupdatedtime: stateData[0].lastupdatedtime,
          deltaconfirmed: stateData[0].deltaconfirmed,
          deltarecovered: stateData[0].deltarecovered,
          deltadeaths: stateData[0].deltadeaths
        });        
      } catch (ex) {
        console.log(ex.message);
      }
    }
    else{
      this.setState({
        statecode: undefined,
        stateName: undefined,
        confirmed: undefined,
        active: undefined,
        recovered: undefined,
        deaths: undefined,
        lastupdatedtime: undefined,
        deltaconfirmed: undefined,
        deltarecovered: undefined,
        deltadeaths: undefined
      });
    }
  }

  getStatesList = async e => {
    e.preventDefault();
    try{
      const apiCall = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.covid19india.org/data.json`
      );
      const {statewise} = await apiCall.json();      
      this.setState({
        statesData: statewise
      });       
      this.setState({
        States : statewise.map((st) => {
          return ({"code":st.statecode, "name":st.state});
        }),
        loaded: true
      });
    } catch (ex) {
      console.log(ex.message);
    }
  };

  showStatesData = async e => {      
    let stateCode = undefined;
    //if(e.detail === 0) {
      stateCode = e.target.value;
    //}

    e.preventDefault();

    let stateName;
    let tempStateData = stateCode !== undefined && this.state.States.filter((st) => {
      return (st.code === stateCode);
    });
    if (tempStateData.length > 0) {
      stateName = tempStateData[0].name;
    }
    
    if(stateCode && stateName)
      this.setStatesData(stateCode, stateName); 
    else
      this.setStatesData(null, null);
  };  

  showTotal = async e => {
    this.setStatesData("TT", "Total");
  }

  render() {
    // states list sorted in alphabetical order
    let stateList = this.state.States.length > 0 
    && this.state.States.map((state) => {
      return (
        <MenuItem value={state.code !== undefined ? state.code : ''}>
          {state.name}
        </MenuItem>   
      )  
    })
    .sort((st1, st2) => {
      return ((st1.props.children.toUpperCase() < st2.props.children.toUpperCase()) ? -1 : 1);
    });
    /* const emptyMenuItem = () => {
      return (<MenuItem value=""><em>None</em></MenuItem>);
    }
    stateList.unshift(emptyMenuItem); */

    let stateDataCard = (this.state.confirmed !== undefined) ? 
      (
        <StateData 
          state = {this.state.stateName}
          confirmed = {this.state.confirmed}
          active = {this.state.active}
          recovered = {this.state.recovered}
          deaths = {this.state.deaths}
          lastupdatedtime = {this.state.lastupdatedtime}
          deltaconfirmed = {this.state.deltaconfirmed}
          deltarecovered = {this.state.deltarecovered}
          deltadeaths = {this.state.deltadeaths}
        />
      ) : undefined;    

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>COVID-19 India Tracker</h3> 
          {
            !this.state.loaded && <h4>Fetching data from api...</h4>
          }
          {
            this.state.loaded && 
            <div>
                <FormControl variant="outlined" className="formControl">
                <InputLabel id="selectStateLabel">Select state</InputLabel>
                <Select
                  labelId="selectStateLabel"
                  id="selectStateElement"
                  value={this.state.statecode !== undefined ? this.state.statecode : ''} 
                  onChange={this.showStatesData} 
                  children={stateList} 
                  label="Select state" />
              </FormControl>
              <br/>
              <Button variant="contained" color="primary" onClick={this.showTotal}>
                Show Pan-India Cases
              </Button>
            </div>          
          }
        </header>
        {stateDataCard}  
          
        <div className="footer">
          <p><span role="img" aria-labelledby="jsx-a11y/accessible-emoji">👨‍💻</span> by <a href="https://www.devkrishna.in">Shimanta</a></p>
          <p>Source: <a href="https://api.covid19india.org/">COVID19-India API</a></p>
        </div>
      </div>
    );
  }
}

export default App;
