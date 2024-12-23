import React, { useEffect, useState, useRef } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

import Geocode from "react-geocode";

import { InfoBox, InfoWindow } from "@react-google-maps/api";
import { useLocation } from "react-router";

// import LoadingBox from '../components/LoadingBox';
// import Axios from 'axios';
// import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import $ from "jquery";

// const defaultLocation = {
//   lat: 28.6387759,
//   lng:  77.1203312
// };

import { axios as Axios } from "../utilities/axios";
import { URL_API } from "../constants/cartConstants";
import clevertap from "clevertap-web-sdk";

export default function MapRevolt(props) {
  // const navigate = useNavigate();
  // const [googleApiKey, setGoogleApiKey] = useState('');
  // const [center, setCenter] = useState(defaultLocation);
  // const [location, setLocation] = useState(center);

  // const [selectedCity,setSelectedCity] =  useState('10');
  //const [selectedHub, setSelectedHub] = React.useState('');
  //const [markers, setMarkers] = React.useState([]);
  // const [markers_value, setMarkers_value] = React.useState(defaultLocation);

  //   const mapRef = useRef(null);
  //   const placeRef = useRef(null);
  //   const markerRef = useRef(null);
  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const statecityhubSC = localStorage.getItem("state_city_hub_SC");
  const [searchCity, setCitySearch] = useState("");
  const [activeCity, setActiveCity] = useState("");
  const getUsers = async () => {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/common/getallstatelist`,
    );
    localStorage.setItem("state_city_hub", JSON.stringify(data.data));
  };

  useEffect(() => {
    if (!statecityhub) {
      getUsers();
    }
  }, []);

  useEffect(() => {
    console.log("active city", activeCity);
  });

  const stateList_myArr = JSON.parse(statecityhub);
  const stateList_SC_myArr = JSON.parse(statecityhubSC);

  //const stateList = stateList_myArr.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;
  const SCList = stateList_SC_myArr?.hub;

  let hubCityList = stateList_myArr?.hub;

  let emptyCity = [];

  if (hubCityList) {
    hubCityList = hubCityList?.filter((c) => c.latitude != "");
    for (let index = 0; index < hubCityList.length; index++) {
      emptyCity.push(hubCityList[index].city_id);
    }
  }

  let newArrayCity = remove_duplicates_es6(emptyCity);
  let finalCityList = [];

  newArrayCity.forEach(function (item) {
    // console.log(cityList)
    let ary = cityList?.filter(
      (c) =>
        c.city_id == item &&
        c.status == 1 &&
        c.city_name.toUpperCase().includes(searchCity.toUpperCase()),
    )[0];

    if (ary) {
      finalCityList.push(cityList?.filter((c) => c.city_id == item)[0]);
    } else {
      // console.log( 'Not Found Hub City ' + item, cityList );
    }
  });

  finalCityList.sort((a, b) =>
    a.city_name.localeCompare(b.city_name, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  if (cityList) {
    cityList.sort(function (a, b) {
      if (a.city_id > b.city_id) return 1;
      if (a.city_id < b.city_id) return -1;
      return 0;
    });
  }

  // console.log(cityList);

  // console.log(finalCityList);

  // const availableHub = hubList?.filter((c) => c.city_id == selectedCity) ;
  // console.log(availableHub);
  // const selectedcityname = cityList?.filter((c) => c.city_id == selectedCity ) ;

  const mapRef = useRef(null);

  function remove_duplicates_es6(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const initialValue = [];

  const [availableHubs, setAvailableHubs] = React.useState(initialValue);
  const [availableSC, setAvailableSC] = React.useState(initialValue);

  const [cityUpdate, setCityUpdate] = React.useState([]);
  const [cityArrayList, setcityArrayList] = React.useState([]);
  const [cityArrayListDelete, setcityArrayListDelete] = React.useState([]);
  const [selectedCity, setselectedCity] = React.useState([]);

  const cor1 = 28.6455413;
  const cor2 = 77.3024774;
  const corC = 10;
  const [centerLati, setcenterLati] = React.useState(cor1);
  const [centerLong, setcenterLong] = React.useState(cor2);
  const [centerZoom, setcenterZoom] = React.useState(corC);

  let cityArray = [];
  // let finalList = [];
  let cityListUpdate = [];
  // const cityListUpdateDelete  = [...cityArrayListDelete];
  const newCityMap = [...availableHubs];
  const newCityList = [...cityUpdate];
  const newSCCityMap = [...availableHubs];
  function CityListing(e) {
    console.log(e.target.id);
    newCityMap.length = 0;
    newSCCityMap.length = 0;
    $("#dropDownList li span").removeClass("active");
    setActiveCity(e.target.getAttribute("id"));
    var CityId = e.target.getAttribute("value");
    //  e.target.classList.add('active');

    hubList?.filter((c) => {
      if (parseInt(CityId) === parseInt(c.city_id)) {
        newCityMap.push(c);
      }
      return true;
    });
    SCList?.filter((c) => {
      if (parseInt(CityId) === parseInt(c.city_id)) {
        newSCCityMap.push(c);
      }
      return true;
    });
    setAvailableSC(newSCCityMap);
    // SCList?.filter((c) => {
    //       if( parseInt(CityId) === parseInt(c.city_id) ){
    //             newCityMap.push(c);
    //       }
    //       return true;
    // });

    setAvailableHubs(newCityMap);

    // console.log(newCityMap);
    clevertap.event.push("Locate Dealer", {
      City: JSON.parse(localStorage.getItem("state_city_hub")).city.filter(
        (value, index) => value.city_id == CityId,
      )[0].city_name,
      Date: new Date(),
    });

    if (newCityMap.length) {
      // setcenterLati( parseFloat( newCityMap[0].latitude) );
      // setcenterLong( parseFloat( newCityMap[0].longitude) );
      // setcenterZoom (5);
      var bound = new window.google.maps.LatLngBounds();
      for (let i = 0; i < newCityMap.length; i++) {
        bound.extend(
          new window.google.maps.LatLng(
            newCityMap[i].latitude,
            newCityMap[i].longitude,
          ),
        );
      }

      setcenterLati(bound?.getCenter()?.lat);
      setcenterLong(bound?.getCenter()?.lng);
      mapRef.current.state.map.setCenter(bound.getCenter());
      // mapRef.current.state.map.fitBounds(bound);

      if (newCityMap.length == 1) {
        setcenterZoom(14);
      } else {
        setcenterZoom(corC);
      }

      // console.log(bound.getCenter());

      // if( newCityMap.length == 1 ){
      //       // setcenterZoom( bound.getCenter() );
      //       mapRef.current.state.map.setCenter( bound.getCenter() );
      //       console.log('Yes');
      // }
      // else{
      //       mapRef.current.state.map.setCenter( bound.getCenter() );
      //       mapRef.current.state.map.fitBounds(bound);
      // }

      // console.log(bound);
      // console.log(mapRef);
    } else {
      setcenterLati(cor1);
      setcenterLong(cor2);
      setcenterZoom(corC);
    }

    $(".cityDropText").text(e.target.innerHTML);

    openDropDown();
  }

  let listSelectedDel = [];

  function removeLocation(e) {
    e.preventDefault();
    var value = e.target.getAttribute("value");
    var element = e.target;

    element.remove();

    var childDivs = document
      .getElementById("cityListed")
      .getElementsByClassName("selectedCitys");

    listSelectedDel.length = 0;

    for (let index = 0; index < childDivs.length; index++) {
      listSelectedDel.push(childDivs[index].getAttribute("value"));
    }

    setcityArrayListDelete(listSelectedDel);

    $("#dropDownList li span[value='" + value + "']").removeClass("active");
  }

  let fs_array = [];

  useEffect(() => {
    fs_array.length = 0;
    fs_array.length = 0;

    for (let index = 0; index < cityArrayListDelete.length; index++) {
      hubList?.filter((c) => {
        if (parseInt(cityArrayListDelete[index]) === parseInt(c.city_id)) {
          fs_array.push(c);
        }
        return true;
      });
    }

    setAvailableHubs(fs_array);
    $("#dropDownList").hide("active");
  }, [cityArrayListDelete]);

  function openDropDown() {
    var e = document.getElementById("dropDownList");
    e.style.display = "block";
    $(".slectName").addClass("active");
  }

  function closeDropDown() {
    var e = document.getElementById("dropDownList");
    e.style.display = "none";
    $(".slectName").removeClass("active");
  }

  useEffect(() => {
    const fetch = async () => {
      // const { data } = await Axios('/api/auth/v1/google');
      // setGoogleApiKey(data);
      // setGoogleApiKey("AIzaSyCS9oUxujBFNIm9qTfkCFz4KjZQ0j7ouo4");
      // getUserCurrentLocation(availableHub);
    };
    fetch();
  }, []);

  //console.log(availableHub);
  //   const markers = [
  //     {
  //       id: 1,
  //       name: "G T Kernal Road",
  //       position: { lat: 28.5287759, lng: 77.1203312 }
  //     },
  //     {
  //       id: 2,
  //       name: "Preet Vihar",
  //       position: { lat: 28.5269146, lng: 77.1802732 }
  //     },
  //     {
  //       id: 3,
  //       name: "Dwarka Sec-5",
  //       position: { lat: 28.5298146, lng: 77.2892732 }
  //     },
  //     {
  //       id: 4,
  //       name: "Safdarjung Enclave",
  //       position: { lat: 28.5237577, lng: 77.225308299 }
  //     }
  //   ];
  /*
  setMarkers_value({ 
    id: e.hub_id, 
    name: e.hub_name, 
    position: {lat: e.latitude, lng: e.longitude}
  })
  */
  // availableHub.map((e, key) => {
  //  })

  //setmarkers([markers_value]);

  //   Geocode.setApiKey("AIzaSyCiWPpuF2-NcQovADeRnYwLvptBNFT_SxQ");
  Geocode.setApiKey("AIzaSyCiWPpuF2-NcQovADeRnYwLvptBNFT_SxQ");

  //   Geocode.setApiKey("AIzaSyCiWPpuF2-NcQovADeRnYwLvptBNFT_SxQ");
  Geocode.setApiKey("AIzaSyCiWPpuF2-NcQovADeRnYwLvptBNFT_SxQ");

  useEffect(() => {
    if (selectedCity) {
      $('#dropDownList span[value="' + selectedCity + '"]').click();
      $("#dropDownList").slideUp();
      $(".slectName").removeClass("active");
    }
  }, [selectedCity]);

  const geoLocation = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude,
      ).then(
        (response) => {
          const address = response.results[0].formatted_address;
          let city, state, country;
          for (
            let i = 0;
            i < response.results[0].address_components.length;
            i++
          ) {
            for (
              let j = 0;
              j < response.results[0].address_components[i].types.length;
              j++
            ) {
              switch (response.results[0].address_components[i].types[j]) {
                case "locality":
                  city = response.results[0].address_components[i].long_name;
                  break;
                case "administrative_area_level_1":
                  state = response.results[0].address_components[i].long_name;
                  break;
                case "country":
                  country = response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }

          const cityName = cityList?.filter((c) => c.city_name == city);

          console.log(cityName);

          if (cityName) {
            setselectedCity(cityName[0]?.city_id);
          }

          console.log("Geo City", cityName[0]?.city_name);
        },
        (error) => {
          console.error(error);
        },
      );
    });
  };

  const handleCitySearch = (e) => {
    setCitySearch(e.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    $("#geo-location").click();
  }, [location.key]);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const divStyle = {
    padding: 0,
    fontFamily: "Montserrat",
    fontWeight: "600",
    maxWidth: "230px",
  };

  const divMargin = {
    padding: "5px 0",
  };

  const divMargin1 = {
    padding: "5px 0",
    fontSize: "15px",
    fontWeight: "700",
  };

  const linkStyle = {
    color: "#363638",
  };

  const onUnmount = React.useCallback(function callback(map) {
    // console.log(map);
  }, []);

  useEffect(() => {
    closeDropDown();
    setCitySearch(activeCity);
  }, [activeCity]);

  const checkStatus = async (e) => {
    setTimeout(() => {
      closeDropDown();
    }, 500);
  };

  return (
    <>
      {/* <div id="geo-location" onClick={geoLocation}></div> */}
      <section
        id="revolt-hub"
        className="page-section padding-top-60 padding-bottom-100"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="theme-content">
                <h3>
                  EXPERIENCE THE MOTORCYCLE <br />
                  AT REVOLT HUB NEAR YOU
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-3"
              onFocus={openDropDown}
              onBlur={checkStatus}
            >
              <div className="selectCityDropdown">
                <div className="slectName">
                  <input
                    style={{ border: "none" }}
                    type="text"
                    placeholder="Search City"
                    className="cityDropText"
                    onChange={handleCitySearch}
                    value={searchCity}
                  />{" "}
                  <span>
                    <i className="fa fa-angle-down"></i>
                  </span>
                </div>
                <div className="dropDownList" id="dropDownList">
                  <ul
                    style={{
                      overflowY: "auto",
                      border: "1px solid black",
                      maxHeight: "200px",
                      borderRadius: "5px",
                      borderTop: "0px",
                    }}
                  >
                    {finalCityList?.map((e, key) => (
                      <li key={key}>
                        <span
                          onClick={CityListing}
                          id={e.city_name}
                          className={`${e.city_name === activeCity ? "active" : ""}`}
                          value={e.city_id}
                          key={key}
                        >
                          {e.city_name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="selectedCity" id="cityListed">
                {cityUpdate?.map((e, key) => {
                  return (
                    <div
                      key={key}
                      onClick={removeLocation}
                      value={e.city_id}
                      className="selectedCitys"
                    >
                      {e.city_name}{" "}
                      <span>
                        <i className="fa fa-times"></i>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-9">
              <div className="googleMap">
                <LoadScript googleMapsApiKey="AIzaSyCiWPpuF2-NcQovADeRnYwLvptBNFT_SxQ">
                  <GoogleMap
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    center={{ lat: centerLati, lng: centerLong }}
                    zoom={centerZoom}
                    id="kml-layer-example"
                    onLoad={onUnmount}
                    ref={mapRef}
                  >
                    <>
                      {availableHubs?.map((e, key) => {
                        return (
                          <Marker
                            key={e.hub_id}
                            position={{
                              lat: parseFloat(e.latitude),
                              lng: parseFloat(e.longitude),
                            }}
                            name={e.hub_name}
                            icon={"/images/map-pin.png"}
                            onClick={() => handleActiveMarker(e.hub_id)}
                          >
                            {activeMarker === e.hub_id ? (
                              <InfoWindow
                                onCloseClick={() => setActiveMarker(null)}
                              >
                                <div style={divStyle}>
                                  <div style={divMargin1}>{e.hub_name}</div>
                                  <div style={divMargin}>
                                    {e.dealer_address}
                                  </div>
                                  <div style={divMargin}>{e.dealer_number}</div>
                                  {e.dealer_link ? (
                                    <>
                                      <div style={divMargin}>
                                        <a
                                          style={linkStyle}
                                          target="_blank"
                                          href={e.dealer_link}
                                        >
                                          View
                                        </a>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </InfoWindow>
                            ) : null}
                          </Marker>
                        );
                      })}
                    </>
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              {(() => {
                if (availableHubs.length) {
                  return <div className="mt-5"></div>;
                }
              })()}
              <div className="delhilocations alignfooteraddress mt-0 mb-0">
                {availableHubs?.map((e, key) => {
                  return (
                    e.hub_name != "REVOLT CENTRAL HUB" && (
                      <div
                        key={key}
                        data-city={e.city_id}
                        className="locationwise"
                      >
                        <h2>
                          {/* <i className="fa fa-shopping-cart" aria-hidden="true" /> */}
                          <b>Showroom</b> <br />
                          {e.hub_name}
                        </h2>
                        <div className="media">
                          <i className="fa fa-map-marker" aria-hidden="true" />
                          <div className="media-body">
                            <h5 className="mt-0">
                              {e.dealer_link ? (
                                <>
                                  <a target="_blank" href={e.dealer_link}>
                                    {e.dealer_address}
                                  </a>
                                </>
                              ) : (
                                <>{e.dealer_address}</>
                              )}
                            </h5>
                          </div>
                        </div>
                        <div className="media">
                          <i className="fa fa-phone" aria-hidden="true" />
                          <div className="media-body">
                            <h5 className="mt-0">
                              <a
                                className="ls-color"
                                href={"tel:" + e.dealer_number}
                              >
                                {e.dealer_number}
                              </a>
                            </h5>
                          </div>
                        </div>
                        {e.office_time ? (
                          <>
                            <div className="media">
                              <i className="fa fa-clock-o" aria-hidden="true" />
                              <div className="media-body">
                                <h5 className="mt-0">{e.office_time}</h5>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    )
                  );
                })}
                {/*  */}
                {availableSC?.map((e, key) => {
                  return (
                    e.hub_name != "REVOLT CENTRAL HUB" && (
                      <div
                        key={key}
                        data-city={e.city_id}
                        className="locationwise"
                      >
                        <h2>
                          {/* <i className="fa fa-wrench" aria-hidden="true" />  */}
                          <b>Workshop</b> <br />
                          {e.hub_name}
                        </h2>
                        <div className="media">
                          <i className="f-map-marker" aria-hidden="true" />
                          <div className="media-body">
                            <h5 className="mt-0">
                              {e.dealer_link ? (
                                <>
                                  <a target="_blank" href={e.dealer_link}>
                                    {e.dealer_address}
                                  </a>
                                </>
                              ) : (
                                <>{e.dealer_address}</>
                              )}
                            </h5>
                          </div>
                        </div>
                        <div className="media">
                          <i className="fa fa-phone" aria-hidden="true" />
                          <div className="media-body">
                            <h5 className="mt-0">
                              <a
                                className="ls-color"
                                href={"tel:" + e.dealer_number}
                              >
                                {e.dealer_number}
                              </a>
                            </h5>
                          </div>
                        </div>
                        {e.office_time ? (
                          <>
                            <div className="media">
                              <i className="fa fa-clock-o" aria-hidden="true" />
                              <div className="media-body">
                                <h5 className="mt-0">{e.office_time}</h5>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
