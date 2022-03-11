import { Home } from "../components/Home";
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from "../Store/Store";
import { MemoryRouter } from "react-router-dom";
import { Details } from "../components/Details";

const render = (component: (any)) => rtlRender(
    <Provider store={Store}>
        <MemoryRouter>
            {component}
        </MemoryRouter>
    </Provider>)


const renderHome = () => render(<Home />);
const renderDetails = () => render(<Details />);

test("heading of Home include in document", () => {
    let { getByTestId } = renderHome();
    const HomeElement = getByTestId('home-heading')
    expect(HomeElement).toBeInTheDocument();
    expect(HomeElement).toHaveTextContent("Pagination");
})


test("heading of details include in document", () => {
    let { getByTestId } = renderDetails();
    const HomeElement = getByTestId('Details-heading')
    expect(HomeElement).toBeInTheDocument();
    expect(HomeElement).toHaveTextContent("user Information");
})