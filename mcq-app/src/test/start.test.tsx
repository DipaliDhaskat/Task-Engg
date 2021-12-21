import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from '../App'
import { screen } from '@testing-library/react';

let container: HTMLDivElement;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
});

it(' Home component render', () => {
    act(() => {
        ReactDOM.render(<React.StrictMode>
            <App />
        </React.StrictMode>, container);
    });
    const HomeElement = screen.getByTestId('testHome')
    expect(HomeElement).toBeInTheDocument();
    expect(HomeElement).toHaveTextContent("Form");

});


it('render submit button test', () => {
    act(() => {
        ReactDOM.render(<React.StrictMode>
            <App />
        </React.StrictMode>, container);
    });
    expect(screen.getByTestId("submit-button")).toHaveAttribute("type", "submit");

});