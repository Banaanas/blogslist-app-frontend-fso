import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import UserPage from "./UserPage";

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
  // Likes and id are not passed (they are not Input entries)
  const blog = {
    title: "Les Fleurs du Mal",
    author: "Charles Baudelaire",
    url: "https://fr.wikisource.org/wiki/Les_Fleurs_du_mal/1861/Texte_entier",
  };

  it("should ONLY DISPLAY Blog title BEFORE clicking the button", () => {
    const createBlog = jest.fn();
    const displayMessage = jest.fn();
    render(
      <UserPage createBlog={createBlog} displayMessage={displayMessage} />,
    );

    // Select all Form Inputs
    const submitFormButton = screen.getByText("SAVE");
    const titleInput = screen.getByLabelText("Title");
    const authorInput = screen.getByLabelText("Author");
    const URLInput = screen.getByLabelText("URL");

    // Change Inputs values
    fireEvent.change(titleInput, {
      target: { value: blog.title },
    });
    fireEvent.change(authorInput, {
      target: { value: blog.author },
    });
    fireEvent.change(URLInput, {
      target: { value: blog.url },
    });

    // Print the HTML rendered by the component to the console
    // screen.debug();

    // Print a smaller part of the HTML rendered by the component to the console
    // console.log(prettyDOM(blogTitle));

    // Submit form
    fireEvent.submit(submitFormButton);

    // Check if submitting the form calls the createBlog method
    expect(createBlog).toHaveBeenCalled();
    expect(createBlog.mock.calls).toHaveLength(1);

    // Check that createBlog is called with the right parameters (blog object)
    expect(createBlog.mock.calls[0][0]).toEqual(blog);
  });
});
