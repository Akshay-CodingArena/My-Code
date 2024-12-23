import { useEffect, useState } from "react";
import { axios } from "../utilities/axios";
import moment from "moment";

const SpinWheel = () => {
  const [mobile, setMobile] = useState("");
  const [lsq_opp_id, setLsq_opp_id] = useState("");
  const [bookingInfo, setBookingInfo] = useState({});
  const [errors, setErrors] = useState({ mobile: "" });
  const [eligibility, setEligibility] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [PRIZE, setPRIZE] = useState({ id: "", name: "" });
  const [showTerms, setShowTerms] = useState(false);
  const SEGMENTS = 10;
  // const map = {
  //   12: 1, // Key Chain
  //   6: 2, // Extended Warranty (1 Year)
  //   2: 3, // 15% Discount
  //   10: 4, // Helmet
  //   4: 5, // Free Insurance
  //   3: 6, // 10% Discount
  //   9: 7, // Revolt Care - Silver
  //   // 5: 8, // 2 Yrs Warranty
  //   1: 9, // Free RV400
  //   7: 10, // Guitar
  //   11: 11, // T-shirt
  //   8: 12, // Jacket
  // };

  const map = {
    7: 1, // Revolt Jacket
    5: 2, // Extended Warranty (1 Year)
    2: 3, // 15% Discount
    9: 4, // Helmet
    4: 5, // Free Insurance
    3: 6, // 10% Discount
    8: 7, // Revolt Care - Silver
    1: 8, // Free RV400
    6: 9, // Guitar
    10: 10, // T-shirt
  };

  const SEG_ANGLE = 360 / SEGMENTS;
  // const [showModal]
  const updateLSQ = () => {
    const URL = process.env.REACT_APP_URL_API + "/api/v1/spin/testRide-update";
    axios.post(URL, {
      lsq_opp_id: lsq_opp_id,
      reward_name: PRIZE.name,
      booking_info: {
        booking_id: bookingInfo.booking_id,
        lsq_opp_id: bookingInfo.lsq_opp_id,
      },
    });
  };
  const handleMobile = (event) => {
    console.log("Mobile is", event.target.value);
    setMobile(event.target.value);
  };

  const elegibilityCheck = async (event) => {
    event.preventDefault();
    const URL =
      process.env.REACT_APP_URL_API + "/api/v1/spin/testRide-completion/check";
    let date = new Date();
    let toDate = moment(date).format("YYYY-MM-DD");

    const { data } = await axios.get(URL, {
      params: {
        mobile: mobile,
        booking_done_date_range: `2019-08-29 TO 2024-12-31`,
        testride_date_range: `2019-08-29 TO 2024-12-31`,
      },
    });
    if (data.eligibility) {
      setEligibility(true);
      setLsq_opp_id(data.lsq_opp_id);
      setName(data.name);
      setBookingInfo(data.booking_info);
    } else {
      setErrors({ mobile: data.message });
    }
    console.log("Data is", data);
  };

  const claimPrize = async () => {
    const URL = process.env.REACT_APP_URL_API + "/api/v1/spin/spin-reward";
    const { data } = await axios.post(URL, { mobile: mobile });
    document.querySelector("#wheel").classList.remove("spin-wheel-infinite");
    setPRIZE({ id: data.reward_id, name: data.reward });
    // setPRIZE({id:"1", name:"RV400"});
  };

  const rotatewheel = () => {
    claimPrize();
    document.querySelector("#wheel").classList.add("spin-wheel-infinite");
  };

  const rotatewheelFinal = () => {
    let random = Math.floor(Math.random() * (SEG_ANGLE - 10)) + 2;

    console.log("FINAL" + SEG_ANGLE * Math.abs(SEGMENTS - map[PRIZE.id]));

    // console.log("Random",random);

    document.documentElement.style.setProperty(
      "--rotate",
      2178 + (SEG_ANGLE * Math.abs(SEGMENTS - map[PRIZE.id]) + random) + "deg"
    );

    document.querySelector("#wheel").classList.add("spin-wheel");
    setTimeout(() => {
      document.querySelector("#wheel").classList.remove("spin-wheel");
      updateLSQ();
      setStep(3);
    }, 6000);
  };

  useEffect(() => {
    if (PRIZE.id) {
      //  claimPrize()
      rotatewheelFinal();
    }
  }, [PRIZE]);

  return (
    <div>
      <section className="light-grey userSignIn padding-top-100 padding-bottom-100 p-5 wheelSection">
        <img
          className="logo"
          src="/images/revolt-motors-logo-w.svg"
          width="100"
          height=""
        />
        {step == 1 ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-common">
                  <h4 className="text-center font-600">SPIN & WIN</h4>
                  <p className="text-center">
                    Spin the Wheel and win amazing prizes.
                  </p>

                  <div className="form-default">
                    <div className="form">
                      <div className="form-group name-group">
                        <input
                          className="form-control inputfield"
                          type="text"
                          id="mobile"
                          placeholder="Enter Mobile Number"
                          required
                          minLength={10}
                          maxLength={10}
                          onChange={(e) => {
                            if (e.target.value.length == 11) return false; //limits to 10 digit entry
                            setMobile(e?.target.value); //saving input to state
                          }}
                          onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                              /([^a-z-0-9]+)/gi,
                              ""
                            ))
                          }
                        ></input>
                        {eligibility ? (
                          <table
                            className="spin-wheel-table"
                            style={{
                              color: "white",
                              fontSize: "11px",
                              marginLeft: "20px",
                              marginTop: "11px",
                            }}
                          >
                            <tr>
                              <td>Name: </td>
                              <td>{bookingInfo.customer_name}</td>
                            </tr>
                            <tr>
                              <td>Booking Id: </td>
                              <td>{bookingInfo.booking_id}</td>
                            </tr>
                            <tr>
                              <td>Booking Date: </td>
                              <td>{bookingInfo.createdAt}</td>
                            </tr>
                            <tr>
                              <td>Hub: </td>
                              <td>{bookingInfo.area_name}</td>
                            </tr>
                          </table>
                        ) : null}
                        {!eligibility ? (
                          <div
                            className="form-control inputfield"
                            style={{
                              marginTop: "10px",
                              backgroundColor: "#DBA800",
                              color: "black",
                              borderRadius: "5px",
                              textAlign: "center",
                              cursor: "pointer",
                              fontWeight: "bold !important",
                              height: "44px",
                            }}
                            onClick={elegibilityCheck}
                          >
                            VALIDATE
                          </div>
                        ) : null}
                        {/* <div className="col-md-6 name-group"> */}
                        {eligibility ? (
                          <div
                            // type="submit"
                            className="form-control inputfield"
                            style={{
                              marginTop: "10px",
                              backgroundColor: "#DBA800",
                              color: "black",
                              fontWeight: "bold",
                              height: "44px",
                              borderRadius: "5px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                            onClick={() => setStep(2)}
                          >
                            PROCEED
                          </div>
                        ) : null}
                        {/* </div> */}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        {errors.mobile ? (
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#f6f6f6",
                              border: "1px dashed rgb(219, 168, 0)",
                              padding: "10px",
                              lineHeight: "18px",
                            }}
                          >
                            {errors.mobile}
                          </span>
                        ) : null}
                      </div>
                      {/* userfield end */}

                      {/* PASSword field*/}

                      {/* passwordfield end */}

                      {/*  OTP */}

                      <div id="otpverdictvalue"></div>

                      <div id="otpshow"></div>
                      <p
                        style={{
                          padding: "10px",
                          fontSize: "11px",
                          textAlign: "right",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowTerms(true)}
                      >
                        Terms and Conditions
                      </p>
                      {showTerms ? (
                        <div className="tc-overlay">
                          <div
                            className="tc-dialog"
                            style={{ position: "relative" }}
                          >
                            <p
                              onClick={() => setShowTerms(false)}
                              style={{ cursor: "pointer" }}
                              className="closeTc"
                            >
                              X
                            </p>
                            <div className="tc-dialog-content termsBlock">
                              <h3>Terms & Conditions</h3>
                              <ul>
                                <li>
                                  Eligibility:
                                  <ol>
                                    <li>
                                      The contest is open to customers who have
                                      booked a Revolt RV400 or RV400 BRZ
                                      motorcycle and have completed a test ride.
                                    </li>
                                    <li>
                                      {" "}
                                      Participants must be of legal age and
                                      residents of India.{" "}
                                    </li>
                                    <li>
                                      Employees of Revolt Motors, Authorised
                                      Dealers and their immediate family members
                                      are not eligible to participate.
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  Contest Period:
                                  <ol>
                                    <li>
                                      The contest is valid from 9th October to
                                      31st October, 2024.
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  Participation:
                                  <ol>
                                    <li>
                                      Eligible customers can participate in the
                                      contest only once.
                                    </li>
                                    <li>
                                      Participants must be physically present at
                                      a Revolt Dealership to play the contest.
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  Contest Mechanism:
                                  <ol>
                                    <li>
                                      The Spin & Win contest operates on a
                                      computer-generated random probability
                                      system designed by the company.
                                    </li>
                                    <li>
                                      The outcome of each spin is determined
                                      entirely by this randomized system,
                                      ensuring fair and unbiased results for all
                                      participants.
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  {" "}
                                  Prize Redemption:
                                  <ol>
                                    <li>
                                      Winning prizes will be awarded only upon
                                      the successful purchase of a Revolt RV400
                                      or RV400 BRZ motorcycle during the contest
                                      period. i.e. motorcycle purchase must be
                                      completed before October 31, 2024 .{" "}
                                    </li>
                                    <li>
                                      The prize is non-transferable and
                                      non-exchangeable for cash or other items.{" "}
                                    </li>
                                    <li>
                                      No alterations or substitutions of the
                                      winning prize are permitted.
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  Prize Delivery:
                                  <ol>
                                    <li>
                                      Certain prizes will be delivered within 20
                                      business days of the motorcycle purchase
                                      through courier service.
                                    </li>
                                    <li>
                                      {" "}
                                      For prizes not delivered by courier,
                                      winners will be informed about the
                                      collection process.
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  General Conditions:
                                  <ol>
                                    <li>
                                      Revolt Motors reserves the right to
                                      modify, suspend, or terminate the contest
                                      at any time without prior notice.
                                    </li>
                                    <li>
                                      In case of any dispute, the decision of
                                      Revolt Motors shall be final and binding.
                                    </li>
                                    <li>
                                      By participating in the contest, customers
                                      agree to these terms and conditions.
                                    </li>
                                    <li>
                                      Revolt Motors is not responsible for any
                                      technical failures or human errors that
                                      may occur during the contest.
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  Privacy:
                                  <ol>
                                    <li>
                                      Personal information collected during the
                                      contest will be used solely for contest
                                      administration and prize fulfilment.
                                    </li>
                                    <li>
                                      Participants agree to the use of their
                                      name and image for publicity purposes
                                      without additional compensation.
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  {" "}
                                  Liability:
                                  <ol>
                                    <li>
                                      Revolt Motors and its partners are not
                                      responsible for any injuries, losses, or
                                      damages of any kind arising from
                                      participation in the contest or acceptance
                                      of the prize.{" "}
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  Extra Cost & Taxes:
                                  <ol>
                                    <li>
                                      Any extra cost or appliable taxes, related
                                      to the prize are the sole responsibility
                                      of the winner.
                                    </li>
                                  </ol>
                                </li>
                                <li>
                                  Governing Law:
                                  <ol>
                                    <li>
                                      This contest is governed by the laws of
                                      India.
                                    </li>
                                  </ol>
                                </li>{" "}
                              </ul>
                              <p>
                                Revolt Motors reserves the right to amend these
                                terms and conditions at any time without prior
                                notice. It is the responsibility of participants
                                to review these terms periodically for updates
                                or changes.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {/* OTP end */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : step == 2 ? (
          <>
            <div className="wheel-box">
              <div className="wheel-container">
                <figure>
                  <img
                    id="wheel"
                    className="wheel fixed-wheel"
                    src="/images/spinwheel/Spin-the-weel.png"
                  />
                  <img
                    className="wheel middle-wheel"
                    style={{ position: "absolute", cursor: "pointer" }}
                    src="/images/spinwheel/Middle.png"
                    onClick={() => rotatewheel()}
                  />
                </figure>
              </div>
            </div>
          </>
        ) : step == 3 ? (
          <>
            <div className="thank-you-spin">
              <div className="textYouBox">
                <h1>
                  Congratulations! You've won <span>{PRIZE?.name} </span>.
                  <strong
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginTop: "10px",
                    }}
                  >
                    Complete your motorcycle purchase to claim your prize!
                  </strong>
                </h1>
                <div className=""></div>
              </div>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
};

export default SpinWheel;
