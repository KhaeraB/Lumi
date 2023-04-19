import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import NavBar from "../components/NavBar";

describe('NavBar', () => {
  test('renders the logo, menu text, and navigation links', () => {
    render(<NavBar />);
    const logo = screen.getByAltText("logo blendKreative") as HTMLImageElement;
    expect(logo).toBeInTheDocument(); 

    const menuText = screen.getByText('Menu');
    expect(menuText).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
