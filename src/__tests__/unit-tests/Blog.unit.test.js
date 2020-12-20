import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Blog from "./Blog";

// Print a smaller part of the HTML rendered by the component to the console
// import { prettyDOM } from "@testing-library/dom";

/*
These Tests were build for the previous version of the BlogsList App.
Because the Components they are related to are not used anymore,
these Tests are no longer relevant.

HOWEVER, they were kept here as an example of what can be done with Jest and
React Testing Library.

They were heavily inspired from Part 5 of the FullStackOpen Course (2020) :
https://fullstackopen.com/en/part5.

IMPORTANT : Using data-testid query should ALWAYS be preferred over other selectors
whenever it is possible.
- https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change
- https://testing-library.com/docs/dom-testing-library/api-queries/
- https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
*/

describe("<Blog /> Component", () => {
  const blog = {
    title: "Les Fleurs du Mal",
    author: "Charles Baudelaire",
    url: "https://fr.wikisource.org/wiki/Les_Fleurs_du_mal/1861/Texte_entier",
    likes: 20,
    id: "12345",
  };

  it("should ONLY DISPLAY Blog title BEFORE clicking the button", () => {
    const addLike = jest.fn();
    render(<Blog blog={blog} addLike={addLike} />);
    const blogTitle = screen.getByText("Les Fleurs du Mal");
    const blogAuthor = screen.getByText("Charles Baudelaire");
    const blogURL = screen.getByText(
      "https://fr.wikisource.org/wiki/Les_Fleurs_du_mal/1861/Texte_entier",
    );
    const blogLikes = screen.getByText(/Likes/);

    // Print the HTML rendered by the component to the console
    // screen.debug();

    // Blog title must be visible
    expect(blogTitle).toBeVisible();

    // Print a smaller part of the HTML rendered by the component to the console
    // console.log(prettyDOM(blogTitle));

    // Blog author, URL and like must NOT be visible
    expect(blogAuthor).not.toBeVisible();
    expect(blogURL).not.toBeVisible();
    expect(blogLikes).not.toBeVisible();
  });

  test("if event handler is called twice if like button is clicked twice clicking the button", () => {
    const addLike = jest.fn();
    render(<Blog blog={blog} addLike={addLike} />);
    const blogTitle = screen.getByText("Les Fleurs du Mal");
    const blogAuthor = screen.getByText("Charles Baudelaire");
    const blogURL = screen.getByText(
      "https://fr.wikisource.org/wiki/Les_Fleurs_du_mal/1861/Texte_entier",
    );
    const blogLikes = screen.getByText(/Likes/);

    // Select Button
    const viewButton = screen.getByText("View");

    fireEvent.click(viewButton);

    // Blog title, author, URL and like must be visible
    expect(blogTitle).toBeVisible();
    expect(blogAuthor).toBeVisible();
    expect(blogURL).toBeVisible();
    expect(blogLikes).toBeVisible();
  });

  it("should DISPLAY all blog elements AFTER clicking the button", () => {
    const addLike = jest.fn();
    render(<Blog blog={blog} addLike={addLike} />);

    // Select Button
    const likebutton = screen.getByText("+1");

    // Button clicked twice
    fireEvent.click(likebutton);
    fireEvent.click(likebutton);

    // Expect event handler to be called twice
    expect(addLike.mock.calls).toHaveLength(2);
  });
});
