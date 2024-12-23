import { Provider } from "react-redux";
import store from "../store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Header from "../components/Header";

export const history = createMemoryHistory();

export const AppWrapper = ({ children }) => {
  // console.log("prop is",prop)
  return (
    <Provider store={store}>
      <Router navigator={history} location={history.location}>
        <Header />
        {children}
      </Router>
    </Provider>
  );
};
