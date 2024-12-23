import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { useState, useEffect } from "react";
import Radio from "./EmiCalculator/Radio";
import { useLocation } from "react-router-dom";

const numberFormat = (value) => {
  let numberVal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
  let result1 = numberVal.split("₹");
  let result2 = result1[1].split(".");
  let result = "₹ " + result2[0];
  return result;
};

const tenureMonths = {
  idfc: [12, 24, 36, 48, 60],
  icici: [12, 24, 36],
  rupyy: [12, 24, 36, 48, 60, 72],
  jana: [12, 24, 36, 48],
};
const models = ["RV400"];

const EmiCalculator = ({ model }) => {
  const location = useLocation();
  const [state, setState] = useState({
    model: "RV400",
    bikePrice:
      parseInt(localStorage.getItem("bikePrice")) +
      parseInt(localStorage.getItem("chargerPrice")),
    amount: model === "RV400" ? 7777 : 7199,
    minLoanAmount: 5000,
    maxLoanAmount: 50000,
    defaultAmount: model === "RV400" ? 7777 : 7199,
    tenureType: "Month",
    tenure: 60,
    minTenure: 12,
    maxTenure: 60,
    minTenureYear: 1,
    maxTenureYear: 6,
    minRate: 1,
    maxRate: 20,
    rate: 7.99,
    tenureStepper: 6,
    bank: "idfc",
  });

  const [calculatedData, setCalculatedData] = useState({
    emi: 0,
    interest: 0,
    totalPayment: 0,
  });

  const setYear = () => {
    if (state.tenureType != "Year") {
      setState({
        ...state,
        tenureType: "Year",
        minTenure: 1,
        maxTenure: 5,
        tenure: state.tenure / 12,
        tenureStepper: 0.5,
      });
    }
  };

  useEffect(() => {
    if (model) {
      let temp = model === "RV400BRZ" ? "RV400 BRZ" : "RV400";
      models[0] = temp;
      setState({ ...state, model: temp });
    }
  }, [model]);

  const setMonth = () => {
    if (state.tenureType != "Month") {
      setState({
        ...state,
        tenureType: "Month",
        minTenure: 6,
        maxTenure: 60,
        tenure: state.tenure * 12,
        tenureStepper: 6,
      });
    }
  };

  useEffect(() => {
    let calculatedTenure = state.tenure / 12;
    if (state.tenureType === "Year") {
      // const calculatedEmi = (state.amount * (state.rate/(12*100)) * Math.pow((1+(state.rate/(12*100))),state.tenure))/(Math.pow((1+(state.rate/(12*100))),state.tenure)-1)
      const calculatedEmi =
        ((((state.bikePrice - state.amount) * state.rate) / (12 * 100)) *
          Math.pow(1 + state.rate / (12 * 100), state.tenure * 12)) /
        (Math.pow(1 + state.rate / (12 * 100), state.tenure * 12) - 1);
      setCalculatedData({
        emi: Math.round(calculatedEmi),
        interest:
          calculatedEmi * state.tenure * 12 - (state.bikePrice - state.amount),
        totalPayment: calculatedEmi * state.tenure * 12,
      });
    } else {
      const calculatedEmi =
        (state.bikePrice -
          state.amount +
          (state.bikePrice - state.amount) *
            (state.rate / 100) *
            (state.tenure / 12)) /
        state.tenure;
      // const calculatedEmi =
      //   ((((state.bikePrice - state.amount) * state.rate) / (12 * 100)) *
      //     Math.pow(1 + state.rate / (12 * 100), state.tenure)) /
      //   (Math.pow(1 + state.rate / (12 * 100), state.tenure) - 1);
      setCalculatedData({
        emi: Math.ceil(calculatedEmi),
        interest:
          calculatedEmi * state.tenure - (state.bikePrice - state.amount),
        totalPayment: calculatedEmi * state.tenure,
      });
    }
  }, [state]);

  return (
    <div className="calculatorContainer">
      <div className="col-sm-12">
        <div className="bsEmiCalcSlider">
          <div className="row">
            <div className="col-sm-12">
              <div
                style={{ position: "absolute" }}
                className="bsSliderInpitBox text-left"
              >
                <strong>Model</strong>
              </div>
              <div className="sliderWithoutInput d-flex tenureContainer">
                {models.map((model) => (
                  <div
                    className={`tenureMonths ${
                      model === state.model ? "selectedMonth" : ""
                    }`}
                    onClick={() => setState({ ...state, model: model })}
                  >
                    {model}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-sm-12 mt-4">
              <div
                style={{ position: "absolute", width: "92%" }}
                className="bsSliderInpitBox d-flex justify-content-between"
              >
                <strong>Downpayment </strong>
                <strong>{numberFormat(state.amount)}</strong>
              </div>
              <div className="bsSliderInpitBox text-right sliderWithoutInput">
                {/* <span>₹</span>
                    <input
                        className="text-center calcInput"
                        type="text"
                        pattern="[0-9]*"
                        id="principal"
                        maxLength="7"
                        name="principal"
                        value={state.amount}
                        onChange={(e) => setState({...state, amount:e.target.value})}
                        onBlur={(e) => {
                            console.log("------------ON BLUR CALLED------")
                            //this.setAmount(e.target.value)
                        }}
                    /> */}
              </div>
              <Slider
                className="bsEmiSlider"
                key={`slider-${state.maxLoanAmount / 2}`}
                min={state.minLoanAmount}
                tooltip={false}
                max={state.maxLoanAmount}
                step={500}
                labels={{
                  5000: "Min: " + numberFormat(state.minLoanAmount),
                  50000: "Max: " + numberFormat(state.maxLoanAmount),
                }}
                value={state.amount}
                aria-label="Default"
                valueLabelDisplay="on"
                onChange={(v) => {
                  setState({ ...state, amount: v });
                }}
              />
            </div>
            <div className="col-sm-12 pt-4">
              {/* <div style={{position:'absolute'}} className="bsSliderInpitBox text-left">
            <strong>Interest Rate</strong>
            </div>
                <div className="bsSliderInpitBox text-right">
                    <input
                        className="text-center calcInput"
                        type="text"
                        pattern="[0-9]*"
                        id="principal"
                        maxLength="7"
                        name="principal"
                        value={state.rate}
                        onChange={(e) => setState({...state, rate:e.target.value})}
                        onBlur={(e) => {
                            console.log("------------ON BLUR CALLED------")
                            //this.setAmount(e.target.value)
                        }}
                    />
                </div>
                <Slider
                    className="bsEmiSlider"
                    key={`slider-${state.maxRate/2}`}
                    min={state.minRate}
                    tooltip={false}
                    max={state.maxRate}
                    step={.25}
                    labels={{
                        minLoanAmount:
                            "Min: " + state.minRate+"%",
                        2000000: "Max: " + state.maxRate+"%",
                    }}
                    value={state.rate}
                    aria-label="Default"
                    valueLabelDisplay="on"
                    onChange={(v) => {
                        setState({...state, rate:v});
                    }}
                /> */}
              <div className="d-flex flex-column">
                <strong style={{ paddingBottom: "10px" }}>Bank</strong>
                <div className="d-flex">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src="/icon_idfc.svg"
                      width="60"
                      className={`emi_bank_logo ${
                        state.rate === 7.99 ? "active" : null
                      }`}
                      onClick={() =>
                        setState({
                          ...state,
                          rate: 7.99,
                          tenure: 60,
                          bank: "idfc",
                        })
                      }
                    />
                    <Radio
                      showName={true}
                      label="7.99"
                      id="idfc"
                      name="idfc"
                      value={"7.99%"}
                      groupValue={state.rate}
                      onClick={() =>
                        setState({
                          ...state,
                          rate: 7.99,
                          tenure: 60,
                          bank: "idfc",
                        })
                      }
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src="/icici_bank.png"
                      width="60"
                      className={`emi_bank_logo ${
                        state.rate === 9.99 ? "active" : null
                      }`}
                      onClick={() =>
                        setState({
                          ...state,
                          rate: 9.99,
                          tenure: 36,
                          bank: "icici",
                        })
                      }
                    />
                    <Radio
                      showName={true}
                      label="9.99"
                      id="icici"
                      name="icici"
                      value={"9.99%"}
                      groupValue={state.rate}
                      onClick={() =>
                        setState({
                          ...state,
                          rate: 9.99,
                          tenure: 36,
                          bank: "icici",
                        })
                      }
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src="/icon_ruppy.png"
                      height="50px"
                      width="60"
                      className={`emi_bank_logo ${
                        state.rate === 9.5 ? "active" : null
                      }`}
                      onClick={() =>
                        setState({
                          ...state,
                          rate: 9.5,
                          tenure: 72,
                          bank: "rupyy",
                        })
                      }
                    />
                    <Radio
                      showName={true}
                      label="9.5"
                      id="rupyy"
                      name="rupyy"
                      value={"9.5%"}
                      groupValue={state.rate}
                      onClick={() =>
                        setState({
                          ...state,
                          rate: 9.5,
                          tenure: 72,
                          bank: "rupyy",
                        })
                      }
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src="/icon_jana.png"
                      height="50px"
                      width="60"
                      className={`emi_bank_logo ${
                        state.rate === 8.99 ? "active" : null
                      }`}
                      onClick={() =>
                        setState({
                          ...state,
                          rate: 8.99,
                          tenure: 48,
                          bank: "jana",
                        })
                      }
                    />
                    <Radio
                      showName={true}
                      label="8.99"
                      id="rupyy"
                      name="Jana Bank"
                      value={"8.99%"}
                      groupValue={state.rate}
                      onClick={() =>
                        setState({
                          ...state,
                          rate: 8.99,
                          tenure: 48,
                          bank: "jana",
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 pt-4">
              <div
                style={{ position: "absolute" }}
                className="bsSliderInpitBox text-left"
              >
                <strong>Loan Tenure (in Months)</strong>
              </div>
              {/* <div className="bsSliderInpitBox text-right">
                    <Radio label="Mo"  value="Month" groupValue={state.tenureType} onClick={setMonth}/>
                    <Radio label="Yr"  value="Year" groupValue={state.tenureType} onClick={setYear}/>
                    <input
                        className="text-center calcInput"
                        type="text"
                        pattern="[0-9]*"
                        id="principal"
                        maxLength="7"
                        name="principal"
                        value={state.tenure}
                        onChange={(e) => setState({...state, tenure:e.target.value})}
                        onBlur={(e) => {
                            console.log("------------ON BLUR CALLED------")
                            //this.setAmount(e.target.value)
                        }}
                    />
                </div> */}
              {/* <Slider
                    className="bsEmiSlider"
                    key={`slider-${state.maxTenure/2}`}
                    min={state.minTenure}
                    tooltip={false}
                    max={state.maxTenure}
                    step={state.tenureStepper}
                    labels={state.tenureType==="Month"?{
                        6:
                            "Min Tenure: " + state.minTenure,
                        60: "Max Tenure: " + state.maxTenure,
                    }:{
                        .5:
                        "Min Tenure: " + state.minTenure,
                    5: "Max Tenure: " + state.maxTenure,
                    }}
                    value={state.tenure}
                    aria-label="Default"
                    valueLabelDisplay="on"
                    onChange={(v) => {
                        setState({...state, tenure:v});
                    }}
                /> */}
              <div className="sliderWithoutInput d-flex tenureContainer">
                {tenureMonths[state.bank]?.map((months) => (
                  <div
                    className={`tenureMonths ${
                      months === state.tenure ? "selectedMonth" : ""
                    }`}
                    onClick={() => setState({ ...state, tenure: months })}
                  >
                    {months}
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="col-sm-6 ">
                <div className="bsSliderInpitBox text-right">
                    <span>Months</span>
                    <input
                        className="text-center bsMonth"
                        type="text"
                        id="tenure"
                        name="tenure"
                        pattern="[0-9]*"
                        maxLength="2"
                        value={this.state.tenure}
                        onChange={(e) => this.setTenure(e.target.value)}

                    />
                </div>
                <Slider
                    className="bsEmiSlider"
                    key={`slider-${this.state.maxTenure}`}
                    tooltip={true}
                    min={this.state.maxTenure === 12 ? this.state.minTenure / 2 : this.state.minTenure}
                    max={this.state.maxTenure}
                    labels={{
                        maxTenure:
                            "Max: " + this.state.maxTenure + " Months",
                        minTenure:
                            "Min: " + this.state.minTenure + " Months",
                    }}
                    value={this.state.tenure}
                    aria-label="Default"

                    tooltipPlacement="right"
                    step={6}
                    onChange={(v) => {
                        this.state.maxTenure === 12 ? this.setTenure(12) : this.setTenure(v);
                    }}
                />
            </div> */}
          </div>
        </div>
      </div>
      <div className="col-sm-12 d-flex flex-column justify-content-center  align-items-center calcResult pt-4">
        <table>
          <tr>
            <th>You will pay</th>
            <th>{numberFormat(calculatedData.emi)}/month</th>
          </tr>
          <tr>
            <td>Bike Price</td>
            <td>{numberFormat(state.bikePrice)}</td>
          </tr>
          <tr>
            <td>Loan Amount</td>
            <td>{numberFormat(state.bikePrice - state.amount)}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default EmiCalculator;
