import * as React from "react";

const data = {
  countries: [
    {
      name: "Assam",
      Key: 18,
      states: [
        { name: "Guwahati", cities: [{ name: "Guwahati", discount: 20000 }] },
      ],
    },

    {
      name: "Delhi",
      Key: 1,
      states: [
        {
          name: "Delhi",
          key: 10,
          cities: [{ name: "Delhi", discount: "16200" }],
        },
      ],
    },

    {
      name: "Gujarat",
      Key: 4,
      states: [
        { name: "Ahmedabad", cities: [{ name: "Ahmedabad", discount: 20000 }] },
        { name: "Surat", cities: [{ name: "Surat", discount: 20000 }] },
        { name: "Vapi", cities: [{ name: "Vapi", discount: 20000 }] },
        { name: "Vadodara", cities: [{ name: "Vapi", discount: 20000 }] },
        { name: "Rajkot", cities: [{ name: "Vapi", discount: 20000 }] },
      ],
    },

    {
      name: "Maharashtra",
      Key: 5,
      states: [
        { name: "Mumbai", cities: [{ name: "Mumbai", discount: 16000 }] },
        { name: "Nagpur", cities: [{ name: "Nagpur", discount: 16000 }] },
        { name: "Nagpur", cities: [{ name: "Navi Mumbai", discount: 16000 }] },
      ],
    },
    {
      name: "Rajasthan",
      Key: 7,
      states: [
        { name: "Jaipur", cities: [{ name: "Jaipur", discount: 7000 }] },
        { name: "Jodhpur", cities: [{ name: "Udaipur", discount: 7000 }] },
        { name: "Udaipur", cities: [{ name: "Udaipur", discount: 7000 }] },
      ],
    },
    {
      name: "Tamilnadu",
      Key: 2,
      states: [
        {
          name: "Chennai",
          key: 53,
          cities: [{ name: "Chennai", discount: 7500 }],
        },
        {
          name: "Coimbatore",
          key: 55,
          cities: [{ name: "Coimbatore", discount: 7300 }],
        },
        {
          name: "Madurai",
          key: 55,
          cities: [{ name: "Madurai", discount: 7400 }],
        },
      ],
    },
  ],
};

export default function Casecading() {
  const [selectedCountry, setSelectedCountry] = React.useState();
  const [selectedState, setSelectedState] = React.useState();
  const [selectedCity, setSelectedCity] = React.useState();

  const availableState = data.countries.find((c) => c.name === selectedCountry);
  const availableCities = availableState?.states?.find(
    (s) => s.name === selectedState,
  );

  return (
    <div>
      <div className="form-group dropdn">
        <label>State</label>
        <select
          id="state"
          placeholder="Select State"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option>--Choose State--</option>
          {data.countries.map((value, key) => {
            return (
              <option value={value.key} key={key}>
                {value.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group dropdn">
        <label>City</label>
        <select
          id="city"
          placeholder="City"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option>--Choose City--</option>
          {availableState?.states.map((e, key) => {
            return (
              <option value={e.name} key={key}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group dropdn">
        <label>Revolt Hub</label>
        <select
          id="area"
          placeholder="Hub City"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option>--Revolt Hub City--</option>
          {availableCities?.cities.map((e, key) => {
            return (
              <option value={e.discount} key={key}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
