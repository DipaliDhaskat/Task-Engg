import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import App from '../App'



let container: HTMLDivElement;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

});

afterEach(() => {
    document.body.removeChild(container);

});

it('heading of Home include in document', () => {
    act(() => {
        ReactDOM.render(<React.StrictMode>
            <App />
        </React.StrictMode>, container);
    });
    const HomeElement = screen.getByTestId('home-heading')
    expect(HomeElement).toBeInTheDocument();
    expect(HomeElement).toHaveTextContent("Form");

});

it('input with placeholder test', () => {
   
    act(() => {
        ReactDOM.render(<React.StrictMode>
            <App />
        </React.StrictMode>, container);
    });

    fireEvent.change(screen.getByPlaceholderText("Enter Asteroid ID"), {
        target: { value: "new value" }
    });
    console.log(screen.getByPlaceholderText("Enter Asteroid ID"))
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
