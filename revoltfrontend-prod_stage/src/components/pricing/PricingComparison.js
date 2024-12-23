import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProductAll } from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { bikeData } from "./bikeData";

const PricingComparison = ({
  selectedBikeSecond,
  setSelectedBikeSecond,
  selectedBikeFirst,
  setSelectedBikeFirst,
}) => {
  const navigate = useNavigate();
  const [colorOptionsSecond, setcolorOptionsSecond] = useState([]);
  const [colorOptionsFirst, setcolorOptionsFirst] = useState([]);
  const [selectedColorSecond, setselectedColorSecond] = useState({});
  const [selectedColorFirst, setselectedColorFirst] = useState({});
  const [SelectedDataFirst, setSelectedDataFirst] = useState({});
  const [SelectedDataSecond, setSelectedDataSecond] = useState({});

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.allProducts);
  const { loading, product } = productDetails;

  const bikeOptions = ["RV1+", "RV400BRZ", "RV400", "RV1"];

  const handleBikeSelectionFirst = (event) => {
    const selectedBike = event.target.value;
    setSelectedBikeFirst(selectedBike);
    const selectedBikeData = bikeData[selectedBike];
    setSelectedDataFirst(selectedBikeData);
  };

  const handleBikeSelectionSecond = (event) => {
    const selectedBike = event.target.value;
    setSelectedBikeSecond(selectedBike);
    const selectedBikeData = bikeData[selectedBike];
    setSelectedDataSecond(selectedBikeData);
  };

  useEffect(() => {
    dispatch(detailsProductAll());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBikeSecond) {
      setSelectedDataFirst(bikeData[selectedBikeFirst]);
      setSelectedDataSecond(bikeData[selectedBikeSecond]);
    }
  }, [selectedBikeSecond, selectedBikeFirst]);

  useEffect(() => {
    if (product && selectedBikeSecond) {
      let bikeColorsFirst = product[selectedBikeSecond] || [];
      setcolorOptionsSecond(bikeColorsFirst);
      setselectedColorSecond(bikeColorsFirst.length ? bikeColorsFirst[0] : {});
    }
  }, [selectedBikeSecond, product]);

  useEffect(() => {
    if (product && selectedBikeFirst) {
      let bikeColorsSecond = product[selectedBikeFirst] || [];
      setcolorOptionsFirst(bikeColorsSecond);
      setselectedColorFirst(bikeColorsSecond.length ? bikeColorsSecond[0] : {});
    }
  }, [selectedBikeFirst, product]);

  const handleColorClickSecond = (value) => {
    setselectedColorSecond(value);
  };
  const handleColorClickFirst = (value) => {
    setselectedColorFirst(value);
  };

  const handlemobileclick = (e) => {
    if (e.currentTarget.id === "book1") {
      navigate(
        `/book?model=${selectedBikeFirst === "RV1+" ? "RV1PLUS" : selectedBikeFirst}`
      );
    } else if (e.currentTarget.id === "book2") {
      navigate(
        `/book?model=${selectedBikeSecond === "RV1+" ? "RV1PLUS" : selectedBikeSecond}`
      );
    } else if (e.currentTarget.id === "book3") {
      navigate(`/book`);
    }
  };

  return (
    <React.Fragment>
      <></>

      <div className="container ccContainer">
        <h2 className="custom-pricing-heading text-left">
          Choose Your Revolt Motorcycle
        </h2>
        <div className="row align-items-center g-0 bike-head">
          <th className="col-12 col-md-4 col-sm-1"></th>
          <th className="col-6 col-md-4 col-sm-1 ccHeading text-middle p-1">
            <select
              value={selectedBikeFirst}
              onChange={handleBikeSelectionFirst}
              className="form-control"
              aria-label="Select Bike Model"
              style={{
                boxShadow: "0 0px 5px -2px rgb(139 139 139 / 31%)",
              }}
            >
              {bikeOptions
                .filter((bike) => bike !== selectedBikeSecond)
                .map((bike) => (
                  <option key={bike} value={bike}>
                    {bike}
                  </option>
                ))}
            </select>
          </th>
          <th className="col-6 col-md-4 col-sm-1 ccHeading text-middle p-1">
            <select
              value={selectedBikeSecond}
              onChange={handleBikeSelectionSecond}
              className="form-control"
              aria-label="Select Bike Model"
              style={{
                boxShadow: "0 0px 5px -2px rgb(139 139 139 / 31%)",
              }}
            >
              {bikeOptions
                .filter((bike) => bike !== selectedBikeFirst)
                .map((bike) => (
                  <option key={bike} value={bike}>
                    {bike}
                  </option>
                ))}
            </select>
          </th>
        </div>

        <div className="row align-items-center g-0 bike-head">
          <div className="col-12 col-md-4 col-sm-1 custom-font-bold custom-font-bold-sticky"></div>
          <div className="col-6 col-md-4 col-sm-1 ">
            <div className="Bike-Section">
              {selectedColorFirst.image && (
                <img
                  loading="lazy"
                  src={"/images/" + selectedColorFirst.image}
                  alt="RV1"
                  className="rounded mx-auto d-block"
                />
              )}
            </div>
          </div>
          <div className="col-6 col-md-4 col-sm-1 ">
            <div className="Bike-Section">
              {selectedColorSecond.image && (
                <img
                  loading="lazy"
                  src={"/images/" + selectedColorSecond.image}
                  alt="RV1+"
                  className="rounded mx-auto d-block"
                />
              )}
            </div>
          </div>

          <div className="row align-items-center g-0 bike-head">
            <div className="col-12 col-md-4 col-sm-1 ccHeading custom-font-bold custom-font-bold-sticky ">
              Color
            </div>
            <div className="col-6 col-md-4 col-sm-1 ">
              <div className="colour-length">
                {Object.keys(selectedColorFirst).length ? (
                  <h5>
                    <strong>Color: </strong> {selectedColorFirst?.color}
                  </h5>
                ) : (
                  ""
                )}
              </div>
              <div className="rv1product bikeColorList">
                <ul>
                  {colorOptionsFirst.map((value) => (
                    <li
                      key={value.id}
                      onClick={() => handleColorClickFirst(value)}
                    >
                      <div
                        className={`bikeColorBox ${value.color === selectedColorFirst.color ? "active" : ""}`}
                      >
                        <span
                          style={{ background: value.hex_color_code }}
                        ></span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-6 col-md-4 col-sm-1 ">
              <div className="colour-length">
                {Object.keys(selectedColorSecond).length ? (
                  <h5>
                    <strong>Color: </strong> {selectedColorSecond?.color}
                  </h5>
                ) : (
                  ""
                )}
              </div>
              <div className="rv1product bikeColorList">
                <ul>
                  {colorOptionsSecond.map((value) => (
                    <li
                      key={value.id}
                      onClick={() => handleColorClickSecond(value)}
                    >
                      <div
                        className={`bikeColorBox ${value.color === selectedColorSecond.color ? "active" : ""}`}
                      >
                        <span
                          style={{ background: value.hex_color_code }}
                        ></span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row align-items-center g-0 bike-row">
            <div className="col-12 col-md-4 col-sm-1 ccHeading">
              <i className="icon range-icon"></i> Range
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.range?.split(",")?.map((str) => {
                return <p>{str}</p>;
              })}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.range?.split(",")?.map((str) => {
                return <p>{str}</p>;
              })}
            </div>
          </div>
          <div className="row align-items-center g-0 bike-head">
            <div className="col-12 col-md-4 col-sm-1 ccHeading custom-font-bold custom-font-bold-sticky">
              Top Speed
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.topSpeed}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.topSpeed}
            </div>
          </div>

          <div className="row align-items-center g-0 bike-head">
            <div className="col-12 col-md-4 col-sm-1 ccHeading custom-font-bold custom-font-bold-sticky">
              Normal Charging (0-80%)
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.normalCharging}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.normalCharging}
            </div>
          </div>
          <div className="row align-items-center g-0 bike-head">
            <div className="col-12 col-md-4 col-sm-1 ccHeading custom-font-bold custom-font-bold-sticky">
              Fast Charging
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.fastCharging}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.fastCharging}
            </div>
          </div>

          <div className="row align-items-center g-0 bike-head">
            <div className="col-12 col-md-4 col-sm-1 ccHeading custom-font-bold custom-font-bold-sticky">
              Battery Capacity:
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.batteryCapacity}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.batteryCapacity}
            </div>
          </div>
          <div className="row align-items-center g-0 bike-head">
            <div className="col-12 col-md-4 col-sm-1 ccHeading custom-font-bold custom-font-bold-sticky">
              Kerb Weight:
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.weight}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.weight}
            </div>
          </div>
          <div className="row align-items-center g-0 bike-head">
            <div className="col-12 col-md-4 col-sm-1 ccHeading custom-font-bold custom-font-bold-sticky">
              App Support:
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.appSupport}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.appSupport}
            </div>
          </div>

          <div className="row align-items-center g-0 bike-row">
            <div className="col-12 col-md-4 col-sm-1 ccHeading">Brakes</div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.brakes?.split("/")?.map((str) => {
                return <p>{str}</p>;
              })}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.brakes?.split("/")?.map((str) => {
                return <p>{str}</p>;
              })}
            </div>
          </div>
          <div className="row align-items-center g-0 bike-row">
            <div className="col-12 col-md-4 col-sm-1 ccHeading">Tyres</div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.tyres?.split("-")?.map((str) => {
                return <p>{str}</p>;
              })}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.tyres?.split("-")?.map((str) => {
                return <p>{str}</p>;
              })}
            </div>
          </div>
          <div className="row align-items-center g-0 bike-row">
            <div className="col-12 col-md-4 col-sm-1 ccHeading">Front Fork</div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.frontFork}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.frontFork}
            </div>
          </div>
          <div className="row align-items-center g-0 bike-row">
            <div className="col-12 col-md-4 col-sm-1 ccHeading">
              Rear Suspension
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.rearSuspension}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.rearSuspension}
            </div>
          </div>
          <div className="row align-items-center g-0 bike-row">
            <div className="col-12 col-md-4 col-sm-1 ccHeading">
              Battery Type
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataFirst.batteryType}
            </div>
            <div className="col-6 col-md-4 col-sm-1">
              {SelectedDataSecond.batteryType}
            </div>

            <div className="row align-items-center g-0 bike-row">
              <div className="col-12 col-md-4 col-sm-1 ccHeading">Motor</div>
              <div className="col-6 col-md-4 col-sm-1">
                {SelectedDataFirst.motor?.split("-")?.map((str) => {
                  return <p>{str}</p>;
                })}
              </div>
              <div className="col-6 col-md-4 col-sm-1">
                {SelectedDataSecond.motor?.split("-")?.map((str) => {
                  return <p>{str}</p>;
                })}
              </div>

              <div className="row align-items-center g-0 bike-row">
                <div className="col-12 col-md-4 col-sm-1 ccHeading">
                  Wheel Base
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataFirst.wheelBase}
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataSecond.wheelBase}
                </div>
              </div>
              <div className="row align-items-center g-0 bike-row">
                <div className="col-12 col-md-4 col-sm-1 ccHeading">
                  Seat Height (Rider)
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataFirst.seatHeight}
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataSecond.seatHeight}
                </div>
              </div>
              <div className="row align-items-center g-0 bike-row">
                <div className="col-12 col-md-4 col-sm-1 ccHeading">
                  Carrying Capacity
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataFirst.carryingCapacity
                    ?.split("/")
                    ?.map((str) => {
                      return <p>{str}</p>;
                    })}
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataSecond.carryingCapacity
                    ?.split("/")
                    ?.map((str) => {
                      return <p>{str}</p>;
                    })}
                </div>
              </div>
              <div className="row align-items-center g-0 bike-row">
                <div className="col-12 col-md-4 col-sm-1 ccHeading">
                  Lighting
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataFirst.lighting?.split("-")?.map((str) => {
                    return <p>{str}</p>;
                  })}
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataSecond.lighting?.split("-")?.map((str) => {
                    return <p>{str}</p>;
                  })}
                </div>
              </div>
              <div className="row align-items-center g-0 bike-row">
                <div className="col-12 col-md-4 col-sm-1 ccHeading">
                  Ground Clearance
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataFirst.groundClearance}
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataSecond.groundClearance}
                </div>
              </div>
              <div className="row align-items-center g-0 bike-row">
                <div className="col-12 col-md-4 col-sm-1 ccHeading">
                  Product Warranty
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataFirst.productWarranty?.split("-")?.map((str) => {
                    return <p>{str}</p>;
                  })}
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataSecond.productWarranty
                    ?.split("-")
                    ?.map((str) => {
                      return <p>{str}</p>;
                    })}
                </div>
              </div>
              <div className="row align-items-center g-0 bike-row">
                <div className="col-12 col-md-4 col-sm-1 ccHeading">
                  Battery Warranty
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataFirst.batteryWarranty?.split("-")?.map((str) => {
                    return <p>{str}</p>;
                  })}
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataSecond.batteryWarranty
                    ?.split("-")
                    ?.map((str) => {
                      return <p>{str}</p>;
                    })}
                </div>
              </div>
              <div className="row align-items-center g-0 bike-row">
                <div className="col-12 col-md-4 col-sm-1 ccHeading">
                  Charger Warranty
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataFirst.chargerWarranty?.split(",")?.map((str) => {
                    return <p>{str}</p>;
                  })}
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataSecond.chargerWarranty
                    ?.split(",")
                    ?.map((str) => {
                      return <p>{str}</p>;
                    })}
                </div>
              </div>
              <div className="row align-items-center g-0 bike-row">
                <div className="col-12 col-md-4 col-sm-1 ccHeading">
                  Ignition Type
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataFirst.ignitionType}
                </div>
                <div className="col-6 col-md-4 col-sm-1">
                  {SelectedDataSecond.ignitionType}
                </div>

                <div className="row align-items-center g-0 bike-row">
                  <div className="col-12 col-md-4 col-sm-1 ccHeading">
                    Pricing
                  </div>
                  <div className="col-6 col-md-4 col-sm-1">
                    {SelectedDataFirst.price}
                  </div>
                  <div className="col-6 col-md-4 col-sm-1">
                    {SelectedDataSecond.price}
                  </div>
                </div>
                <div className="row align-items-center g-0 bike-head main-link">
                  <div className="col-12 col-md-4 col-sm-1 ccHeading custom-font-bold"></div>
                  <div className="col-6 col-md-4 col-sm-1  text-left button">
                    <button
                      id="book1"
                      onClick={handlemobileclick}
                      className="pricing-btn"
                    >
                      Book Now
                    </button>
                  </div>
                  <div className="col-6 col-md-4 col-sm-1  text-left button">
                    <button
                      id="book2"
                      onClick={handlemobileclick}
                      className="pricing-btn"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PricingComparison;
