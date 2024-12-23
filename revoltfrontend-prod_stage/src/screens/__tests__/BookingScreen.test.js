import {
  getByPlaceholderText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import BookingScreen from "../BookingScreen";
import { AppWrapper } from "../../utilities/test_utils";
import userEvent from "@testing-library/user-event";
// import  {server}  from "../../setupTests";
// import {rest} from "msw"
import { URL_API } from "../../constants/cartConstants";
import { axios } from "../../utilities/axios";
import { mockUtilities } from "../../mocks/handlers";
import { payloadFreshdesk } from "../../mocks/data";
import { server } from "../../setupTests";
import { rest } from "msw";

jest.setTimeout(30000);
// jest.mock("axios")

// server.use(
//     rest.post( URL_API + "/api/v1/common/freshdesk_records/contacts"),(req,res,context)=>{
//         console.log("TMKC_------------------------------")
//         payload = 11

//         return res(context.status(200))

// })
// server.use(
//     rest.get( `${URL_API}/api/v1/common/getallstatelist`),(req,res,context)=>{
//         console.log("TMKC_------------------------------")
//         payload = 11

//         return res(context.status(200))

// })

describe("component Renders correctly", () => {
  test.skip("All fields are accessible", async () => {
    userEvent.setup();
    render(
      <AppWrapper>
        <BookingScreen />
      </AppWrapper>,
    );
    const userName = screen.getByRole("textbox", {
      name: /user name \/ mobile number/i,
    });
    expect(userName).toBeInTheDocument();

    const mobile = screen.getByRole("textbox", {
      name: /^mobile$/i,
    });

    expect(mobile).toBeInTheDocument();

    await userEvent.type(mobile, "aks"); // Mobile Field should not contain string
    const text = screen.queryByDisplayValue("aks");
    expect(text).not.toBeInTheDocument();
  });

  test.only("Form Submitting Correctly", async () => {
    const myMock = jest.spyOn(mockUtilities, "freshdesk");
    // server.use(  rest.post(`https://uat-webapi.revoltmotors.com/api/v1/common/freshdesk_records/contacts`,(req,res)=>{
    //   console.log("request is contsact", req.body)
    //   mockUtilities.freshdesk(req.body)
    //   return res(ctx.status(200), ctx.json({data:"loda"}))
    // }))
    const { container } = render(
      <AppWrapper>
        <BookingScreen />
      </AppWrapper>,
    );
    console.log(process.env.REACT_APP_LOCAL_ENV, URL_API);

    const userName = screen.getByRole("textbox", {
      name: /user name \/ mobile number/i,
    });
    expect(userName).toBeInTheDocument();
    await userEvent.type(userName, "Testing");

    const mobile = screen.getByRole("textbox", {
      name: /^mobile$/i,
    });
    await userEvent.type(mobile, "9765437892");
    const text = screen.queryByDisplayValue("9765437892");
    expect(text).toBeInTheDocument();
    const email = screen.getByRole("textbox", { name: /^email$/i });
    await userEvent.type(email, "test@gmail.com");
    const emailText = screen.queryByDisplayValue("test@gmail.com");

    // const state = screen.getByRole("combobox", { name: "state" })
    const state = container.querySelector("#state");
    const city = container.querySelector("#city");
    const hub = container.querySelector("#area");
    const captcha = container.querySelector("#captcha");
    const checkbox = container.querySelector("#checkbox");

    await waitFor(
      async () => {
        const stateOption = container.querySelector("#state #Delhi");
        //  const city = screen.getByRole("combobox", { name: "city" })
        expect(state).toBeInTheDocument();
        expect(stateOption).toBeInTheDocument();
        expect(city).toBeInTheDocument();
        await userEvent.selectOptions(state, stateOption);
        const cityOption = container.querySelector("#city #Delhi");

        expect(stateOption.selected).toBe(true);
        await userEvent.selectOptions(city, cityOption);
        expect(cityOption.selected).toBe(true);
        const hubOption = container.querySelector("#area #id152");
        //  console.log("hubby", hub, "lo-----------------",hubOption)
        await userEvent.selectOptions(hub, hubOption);
        expect(hubOption.selected).toBe(true);
        await userEvent.type(captcha, "4");
        await userEvent.click(checkbox);
        // expect(payload).toEqual(11)
      },
      { timeout: 1000 },
    );
    waitFor(async () => {
      const next = container.querySelector("#submitButton");
      await new Promise((resolve) => setTimeout(() => resolve("yes"), 2000));
      expect(next.disabled).toBe(false);
      await userEvent.click(next);
      // await new Promise((resolve)=>setTimeout(()=>resolve("yes"),1000))
      // expect(myMock).toBeCalledWith(payloadFreshdesk)
      console.log("Everything Working Fine");
      // console.log(next,checkbox)
    });
  });
});
