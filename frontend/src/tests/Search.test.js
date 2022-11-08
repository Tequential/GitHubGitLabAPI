import { render, waitFor, screen, cleanup } from "@testing-library/react"
import Search from "../components/Search"

const setUser = jest.fn();
const setSearchUser = jest.fn();
const searchUser = jest.fn();

afterEach(cleanup);

//test that the search page renders correctly
it('Renders the search page', async () => {
  render(
    <Search setUser={setUser} setSearchUser={setSearchUser} searchUser={searchUser}/>,
  );
  await waitFor(() => {
  expect(screen.getByText("Search")).toBeTruthy()
  })

});

