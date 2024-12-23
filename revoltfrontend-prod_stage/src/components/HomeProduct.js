import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const HomeProductInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="container ">
      <h3>Ride the Future Today</h3>
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="product-card">
            <div className="product-head text-center">
              <figure>
                <img src={"/images/eclipse_red.png"} alt="rv400" />
                <img
                  width="140"
                  src={"/images/view360.webp"}
                  data-toggle="modal"
                  data-target="#exampleModal"
                  className="view360"
                />
              </figure>
            </div>
            <div className="product-body">
              <h5 className="bike-model">Revolt RV400 </h5>
              <p>Pricing ₹ 11,6750* Or ₹ 4,444/month</p>
            </div>
            <hr />
            <div className="product-footer">
              <div className="product-bike-info">
                <ul>
                  <li>
                    <img
                      alt="Revolt Battery
"
                      src="/images/calenderhours.svg"
                    />
                    <p>0-100%</p>
                    <h5>IN 4.5 HOURS*</h5>
                  </li>
                  <li>
                    {" "}
                    <img alt="Electric bike speed" src="/images/speed.svg" />
                    <p>
                      85 KM/H{""}
                      <span data-title="Ideal Driving Conditions">*</span>
                    </p>
                    <h5>TOP SPEED</h5>
                  </li>
                  <li>
                    {" "}
                    <img
                      alt="Motorcycle Battery Lifespan"
                      src="/images/battery.svg"
                    />
                    <p>
                      150 KMS
                      <span data-title="Ideal Driving Conditions">*</span>
                    </p>
                    <h5>Per Charge</h5>
                  </li>
                  <li>
                    {" "}
                    <img
                      alt="Revolt Mobile App"
                      style={{ maxWidth: "18px" }}
                      src="/images/phone.svg"
                    />
                    <p style={{ textTransform: "capitalize" }}>mobile app</p>
                    <h5>
                      WITH SMART
                      <br /> FEATURES
                    </h5>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="book-now"
                onClick={() => {
                  navigate("/book");
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="product-card">
            <div className="product-head text-center">
              <figure>
                <img src={"/images/eclipse_red.png"} alt="rv400" />
                {/* <img
                width="30"
                src={"/images/360-view-virtual-reality.svg"}
                data-toggle="modal"
                data-target="#exampleModal"
                className="view360"
              /> */}
              </figure>
            </div>
            <div className="product-body">
              <h5 className="bike-model">Revolt RV400 BRZ</h5>
              <p>Starting at ₹ 10,2750 Or ₹ 3,777/month</p>
            </div>
            <hr />
            <div className="product-footer">
              <div className="product-bike-info">
                <ul>
                  <li>
                    <img
                      alt="Revolt Battery
"
                      src="/images/calenderhours.svg"
                    />
                    <p>0-100%</p>
                    <h5>IN 4.5 HOURS*</h5>
                  </li>
                  <li>
                    {" "}
                    <img alt="Electric bike speed" src="/images/speed.svg" />
                    <p>
                      85 KM/H{""}
                      <span data-title="Ideal Driving Conditions">*</span>
                    </p>
                    <h5>TOP SPEED</h5>
                  </li>
                  <li>
                    {" "}
                    <img
                      alt="Motorcycle Battery Lifespan"
                      src="/images/battery.svg"
                    />
                    <p>
                      150 KMS
                      <span data-title="Ideal Driving Conditions">*</span>
                    </p>
                    <h5>Per Charge</h5>
                  </li>
                  <li>
                    {" "}
                    <img
                      alt="Revolt Mobile App"
                      style={{ maxWidth: "18px" }}
                      src="/images/phone.svg"
                    />
                    <p style={{ textTransform: "capitalize" }}>mobile app</p>
                    <h5>
                      WITH SMART
                      <br /> FEATURES
                    </h5>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="book-now"
                onClick={() => {
                  navigate("/book");
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>{" "}
        <div className="col-12 col-md-4">
          <div className="product-card">
            <div className="product-head text-center">
              <figure>
                <img src={"/images/eclipse_red.png"} alt="rv400" />
                {/* <img
                width="30"
                src={"/images/360-view-virtual-reality.svg"}
                data-toggle="modal"
                data-target="#exampleModal"
                className="view360"
              /> */}
              </figure>
            </div>
            <div className="product-body">
              <h5 className="bike-model">Revolt RV400 BRZ</h5>
              <p>Starting at ₹ 10,2750 Or ₹ 3,777/month</p>
            </div>
            <hr />
            <div className="product-footer">
              <div className="product-bike-info">
                <ul>
                  <li>
                    <img
                      alt="Revolt Battery
"
                      src="/images/calenderhours.svg"
                    />
                    <p>0-100%</p>
                    <h5>IN 4.5 HOURS*</h5>
                  </li>
                  <li>
                    {" "}
                    <img alt="Electric bike speed" src="/images/speed.svg" />
                    <p>
                      85 KM/H{""}
                      <span data-title="Ideal Driving Conditions">*</span>
                    </p>
                    <h5>TOP SPEED</h5>
                  </li>
                  <li>
                    {" "}
                    <img
                      alt="Motorcycle Battery Lifespan"
                      src="/images/battery.svg"
                    />
                    <p>
                      150 KMS
                      <span data-title="Ideal Driving Conditions">*</span>
                    </p>
                    <h5>Per Charge</h5>
                  </li>
                  <li>
                    {" "}
                    <img
                      alt="Revolt Mobile App"
                      style={{ maxWidth: "18px" }}
                      src="/images/phone.svg"
                    />
                    <p style={{ textTransform: "capitalize" }}>mobile app</p>
                    <h5>
                      WITH SMART
                      <br /> FEATURES
                    </h5>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="book-now"
                onClick={() => {
                  navigate("/book");
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProductInfo;
