import { render as rtlRender, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Home from './components/Home';
import ParkingSpace from './components/ParkingSpace';


const render = (component: (any)) => rtlRender(
  <MemoryRouter>
    {component}
  </MemoryRouter>
)
const renderHome = () => render(<Home />);
const renderParkingSpace = () => render(<ParkingSpace />);
test('heading of Home include in document', () => {
  let { getByTestId } = renderHome();
  const HomeElement = getByTestId('home-heading')
  expect(HomeElement).toBeInTheDocument();
  expect(HomeElement).toHaveTextContent("Parking App");
});

test('Number of spaces Text input', () => {
  let { getByTestId } = renderHome();
  const HomeElement = getByTestId('parking-create-text-input')
  expect(HomeElement).toBeInTheDocument();
  // expect(HomeElement).toHaveTextContent("Parking App");
});
test('Submit button for Parking Creation', () => {
  let { getByTestId } = renderHome();
  const HomeElement = getByTestId('parking-create-submit-button')
  expect(HomeElement).toBeInTheDocument();
  expect(HomeElement).toHaveTextContent("Submit");
});

test("heading of Park Spacing include in document", () => {
  let { getByTestId } = renderParkingSpace();
  const HomeElement = getByTestId('park-heading')
  expect(HomeElement).toBeInTheDocument();
  expect(HomeElement).toHaveTextContent("Parking Space");
})
