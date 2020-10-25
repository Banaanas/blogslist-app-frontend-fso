import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import SingleUser from "./SingleUser";

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
    const component = render(
      <SingleUser createBlog={createBlog} displayMessage={displayMessage} />,
    );

    // Select all Form Inputs
    const form = component.container.querySelector("form");
    const titleInput = component.getByLabelText("Title");
    const authorInput = component.getByLabelText("Author");
    const URLInput = component.getByLabelText("URL");

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
    // component.debug();

    // Print a smaller part of the HTML rendered by the component to the console
    // console.log(prettyDOM(blogTitle));

    // Submit form
    fireEvent.submit(form);

    // Check if submitting the form calls the createBlog method
    expect(createBlog).toHaveBeenCalled();
    expect(createBlog.mock.calls).toHaveLength(1);

    // Check that createBlog is called with the right parameters (blog object)
    expect(createBlog.mock.calls[0][0]).toEqual(blog);
  });
});
