import React from 'react';
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';

import userEvent from '@testing-library/user-event'

import { screen, cleanup, fireEvent, waitFor } from '@testing-library/react';

import App from '../App'
import TextField from '@mui/material/TextField';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

});

afterEach(() => {
  document.body.removeChild(container);

});


it('submit button test', () => {
  act(() => {
    ReactDOM.render(<React.StrictMode>
      <App />
    </React.StrictMode>, container);
  });
  fireEvent.click(screen.getByTestId('submit-button'));
  expect(screen.getByTestId("submit-button")).toHaveAttribute("type", "submit");

});

it('input with placeholder test', () => {

  act(() => {
    ReactDOM.render(<React.StrictMode>
      <App />
    </React.StrictMode>, container);
  });

  fireEvent.change(screen.getByPlaceholderText("Enter country"), {
    target: { value: "new value" }
  });
  // console.log(screen.getByPlaceholderText("Enter country"))
});

it('heading with input field', () => {
  // Test first render App component
  act(() => {
    ReactDOM.render(<React.StrictMode>
      <App />
    </React.StrictMode>, container);
  });
  const HomeElement = screen.getByTestId('home-heading')
  expect(HomeElement).toBeInTheDocument();
  expect(HomeElement).toHaveTextContent("FORM");

  const inputs = container.querySelectorAll("TextField");
  expect(inputs).toHaveLength(0);

});


test('TextField input value check', () => {
  render(<div>
    <TextField id="outlined-basic" data-testid="name-data-input" label="CountryName" variant="outlined" placeholder="Enter country" />
  </div>, container)
  const input: any = screen.getByLabelText(/CountryName/i)
  userEvent.type(input, 'INDIA')
  expect(input?.value).toBe('INDIA')
})


