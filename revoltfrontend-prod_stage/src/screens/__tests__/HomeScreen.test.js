import { screen, render, act, waitFor } from "@testing-library/react";
import HomeScreen from "../HomeScreen";
import { createMemoryHistory } from "history";
import { AppWrapper, history } from "../../utilities/test_utils";
import userEvent from "@testing-library/user-event";

describe("Renders correctly", () => {
  const history = createMemoryHistory();
  test.skip("Homescreen renders correctly", () => {
    render(
      <AppWrapper>
        <HomeScreen />
      </AppWrapper>,
    );
    //    screen.debug()
    const result = screen.getByRole("heading", {
      name: "Introducing RV400 BRZ",
    });
    expect(result).toBeInTheDocument();
  });
});

describe("Redirections Working Properly or not", () => {
  test.skip("Banner Images redirecting to Booking Screen", async () => {
    userEvent.setup();
    const result = [];
    const { container } = render(
      <AppWrapper>
        <HomeScreen />
      </AppWrapper>,
    );
    const elements = container.querySelectorAll("picture img");
    for (let i = 0; i < elements.length && i < 4; i++) {
      await userEvent.click(elements[i]);
      result.push(history.location.pathname);
      await waitFor(() => {
        expect(history.location.pathname).toBe("/book");
      });
      history.back();
      await waitFor(() => {
        expect(history.location.pathname).not.toBe(result[result.length - 1]);
      });
    }
    expect(result).toEqual(["/book", "/book", "/book", "/book"]);
  });
});
