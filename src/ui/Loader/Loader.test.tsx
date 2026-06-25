import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  it("renders loader", () => {
    render(<Loader />);

    const loader = document.querySelector("div");
    expect(loader).toBeInTheDocument();
  });
});
