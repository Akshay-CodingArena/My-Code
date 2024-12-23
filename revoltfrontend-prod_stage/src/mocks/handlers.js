import { rest } from "msw";
import {
  RM0400RRCP1CWLYL,
  bookingSlots,
  loadSquare,
  products,
  responseFreshdesk,
  stateCityList,
} from "./data";
// import { URL_API } from "../constants/cartConstants";

export const mockUtilities = {
  freshdesk: (payload) => payload,
};

const URL_API = "https://uat-webapi.revoltmotors.com";
export const handlers = [
  rest.get(
    `https://uat-webapi.revoltmotors.com/api/v1/products`,
    (req, res, ctx) => {
      console.log("dddddddddddddddddddoolonnoooooogi");
      return res(ctx.status(200), ctx.json(products));
    },
  ),
  rest.get(
    "https://uat-webapi.revoltmotors.com/api/v1/products/RM0400RRCP1CWLYL",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.josn(RM0400RRCP1CWLYL));
    },
  ),
  rest.get(
    "https://uat-webapi.revoltmotors.com/api/v1/products/checkbookingslots/152",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(bookingSlots));
    },
  ),
  rest.post(
    `https://uat-webapi.revoltmotors.com/api/v1/common/freshdesk_records/contacts`,
    (req, res) => {
      console.log("request is contsact", req.body);
      mockUtilities.freshdesk(req.body);
      return res(ctx.status(200), ctx.json(responseFreshdesk));
    },
  ),
  rest.get(
    `https://uat-webapi.revoltmotors.com/api/v1/common/getservicecenter`,
    (req, res, ctx) => {
      console.log("dddddddddddddddddddoooooooogi");
      return res(ctx.status(200), ctx.json(stateCityList));
    },
  ),
  rest.get(
    `https://uat-webapi.revoltmotors.com/api/v1/common/getallstatelist_upgrade`,
    (req, res, ctx) => {
      console.log("dddddddddddddddddddoooooooogi");
      return res(ctx.status(200), ctx.json(stateCityList));
    },
  ),
  rest.get(
    `https://uat-webapi.revoltmotors.com/api/v1/common/getallstatelist`,
    (req, res, ctx) => {
      console.log("dddddddddddddddddddoooooooogi");
      return res(ctx.status(200), ctx.json(stateCityList));
    },
  ),
  rest.post(
    "https://uat-webapi.revoltmotors.com/api/v1/common/lsq_booking_lead",
    (req, res, ctx) => {
      // console.warn(`Unhandled request to ${req.url.href}`);
      return res(ctx.status(200), ctx.json(loadSquare));
    },
  ),
  rest.all("*", (req, res, ctx) => {
    console.warn(`Unhandled request to ${req.url.href}`);
    //  return req.passthrough()
    return res(
      ctx.status(200),
      ctx.json({ message: "This request was not explicitly handled" }),
    );
  }),
];
