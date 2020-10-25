import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

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
    const component = render(<Blog blog={blog} addLike={addLike} />);
    const blogTitle = component.getByText("Les Fleurs du Mal");
    const blogAuthor = component.getByText("Charles Baudelaire");
    const blogURL = component.getByText(
      "https://fr.wikisource.org/wiki/Les_Fleurs_du_mal/1861/Texte_entier",
    );
    const blogLikes = component.getByText(/Likes/);

    // Print the HTML rendered by the component to the console
    // component.debug();

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
    const component = render(<Blog blog={blog} addLike={addLike} />);
    const blogTitle = component.getByText("Les Fleurs du Mal");
    const blogAuthor = component.getByText("Charles Baudelaire");
    const blogURL = component.getByText(
      "https://fr.wikisource.org/wiki/Les_Fleurs_du_mal/1861/Texte_entier",
    );
    const blogLikes = component.getByText(/Likes/);

    // Select Button
    const viewButton = component.getByText("View");

    fireEvent.click(viewButton);

    // Blog title, author, URL and like must be visible
    expect(blogTitle).toBeVisible();
    expect(blogAuthor).toBeVisible();
    expect(blogURL).toBeVisible();
    expect(blogLikes).toBeVisible();
  });

  it("should DISPLAY all blog elements AFTER clicking the button", () => {
    const addLike = jest.fn();
    const component = render(<Blog blog={blog} addLike={addLike} />);

    // Select Button
    const likebutton = component.getByText("+1");

    // Button clicked twice
    fireEvent.click(likebutton);
    fireEvent.click(likebutton);

    // Expect event handler to be called twice
    expect(addLike.mock.calls).toHaveLength(2);
  });
});
