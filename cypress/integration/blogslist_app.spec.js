// 1 - For Cypress Tests to work :
// - Testing Router must have been set up in the backend
// (testingRouter.js - app.js)
// - Backend must be running in Test mode (NPM Script)
// 2 - Cypress custom commands are defined in cypress/support/commands.js
// 3 - Install Cypress ESLint Plugin activated it in the extends configuration
// either in package.json or in .eslintrc.json (located in the Project's root directory)
// 4 - Cypress prefers function expressions over arrow functions :
// To get this ESLint rule DISABLED ONLY FOR CYPRESS, create a .eslintrc.json
// IN THE CYPRESS DIRECTORY, then set up rules.

// BLOGSLIST APP
describe("Blogslist app", function () {
  beforeEach(function () {
    // Backend - 1 User / 0 Note
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Cyrilo Azul",
      username: "Cyrilo",
      password: "arcoiris",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    // Front End
    cy.visit("http://localhost:3000");
  });

  // FRONT PAGE OPEN
  it("Login Form is displayed", function () {
    cy.contains("Blogs");
  });

  // LOGIN SUCCESS
  it("Login succeeds with correct username and password", function () {
    cy.contains("LOGIN").click();
    cy.get("[data-cy=username-input]").type("Cyrilo");
    cy.get("[data-cy=password-input]").type("arcoiris");
    cy.get("[data-cy=login-button]").click();

    cy.contains("Cyrilo Azul logged in");
  });

  // LOGIN FAIL
  it("Login fails with wrong credentials", function () {
    cy.contains("LOGIN").click();
    cy.get("[data-cy=username-input]").type("Cyrilo");
    cy.get("[data-cy=password-input]").type("wrong");
    cy.get("[data-cy=login-button]").click();

    cy.get("[data-cy=notification-message]").should(
      "contain",
      "Wrong Credentials",
    );

    // Notification for Failed Login is displayed - Color
    cy.get("[data-cy=notification-message]").should(
      "have.css",
      "color",
      "rgb(255,0,0)",
    );

    // Notification for Failed Login is displayed - Border
    cy.get("[data-cy=notification-message]").should(
      "have.css",
      "border-style",
      "solid",
    );

    cy.get("html").should("not.contain", "Cyrilo Azul logged in");
  });

  // WHEN LOGGED IN
  describe("When logged in", function () {
    beforeEach(function () {
      // User Login - Cypress custom command
      cy.login({ username: "Cyrilo", password: "arcoiris" });
    });

    // NEW BLOG
    it("should create a New Blog", function () {
      cy.contains("NEW BLOG").click();
      cy.get("[data-cy=new-blog-title-input]").type("The Best Blog Ever");
      cy.get("[data-cy=new-blog-author-input]").type("Baudelaire");
      cy.get("[data-cy=new-blog-url-input]").type("https://baaudelaire.com");
      cy.contains("SAVE").click();
      cy.contains("The Best Blog Ever");
    });

    // WHEN MULTIPLE BLOGS EXIST
    describe("and multiple Blogs exist", function () {
      beforeEach(function () {
        // Create Blog - Cypress custom command
        cy.createBlog({
          title: "First Blog",
          author: "Baudelaire",
          url: "https://baudelaire.com",
          likes: 50,
        });
        cy.createBlog({
          title: "Second Blog",
          author: "Balzac",
          url: "https://balzac.com",
          likes: 150,
        });
        cy.createBlog({
          title: "Third Blog",
          author: "Pessoa",
          url: "https://pessoa.com",
          likes: 100,
        });
      });

      // BLOG LIKE
      it("one of the Blogs can be liked", function () {
        cy.contains("Second Blog").parent().children().as("secondBlog");
        cy.get("@secondBlog").contains("View").click();
        // Click Like Button
        cy.get("@secondBlog").contains("Likes").find("button").click();
        cy.get("@secondBlog").should("contain", "Likes : 151");
      });

      // BLOGS ORDER
      it("Blogs are ordered by Likes number", function () {
        cy.get("[data-cy=blog-title]").should("have.length", 3);

        // Get all Blogs Title and check Blogs order
        cy.get("[data-cy=blog-title]")
          .then((items) => {
            return items.map((index, html) => Cypress.$(html).text()).get();
          })
          .should("deep.eq", ["Second Blog", "Third Blog", "First Blog"]);
      });

      // BLOG DELETE
      it("one of the Blogs can be removed", function () {
        // HTML should display "Third Blog"
        cy.get("html").should("contain", "Third Blog");
        cy.contains("Third Blog").parent().children().as("thirdBlog");
        cy.get("@thirdBlog").contains("View").click();
        // Click Like Button
        cy.get("@thirdBlog").contains("REMOVE").click();
        // HTML should NOT display "Third Blog"
        cy.get("html").should("not.contain", "Third Blog");
      });
    });
  });
});
