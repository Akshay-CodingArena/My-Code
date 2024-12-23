import React, { Component } from "react";
import axios from "axios";
//import ReactHTMLTableToExcel from 'react-html-table-to-excel';
//import './App.css';

export class CascadingDropdown extends Component {
  constructor() {
    this.state = {
      StateId: "",
      StateData: [],
      CityData: [],
    };
  }

  ChangeteState = (e) => {
    this.setState({
      CountryId: e.target.value,
    });

    axios.get("/api/v1/common/getstatelist").then((response) => {
      console.log(response.data);
      this.setState({
        StateData: response.data,
      });
    });
  };

  ChangeCity = (e) => {
    this.setState({
      StateId: e.target.value,
    });

    axios
      .get("/api/v1/common/getcitylist?StateId=" + e.target.value)
      .then((response) => {
        console.log(response.data);
        this.setState({
          CityData: response.data,
        });
      });
  };

  render() {
    //  console.log(state.StateData);
    return (
      <div>
        <div className="form-group dropdn">
          <select
            className="form-control slct"
            name="state"
            value={this.state.StateId}
            onChange={this.ChangeCity}
          >
            <label htmlFor="company">State Name</label>
            {this.state.StateData.map((e, key) => {
              return (
                <option key={key} value={e.StateId}>
                  {e.StateName}
                </option>
              );
            })}
          </select>
          <select
            className="form-control slct"
            name="city"
            value={this.state.CityData}
          >
            {this.state.CityData.map((e, key) => {
              return (
                <option key={key} value={e.CityId}>
                  {e.cityName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
export default CascadingDropdown;
