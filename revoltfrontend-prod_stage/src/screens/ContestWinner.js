import React, { useState } from "react";
import Axios from "axios";
import { URL_API } from "../constants/cartConstants";
import { INVEST_AMOUNT } from "../constants/userConstants";


export default function ContestWinner(props) {
    const [mobile, setMobile] = useState("");
    const [data, setData] = useState({});

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [invoice, setInvoice] = useState("");

    const submitHandler = async (e) => {
        setData({});
        setShowSuccessModal(false);
        setSuccessMessage("");
        setShowErrorModal(false);
        setErrorMessage("");

        e.preventDefault();
        const { data } = await Axios.get(`${URL_API}/api/v1/spin/spin-reward?mobile=${mobile}`);
        if (data.success) {
            setData(data.data)
        } else {
            setShowErrorModal(true);
            setErrorMessage(data.message);
        }
    }


    const Redeem = async (e) => {
        e.preventDefault();


        const responseData = await Axios.post(`${URL_API}/api/v1/spin/redeem/spin-reward`,
            {
                mobile: data.customer_mobile,
                serial_number: data.serial_number,
                booking_id: data.booking_id,
                invoice: invoice
            });

        if (responseData.data.status) {
            setMobile("");
            setInvoice("");
            setSuccessMessage(responseData.data.message);
            setShowSuccessModal(true);
            setData({});
        } else {
            setErrorMessage(responseData.data.message);
            setShowErrorModal(true);
        }
    }

    return (<div className="container contest-winner-section" style={{ minHeight: "50vh" }}>
        <div className="row">
            <div className="col-12 text-left">
                <h3 className="mt-3 mb-3">Enter the mobile no. to verify Reward</h3>
            </div>
        </div>

        <form id="msforms" className="form newTest" onSubmit={submitHandler}>
            <div className="row">
                <div className="form-group col-md-4 name-group">
                    <div className="form-default">
                        <div className="palceholder">
                            <label htmlFor="mobile">Mobile </label>
                            <span className="star">*</span>
                        </div>

                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            className="form-control inputfield"
                            placeholder="Mobile "
                            pattern="[6-9]{1,1}[0-9]{9,9}"
                            title="Please enter a valid mobile number"
                            maxLength={10}
                            required
                            value={mobile}
                            onChange={(e) => {
                                if (
                                    (!e.target.value ||
                                        parseInt(
                                            e.target.value[e.target.value.length - 1]
                                        )) >= 0
                                ) {
                                    //   console.log("Mobile", e.target.value);
                                    setMobile(e.target.value);
                                }
                            }}
                            onInput={(e) => {
                                let value = e.target.value;
                                e.target.value = e.target.value.slice(0, 10);
                                if (/[A-Za-z]/.test(value)) {
                                    e.target.value = mobile;
                                }
                            }}
                        ></input>

                    </div>
                </div>

                <div className="form-group col-md-4 name-group">
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </form>


        <div className="row">
            {showSuccessModal ? <div className="col-12">
                <div class="alert alert-success" role="alert">
                    <b style={{ marginRight: "5px" }}>Message:</b>{successMessage}
                </div>
            </div> : null}

            {showErrorModal ?
                <div className="col-12">
                    <div class="alert alert-danger" role="alert">
                        <b style={{ marginRight: "5px" }}>Message:</b>{errorMessage}
                    </div>
                </div> : null
            }
        </div>

        {Object.keys(data).length ? <div className="row mt-3 mb-3">
            <div className="col-6 mb-3 d-flex">
                <b>Mobile Number:</b>
                <span style={{ marginLeft: "5px" }}>{'+91 ' + data.customer_mobile}</span>
            </div>

            <div className="col-6 mb-3 d-flex">
                <b>Issue Date:</b>
                <span style={{ marginLeft: "5px" }}>{data.date_issued.split("T")[0]}</span>
            </div>

            <div className="col-6 mb-3 d-flex">
                <b>Serial Number:</b>
                <span style={{ marginLeft: "5px" }}>{data.serial_number}</span>
            </div>

            <div className="col-6 mb-3 d-flex">
                <b>Reward:</b>
                <span style={{ marginLeft: "5px" }}>{data.reward_name}</span>
            </div>

            <div className="col-6 mb-3 d-flex">
                <b>Booking Id:</b>
                <span style={{ marginLeft: "5px" }}>{data.booking_id}</span>
            </div>

            {data.is_redeemed ? <div className="col-6 mb-3 d-flex">
                <b>Redemption Date:</b>
                <span style={{ marginLeft: "5px" }}>{
                    data.redemption_date.split("T")[0]
                }</span>
            </div> : null}

            {data.is_redeemed ? <div className="col-6 mb-3 d-flex">
                <b>Invoice Number:</b>
                <span style={{ marginLeft: "5px" }}>{
                    data.invoice
                }</span>
            </div> : null}


            <form id="newForm" className="form newTest" onSubmit={Redeem}>
                <div className="row d-flex">
                    {!data.is_redeemed ? <div className="form-group col-md-4 name-group">
                        <div className="form-default">
                            <div className="palceholder">
                                <label htmlFor="invoice">Invoice </label>
                                <span className="star">*</span>
                            </div>

                            <input
                                type="text"
                                id="invoice"
                                name="invoice"
                                className="form-control inputfield"
                                placeholder="Invoice"
                                title="Enter Invoice Number"
                                autoComplete="off"
                                required
                                value={invoice}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    setInvoice(value);
                                }}
                            ></input>
                        </div>
                    </div> : null}
                    <div className={`col-md-${data.is_redeemed ? '12' : '4'} d-flex ${data.is_redeemed ? "justify-content-center" : ""}`}>
                        <span style={{ cursor: data.is_redeemed ? "not-allowed" : "pointer" }}>
                            <span style={{ pointerEvents: data.is_redeemed ? "none" : "initial" }}>
                                <button type="submit" style={{marginBottom:"30px"}}>
                                    {data.is_redeemed ? 'Already Redeemed' : 'Redeem'}
                                </button>
                            </span>
                        </span>
                    </div>
                </div>
            </form>
        </div> : ""
        }
    </div >
    );
}
