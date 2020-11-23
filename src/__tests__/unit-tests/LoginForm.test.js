import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import appTheme from "../../styles/appTheme";
import SingleBlogCard from "../../Components/SingleBlog/SingleBlogCard";

describe("<LoginForm /> Component", () => {
  it.only("should ONLY DISPLAY Blog title BEFORE clicking the button", () => {
    const addLike = jest.fn();
    const component = render(
      <EmotionThemeProvider theme={appTheme}>
        <SingleBlogCard />
      </EmotionThemeProvider>,
    );

    // Print the HTML rendered by the Component to the console
    component.debug();
  });
});
