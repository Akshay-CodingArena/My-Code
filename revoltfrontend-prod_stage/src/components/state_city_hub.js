import React, { Component } from "react";
import axios from "axios";

import { URL_API, ROOT_PATH } from "../constants/cartConstants";

export class CascadingDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CityId: "",
      StateId: "",
      StateData: [],
      CityData: [],
      HubData: [],
    };
  }
  componentDidMount() {
    axios.get(`${URL_API}/api/v1/common/getstatelist`).then((response) => {
      console.log(response.data.data);
      this.setState({
        StateData: response.data.data,
      });
    });
  }
  ChangeteState = (e) => {
    this.setState({
      StateId: e.target.value,
    });
    axios
      .get(`${URL_API}/api/v1/common/getcitylist?stateid=${e.target.value}`)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          CityData: response.data.data,
        });
      });
  };
  ChangeCity = (e) => {
    this.setState({
      CityId: e.target.value,
    });
    axios
      .get(`${URL_API}/api/v1/common/getcityhub?cityid=${e.target.value}`)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          HubData: response.data.data,
        });
      });
  };
  render() {
    return (
      <div>
        <select
          name="state"
          value={this.state.state_id}
          onChange={this.ChangeteState}
        >
          <option>Select State</option>
          {this.state.StateData.map((e, key) => {
            return (
              <option key={key} value={e.state_id}>
                {e.state_name}
              </option>
            );
          })}
        </select>
        <select
          name="city"
          value={this.state.city_id}
          onChange={this.ChangeCity}
        >
          <label for="company">City Name</label>
          <option>Select City</option>
          {this.state.CityData.map((e, key) => {
            return (
              <option key={key} value={e.city_id}>
                {e.city_name}
              </option>
            );
          })}
        </select>
        <select name="cityhub" value={this.state.hub_id}>
          <option>Select City Hub</option>
          {this.state.HubData.map((e, key) => {
            return (
              <option key={key} value={e.hub_id}>
                {e.hub_name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
export default CascadingDropdown;
