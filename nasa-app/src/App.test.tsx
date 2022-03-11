import { Home } from "./components/Home";
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from "./Store/Store";
import { MemoryRouter } from "react-router-dom";
import { AsteroidInfo } from "./components/AstroidInfo";

const render = (component: (any)) => rtlRender(
  <Provider store={Store}>
    <MemoryRouter>
      {component}
    </MemoryRouter>
  </Provider>)


const renderHome = () => render(<Home />);
const renderAsteroidInfo = () => render(<AsteroidInfo />);

test("heading of Home include in document", () => {
  let { getByTestId } = renderHome();
  const HomeElement = getByTestId('home-heading')
  expect(HomeElement).toBeInTheDocument();
  expect(HomeElement).toHaveTextContent("Form");
})

test("input with placeholder test", () => {
  let { getByPlaceholderText } = renderHome();
  fireEvent.change(getByPlaceholderText("Enter Asteroid ID"), {
    target: { value: "new value" }
  });
})

test("submit button test", () => {
  let { getByTestId } = renderHome();
  fireEvent.click(getByTestId('submit-button'));
  expect(getByTestId("submit-button")).toHaveAttribute("type", "submit");
})

test("heading of Home include in document", () => {
  let { getByTestId } = renderAsteroidInfo();
  const HomeElement = getByTestId('asteroid-heading')
  expect(HomeElement).toBeInTheDocument();
  expect(HomeElement).toHaveTextContent("Asteroid Information");
})