import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import { Link } from "react-router-dom";

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);

  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    // dispatch(listTopSellers());
  }, [dispatch]);

  console.log(listProducts);

  return (
    <div style={{ textAlign: "center" }}>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {products === undefined ||
            (products.length === 0 && (
              <MessageBox>No Product Found</MessageBox>
            ))}
          <Carousel autoPlay showThumbs={false}>
            {/* <div className="row center"> */}
            {products.map((product) => (
              <Product key={product.model_id} product={product}></Product>
            ))}
            {/* </div> */}
          </Carousel>

          {/*  */}
          <section className="signinnsignup detailsflow">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-9 col-md-7 col-lg-11 col-xl-12 text-center p-0    ">
                  <div className="card px-0 pb-0   ">
                    {/* <form id="msform" className="form" onSubmit={submitHandler}>  */}
                    <ul id="progressbar">
                      <li className="active" id="account">
                        <strong>Your Details </strong>
                      </li>
                      <li id="personal">
                        <strong> Choose Model & MRP</strong>
                      </li>
                      <li id="payment">
                        <strong> Booking Payment </strong>
                      </li>
                      <li id="confirm">
                        <strong> Start My Revolt Plan </strong>
                      </li>
                    </ul>

                    <fieldset className="bikemodeL">
                      <section
                        className="our-motorcycles"
                        data-aos="fade-up"
                        data-aos-duration={800}
                      >
                        {/* <div className="over_bg"></div>
      <div className="over_bg1"></div> */}
                        <div className="container position-relative">
                          <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10">
                              <div className="owl-carousel" id="productinfo">
                                <div className="item">
                                  <div className="blacktheme">
                                    <div className="brand-info text-center">
                                      <div className="bikeimg">
                                        <div className="outer360">
                                          <section className="my-360">
                                            <div className="cd-product-viewer-wrapper">
                                              <section className="container-fluid for-360 container1">
                                                <div className="threesixty product1">
                                                  <div className="loadingimg">
                                                    <img
                                                      src="/images/rebel-red/1.png"
                                                      loading="lazy"
                                                      alt="Revolt Electric Bike"
                                                    />
                                                  </div>
                                                  <div className="spinner">
                                                    <span>0%</span>
                                                  </div>
                                                  <ol className="threesixty_images" />
                                                </div>
                                              </section>
                                            </div>
                                          </section>
                                        </div>
                                      </div>
                                      <div className="image-360"></div>
                                    </div>
                                  </div>
                                  {/* FOR NEW Mist Grey RV 400 */}
                                  <div
                                    className="whitetheme"
                                    style={{ display: "none" }}
                                  >
                                    <div className="brand-info text-center">
                                      <div className="bikeimg">
                                        <div className="outer360">
                                          <section className="my-360">
                                            <div className="cd-product-viewer-wrapper">
                                              <section className="container-fluid for-360 container1">
                                                <div className="threesixty product5">
                                                  <div className="loadingimg">
                                                    <img
                                                      src="/images/801.png"
                                                      loading="lazy"
                                                      alt="Revolt Electric Bike"
                                                    />
                                                  </div>
                                                  <div className="spinner">
                                                    <span>0%</span>
                                                  </div>
                                                  <ol className="threesixty_images" />
                                                </div>
                                              </section>
                                            </div>
                                          </section>
                                        </div>
                                      </div>
                                      <div className="image-360"></div>
                                    </div>
                                  </div>
                                  {/* END OF NEW Mist Grey RV 400 */}
                                  <div
                                    className="redtheme"
                                    style={{ display: "none" }}
                                  >
                                    <div className="brand-info text-center">
                                      <div className="bikeimg">
                                        <div className="outer360">
                                          <section className="my-360">
                                            <div className="cd-product-viewer-wrapper">
                                              <section className="container-fluid for-360 container1">
                                                <div className="threesixty product2">
                                                  <div className="loadingimg">
                                                    <img
                                                      src="/images/cosmic-black/1.png"
                                                      loading="lazy"
                                                      alt="Revolt Electric Bike"
                                                    />
                                                  </div>
                                                  <div className="spinner">
                                                    <span>0%</span>
                                                  </div>
                                                  <ol className="threesixty_images" />
                                                </div>
                                              </section>
                                            </div>
                                          </section>
                                        </div>
                                      </div>
                                      <div className="image-360"></div>
                                    </div>
                                  </div>
                                  <div className="rv400-bike-switch">
                                    <ul>
                                      <li
                                        className="rv400red active"
                                        data-bikeclr="blacktheme"
                                      >
                                        <div
                                          data-bikename="Rebel Red"
                                          className="bikename"
                                        >
                                          <span>
                                            <i
                                              className="fa fa-check"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </div>
                                      </li>
                                      <li
                                        className="rv400black"
                                        data-bikeclr="redtheme"
                                      >
                                        <div
                                          data-bikename="Cosmic Black"
                                          className="bikename"
                                        >
                                          <span>
                                            <i
                                              className="fa fa-check"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </div>
                                      </li>
                                      <li
                                        className="rv400grey"
                                        data-bikeclr="whitethemess"
                                      >
                                        <div
                                          data-bikename="Mist Grey"
                                          className="bikename"
                                        >
                                          <span>
                                            <i
                                              className="fa fa-check"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </div>
                                      </li>
                                    </ul>
                                    <div
                                      className="colorname"
                                      id="colorname-400"
                                    >
                                      <span>Rebel Red</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="item">
                                  <div className="blacktheme rv-300">
                                    <div className="brand-info text-center">
                                      <div className="bikeimg">
                                        <div className="outer360">
                                          <section className="my-360">
                                            <div className="cd-product-viewer-wrapper">
                                              <section className="container-fluid for-360 container1">
                                                <div className="threesixty product3">
                                                  <div className="loadingimg">
                                                    <img
                                                      src="/images/mist_grey/1.png"
                                                      loading="lazy"
                                                      alt="Revolt Electric Bike"
                                                    />
                                                  </div>
                                                  <div className="spinner">
                                                    <span>0%</span>
                                                  </div>
                                                  <ol className="threesixty_images" />
                                                </div>
                                              </section>
                                            </div>
                                          </section>
                                        </div>
                                      </div>
                                      <div className="image-360"></div>
                                    </div>
                                  </div>
                                  <div
                                    className="redtheme rv-300"
                                    style={{ display: "none" }}
                                  >
                                    <div className="brand-info text-center">
                                      <div className="bikeimg">
                                        <div className="outer360">
                                          <section className="my-360">
                                            <div className="cd-product-viewer-wrapper">
                                              <section className="container-fluid for-360 container1">
                                                <div className="threesixty product4">
                                                  <div className="loadingimg">
                                                    <img
                                                      src="/images/mist_grey/1.png"
                                                      loading="lazy"
                                                      alt="Revolt Electric Bike"
                                                    />
                                                  </div>
                                                  <div className="spinner">
                                                    <span>0%</span>
                                                  </div>
                                                  <ol className="threesixty_images" />
                                                </div>
                                              </section>
                                            </div>
                                          </section>
                                        </div>
                                      </div>
                                      <div className="image-360"></div>
                                    </div>
                                  </div>
                                  <div className="rv300-bike-switch">
                                    <ul>
                                      <li
                                        className="rv300red active"
                                        data-bikeclr="blacktheme"
                                      >
                                        <div
                                          data-bikename="Neon Black"
                                          className="bikename"
                                        >
                                          <span />
                                        </div>
                                      </li>
                                      <li
                                        className="rv300black"
                                        data-bikeclr="redtheme"
                                      >
                                        <div
                                          data-bikename="Smokey Grey"
                                          className="bikename"
                                        >
                                          <span />
                                        </div>
                                      </li>
                                    </ul>
                                    <div
                                      className="colorname bikename123"
                                      id="colorname-300"
                                    >
                                      <span>Neon Black</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <div className="form-card bgwhitenone">
                        <div className="row bookib-proceS">
                          <div className="col-12">
                            <p className="fs-title stepnumbering">
                              Select your Revolt Purchase Plan
                            </p>
                          </div>
                          <table className="table table-striped table-bordered tableNSEbooking">
                            <thead>
                              <tr>
                                <th style={{ fontWeight: "normal" }}>
                                  Booking Amount{" "}
                                </th>
                                <th
                                  style={{
                                    background: "#fff",
                                    textAlign: "right",
                                    fontSize: 25,
                                    color: "#ed1c24",
                                  }}
                                >
                                  ₹ 9,999
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td style={{ background: "#fff" }}>
                                  EMI Amount -
                                </td>
                                <td
                                  style={{
                                    background: "#fff",
                                    textAlign: "right",
                                  }}
                                >
                                  -
                                </td>
                              </tr>
                              <tr>
                                <td>Vehicle Ex-Showroom Price</td>
                                <td
                                  style={{
                                    background: "#fff",
                                    textAlign: "right",
                                  }}
                                >
                                  ₹ 172,999
                                </td>
                              </tr>
                              <tr>
                                <td style={{ background: "#fff" }}>
                                  Fame II Incentive 1 (b)
                                </td>
                                <td
                                  style={{
                                    background: "#fff",
                                    textAlign: "right",
                                  }}
                                >
                                  ₹ 48,000
                                </td>
                              </tr>
                              <tr>
                                <td>Cost before on-Road 2 (a-b)</td>
                                <td
                                  style={{
                                    background: "#fff",
                                    textAlign: "right",
                                  }}
                                >
                                  ₹ 124,9993
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="selectbtn">Select</div>
                          <ul className="mt-5">
                            <li>
                              * The price of motorcycle shall be applicable as
                              prevailing on the date of delivery of motorcycle
                              to customer.
                            </li>
                            <li>
                              1. Claimable only once per Aadhar card. T&amp;C
                              apply.
                            </li>
                            <li>
                              2. Your booking amount will be adjusted with the
                              On-Road price. Registration and applicable Road
                              Tax will be additional based on actuals.
                            </li>
                            <li>
                              3. On-Road Price for Revolt Purchase Plan = “Cost
                              Before On-Road” + Add. cost of Registration/RTO
                              (On Actuals) + Insurance + Smart Card + 4G
                              Connectivity Charges + other statutory applicable
                              charges.
                            </li>
                          </ul>
                        </div>
                        <div className="deliveryslot">
                          <div className="row">
                            <div className="col-md-2">
                              <div className="slottime">Delivery Slot</div>
                            </div>
                            <div className="col-md-7">
                              <img
                                src="/images/delveryslotimg.png"
                                alt="Delvery Icon"
                              />
                            </div>
                            <div className="col-md-3">
                              <div className="julyaugust">
                                July - August
                                <br />
                                2022
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                      <input
                        type="button"
                        name="next"
                        className="next action-button"
                        defaultValue="Next"
                      />
                    </fieldset>

                    {/* </form>   */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*  */}
        </>
      )}
    </div>
  );
}
