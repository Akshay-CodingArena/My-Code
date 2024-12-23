import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export default function ProductListScreen(props) {
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/dealer") >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo.id : "", pageNumber }),
    );
  }, [
    createdProduct,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <div className="light-grey full-view padding-top-100 padding-bottom-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="box-table-panel">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h3 className="tab-title">Products</h3>
                    </div>
                  </div>
                </div>
                <div className="common-section">
                  <div className="table-sectiondata booking-table table-response">
                    {loadingDelete && <LoadingBox></LoadingBox>}
                    {errorDelete && (
                      <MessageBox variant="danger">{errorDelete}</MessageBox>
                    )}
                    {loadingCreate && <LoadingBox></LoadingBox>}
                    {errorCreate && (
                      <MessageBox variant="danger">{errorCreate}</MessageBox>
                    )}

                    {loading ? (
                      <LoadingBox></LoadingBox>
                    ) : error ? (
                      <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                      <>
                        <table className="table table-striped tableNSEbooking table-bordered tableNSE">
                          <thead>
                            <tr>
                              <th>Model</th>
                              <th>Name</th>
                              <th>Color</th>
                              <th>Battery Rating</th>
                              <th>Voltage</th>
                              {/* <th>ACTIONS</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product) => (
                              <tr key={product.model_id}>
                                <td>{product.model_id}</td>
                                <td>{product.model_family_name}</td>
                                <td>{product.color}</td>
                                <td>{product.battery_rating}</td>
                                <td>{product.voltage}</td>
                                {/* <td>
                                                                                              <button type="button" className="small"
                                                                                                  onClick={() => navigate(`/product/${product._id}/edit`)}>
                                                                                                  Edit
                                                                                              </button>
                                                                                              <button type="button" className="small"
                                                                                                  onClick={() => deleteHandler(product)}>
                                                                                                  Delete
                                                                                              </button>
                                                                                        </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {/*                                                                     
                                                                          <div className="row center pagination">
                                                                              {[...Array(pages).keys()].map((x) => (
                                                                                  <Link
                                                                                      className={x + 1 === page ? 'active' : ''}
                                                                                      key={x + 1}
                                                                                      to={`/productlist/pageNumber/${x + 1}`}
                                                                                  >
                                                                                      {x + 1}
                                                                                  </Link>
                                                                              ))}
                                                                          </div>
                                                                    */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
