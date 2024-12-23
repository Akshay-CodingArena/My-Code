import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listOrderMine, deleteOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(userInfo.id);
    dispatch(listOrderMine(userInfo.id));
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to Cancel the order?")) {
      //dispatch(deleteOrder(order.order_id));
      navigate(`/cancel-my-revolt/${order.booking_id}`);
    }
  };
  console.log(orders);
  return (
    <div>
      <h1>Order Summary</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>booking_id</th>
              <th>Mobile</th>
              <th>Name</th>
              <th>State/City</th>
              <th>Bokking Amt.</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.data[0].map((order) => (
              <tr key={order.order_id}>
                <td>{order.booking_ref_id}</td>
                <td>{order.mobile}</td>
                <td>{order.customer_name}</td>
                <td>{order.address}</td>
                <td>{order.booking_amount}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid === 1 ? order.paidAt.substring(0, 10) : "No"}
                </td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      // navigate(`/thankyou/${order.order_id}`);

                      navigate(`/thankyoubooking/${order.order_id}`);
                    }}
                  >
                    Details
                  </button>
                  {/* <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    Cancel Order
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
