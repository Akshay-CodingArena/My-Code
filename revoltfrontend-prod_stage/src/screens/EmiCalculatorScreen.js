import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { detailsProductAll, productBycolor } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Slider from "react-rangeslider";

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

const EmiCalculator = () => {
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  ///////////////hex color///////////
  const [color, setColor] = useState("");
  ////////////actual color/////////
  const [bikeColor, setBikeColor] = useState("");

  const [state, setState] = useState({
    model: "",
    bikePrice: 0,
    amount: 0,
    minLoanAmount: 5000,
    maxLoanAmount: 50000,
    defaultAmount: 0,
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

  const dispatch = useDispatch();
  ///////////////////////////////////////////////////////
  const productDetails = useSelector((state) => state.allProducts);
  const { loading, product } = productDetails;

  ////////////////////////product info by color/////////////////////////////////
  const { loading: loadingProductByColor, product: productInfoByColor } =
    useSelector((state) => state.productDetails);

  const calculatedEmi = () => {
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

      setCalculatedData({
        emi: Math.ceil(calculatedEmi),
        interest:
          calculatedEmi * state.tenure - (state.bikePrice - state.amount),
        totalPayment: calculatedEmi * state.tenure,
      });
    }
  };

  useEffect(() => {
    dispatch(detailsProductAll());
  }, []);

  useEffect(() => {
    if (productInfoByColor) {
      let productInfo = productInfoByColor.purchasee_plan;
      setState({
        ...state,
        bikePrice: productInfo[0].effec_onroad_cost,
      });
    }
  }, [productInfoByColor]);

  useEffect(() => {
    if (productInfoByColor) {
      calculatedEmi();
    }
  }, [state]);

  useEffect(() => {
    //////////////runs only after products fetch////////
    if (product) {
      ///////////keys are the models///////
      setModels(Object.keys(product));
      //////////sets the 1st product as current model////

      let model = Object.keys(product)[0];

      setModel(model);
      ///////set the color of first bike of the current model
      let color = product[Object.keys(product)[0]][0].hex_color_code;

      setColor(color);

      let productInfo = product[model].filter((value) => {
        return color === value.hex_color_code;
      });

      setState({
        ...state,
        model: model,
        amount: model === "RV400BRZ" ? 7199 : 7777,
        defaultAmount: model === "RV400BRZ" ? 7777 : 7199,
      });

      setBikeColor(productInfo[0].color);

      fetchProductPrice(productInfo[0].model_id, productInfo[0].color);
    }
  }, [product]);

  const fetchProductPrice = (productId, modelColor) => {
    dispatch(
      productBycolor(
        productId,
        modelColor,
        {},
        {
          product_type: "RV400",
        },
      ),
    );
  };

  const changeModel = (model) => {
    ///////////change the model///////////////
    setModel(model);
    ///////////////set the color/////////
    let color = product[`${model}`][0].hex_color_code;

    setColor(color);

    let productInfo = product[model].filter((value) => {
      return color === value.hex_color_code;
    });
    setBikeColor(productInfo[0].color);

    setState({
      ...state,
      model: model,
      amount: model === "RV400BRZ" ? 7199 : 7777,
      defaultAmount: model === "RV400BRZ" ? 7199 : 7777,
      bikePrice: 0,
      minLoanAmount: 5000,
      maxLoanAmount: 50000,
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

    fetchProductPrice(productInfo[0].model_id, productInfo[0].color);
  };

  const changeColor = (color) => {
    setColor(color);
    let productInfo = product[model].filter((value) => {
      return color === value.hex_color_code;
    });
    setBikeColor(productInfo[0].color);

    fetchProductPrice(productInfo[0].model_id, productInfo[0].color);
  };

  return (
    <React.Fragment>
      {loading || loadingProductByColor ? <Loader /> : null}

      <section className="emi-calculator-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              {" "}
              <h3>Loan EMI Calculator</h3>
            </div>
            <div className="col-12 info-section ">
              <div className="row g-0">
                <div className="col-12 col-sm-12 col-md-8">
                  <h5>Choose your model</h5>

                  <div className="">
                    {models.map((value) => {
                      return (
                        <span
                          className={`model-section ${
                            value === model ? "active" : ""
                          }`}
                          onClick={() => {
                            changeModel(value);
                          }}
                        >
                          {value}
                        </span>
                      );
                    })}
                  </div>
                  <div>
                    <p className="mt-3">
                      <b>Color : </b>
                      {bikeColor}
                    </p>
                  </div>

                  <div>
                    {" "}
                    {product
                      ? product[`${model}`]?.map((value) => {
                          return (
                            <span
                              onClick={() => changeColor(value.hex_color_code)}
                              className={`bike-color ${
                                value.hex_color_code === color ? "active" : ""
                              }`}
                              style={{ background: value.hex_color_code }}
                            ></span>
                          );
                        })
                      : ""}
                  </div>

                  <div className="slider-section">
                    <div className="">
                      <strong>Downpayment</strong>
                      <strong>{numberFormat(state.amount)}</strong>
                    </div>

                    <div className="slider">
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
                  </div>

                  <div className="SelectBank">
                    <p>Banks : </p>
                  </div>

                  <div className="bank-logos d-flex">
                    <span className="d-flex flex-column ">
                      <img
                        src="/icon_idfc.svg"
                        className={state.bank === "idfc" ? "active" : ""}
                        onClick={() =>
                          setState({
                            ...state,
                            rate: 7.99,
                            tenure: 60,
                            bank: "idfc",
                          })
                        }
                      />
                      <span className="bank-name">IDFC</span>
                      <span className="interest-rate">7.99%</span>
                    </span>

                    <span className="d-flex flex-column ">
                      <img
                        src="/icici_bank.png"
                        className={state.bank === "icici" ? "active" : ""}
                        onClick={() =>
                          setState({
                            ...state,
                            rate: 9.99,
                            tenure: 36,
                            bank: "icici",
                          })
                        }
                      />
                      <span className="bank-name">ICICI</span>
                      <span className="interest-rate">9.99%</span>
                    </span>

                    <span className="d-flex flex-column">
                      <img
                        src="/icon_ruppy.png"
                        className={state.bank === "rupyy" ? "active" : ""}
                        onClick={() =>
                          setState({
                            ...state,
                            rate: 9.5,
                            tenure: 72,
                            bank: "rupyy",
                          })
                        }
                      />
                      <span className="bank-name">RUPPY</span>
                      <span className="interest-rate">9.5%</span>
                    </span>
                    <span className="d-flex flex-column ">
                      <img
                        src="/icon_jana.png"
                        className={state.bank === "jana" ? "active" : ""}
                        onClick={() =>
                          setState({
                            ...state,
                            rate: 8.99,
                            tenure: 48,
                            bank: "jana",
                          })
                        }
                      />
                      <span className="bank-name">JANA BANK</span>
                      <span className="interest-rate">8.99%</span>
                    </span>
                  </div>

                  <div className="tenure-months-section mt-3">
                    {tenureMonths[state.bank]?.map((months) => (
                      <span
                        className={`${months === state.tenure ? "active" : ""}`}
                        onClick={() => setState({ ...state, tenure: months })}
                      >
                        {months}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-4 emi-section text-center">
                  <div className="emi-section-box">
                    {" "}
                    <p>
                      Bike Price{" "}
                      <strong>{numberFormat(state.bikePrice)}</strong>
                    </p>
                    <p>
                      You will pay{" "}
                      <strong>
                        {numberFormat(calculatedData.emi) + "/month"}
                      </strong>
                    </p>
                    <p>
                      Loan Amount{" "}
                      <strong>
                        {numberFormat(state.bikePrice - state.amount)}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default EmiCalculator;
