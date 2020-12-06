// 1 - For Cypress Tests to work :
// - Testing Router must have been set up in the Backend
// (testingRouter.js - app.js)
// - Backend must be running (start) in Test mode (NPM Script)
// 2 - Cypress CUSTOM COMMANDS are defined in cypress/support/commands.js
// 3 - Install Cypress ESLint Plugin and activate it in the extends configuration
// either in /package.json or in /.eslintrc.json
// 4 - Cypress prefers function expressions over arrow functions :
// To get this ESLint rule DISABLED ONLY FOR CYPRESS, create a /cypress/.eslintrc.json
// IN THE CYPRESS DIRECTORY, then set up rules.

// IMPORTANT - Using data-* attributes ("data-cy" here) should ALWAYS be preferred over other selectors
// whenever it is possible - https://docs.cypress.io/guides/references/best-practices.html

// Before each Cypress Test
beforeEach(function() {
  // Objective : Backend - 1 User / 0 Note
  // Delete all Users and Blog in Testing Database
  cy.request("POST", "http://localhost:3001/api/testing/reset");
  // Create User - Object
  const user = {
    name: "Banane Bleue",
    username: "username",
    password: "password",
    passwordConfirmation: "password",
  };
  // Create User - API Request
  cy.request("POST", "http://localhost:3001/api/users/", user);

  // Visit LoginPage
  cy.visit("http://localhost:3000/login");
});

// LOGIN / LOGOUT
describe("Login / Logout", function() {
  // LOGIN PAGE
  it("Login Form is displayed", function() {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("LOGIN");
  });

  // LOGIN SUCCESS
  it("Login succeeds with correct Username and Password", function() {
    cy.contains("LOGIN").click();
    cy.get("[data-cy=username-input]").type("username");
    cy.get("[data-cy=password-input]").type("password");
    cy.get("[data-cy=login-button]").click();

    // Success Toast is displayed - Success Color
    // Chakra-UI Toast - data-* attribute was not available - ClassName Selector was used
    cy.get(".chakra-alert").should(
      "have.css",
      "background-color",
      "rgb(56, 161, 105)",
    );

    // Success Toast should display "Wrong Credentials" (Toast)
    cy.get(".chakra-alert").should("contain", "Login Success");

    // Example Purpose -"html" Selector
    // HTML should display "Login Success" (Toast)
    cy.get("html").should("contain", "Login Success");

    // Redirect to MyProfilePage (by Router)
    cy.url().should("include", "/my-profile");

    // MY PROFILE PAGE
    cy.contains("Banane Bleue");
    cy.contains("You have no Blog in your List yet");
  });

  // LOGIN FAIL
  it("Login fails with wrong credentials", function() {
    cy.contains("LOGIN").click();
    cy.get("[data-cy=username-input]").type("username");
    cy.get("[data-cy=password-input]").type("wrongpassword");
    cy.get("[data-cy=login-button]").click();

    // HTML should display "Wrong Credentials" (Toast)
    cy.get("html").should("contain", "Wrong Credentials");

    // Warning Toast is displayed - Warning Color
    // Chakra-UI Toast - data-* attribute was not available - ClassName Selector was used
    cy.get(".chakra-alert").should(
      "have.css",
      "background-color",
      "rgb(221, 107, 32)",
    );

    // Warning Toast should display "Wrong Credentials" (Toast)
    cy.get("html").should("contain", "Wrong Credentials");

    // Example Purpose - "html" Selector
    // HTML should display "Wrong Credentials" (Toast)
    cy.get("html").should("contain", "Wrong Credentials");

    // NO Redirect to MyProfilePage
    // Stay on Login Page
    cy.url().should("equal", "http://localhost:3000/login");
  });

  // LOGOUT
  it("Logout succeeds", function() {
    cy.contains("LOGIN").click();
    cy.get("[data-cy=username-input]").type("username");
    cy.get("[data-cy=password-input]").type("password");
    cy.get("[data-cy=login-button]").click();

    cy.contains("LOGOUT").click();

    // Success Toast is displayed - Success Color
    // Chakra-UI Toast - data-* attribute was not available - ClassName Selector was used
    cy.get(".chakra-alert").should(
      "have.css",
      "background-color",
      "rgb(56, 161, 105)",
    );

    // Success Toast should display "Logout Successful" (Toast)
    cy.get(".chakra-alert").should("contain", "Logout Successful");

    // Redirect to LoginPage (by Router)
    cy.url().should("include", "/login");

    // MY PROFILE PAGE
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("LOGIN");
  });
});

// APP FUNCTIONALITIES
describe("App Functionalities", function() {
  // WHEN LOGGED IN
  describe("When logged in", function() {
    beforeEach(function() {
      // User Login - Cypress custom command - /cypress/support/command.js
      cy.login({ username: "username", password: "password" });
    });

    // NEW BLOG
    it("should create a New Blog", function() {
      cy.contains("ADD BLOG").click();
      cy.get("[data-cy=new-blog-title-input]").
        clear().
        type("The Best Blog Ever");
      cy.get("[data-cy=new-blog-author-input]").clear().type("Baudelaire");
      cy.get("[data-cy=new-blog-url-input]").
        clear().
        type("https://baudelaire.com");
      cy.get("[data-cy=add-blog-button]").click();
      // cy.contains("The Best Blog Ever");
    });

    // WHEN MULTIPLE BLOGS EXIST
    describe("and multiple Blogs exist", function() {
      beforeEach(function() {
        // Create Blog - Cypress custom command - /cypress/support/command.js
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

      // HOMEPAGE TABLE - BLOGS DISPLAY ORDER
      it("HomePage Table - Blogs are ordered/displayed by Likes number",
        function() {
          cy.get("[data-cy=blog-title]").should("have.length", 3);

          // Get all Blogs Title and check Blogs display order
          cy.get("[data-cy=blog-title]").then((items) => {
            return items.map((index, html) => Cypress.$(html).text()).get();
          }).should("deep.eq", ["Second Blog", "Third Blog", "First Blog"]);
        });

      // HOMEPAGE TABLE - BLOG LIKE
      it("HomePage Table - One of the Blogs can be liked", function() {
        // Click Second Blog's Like Button - First on the list
        cy.get(".chakra-button").eq(0).click();

        cy.get("table").find("tr").as("TableRows");
        cy.get("@TableRows").eq(1).as("SecondBlogRow");
        cy.get("@SecondBlogRow").find("td").eq(2).as("LastCellSecondBlogRow");
        cy.get("@LastCellSecondBlogRow").should("contain", "151");
      });

      // MY PROFILE PAGE TABLE - BLOGS DISPLAY ORDER
      it("MyProfilePage Table - Blogs are ordered/displayed by Creation Date",
        function() {
          // Visit MyProfilePage
          cy.visit("http://localhost:3000/my-profile");

          cy.get("[data-cy=blog-title]").should("have.length", 3);

          // Get all Blogs Title and check Blogs display order
          cy.get("[data-cy=blog-title]").then((items) => {
            return items.map((index, html) => Cypress.$(html).text()).get();
          }).should("deep.eq", ["First Blog", "Second Blog", "Third Blog"]);
        });

      // MY PROFILE PAGE TABLE - BLOG DELETE
      it("MyProfilePage Table - One of the Blogs can be removed", function() {
        // Visit MyProfilePage
        cy.visit("http://localhost:3000/my-profile");

        // HTML should display "Second Blog"
        cy.get("html").should("contain", "Second Blog");

        // Click Second Blog's Remove Button - Second on the list
        cy.get(".chakra-button").eq(1).click();

        // Success Toast is displayed - Success Color
        // Chakra-UI Toast - data-* attribute was not available - ClassName Selector was used
        cy.get(".chakra-alert").should(
          "have.css",
          "background-color",
          "rgb(56, 161, 105)",
        );

        // Success Toast should display "Your Blog has been successfully deleted" (Toast)
        cy.get(".chakra-alert").should(
          "contain",
          "Your Blog has been successfully deleted",
        );

        // HTML should NOT display "Second Blog"
        cy.get("html").should("not.contain", "Second Blog");
      });
    });
  });

  // WHEN NOT LOGGED IN
  describe("When NOT logged in", function() {
    beforeEach(() => {
      // User Login - Cypress custom command - /cypress/support/command.js
      cy.login({ username: "username", password: "password" });
      // Create Blog - Cypress custom command - /cypress/support/command.js
      cy.createBlog({
        title: "First Blog",
        author: "Baudelaire",
        url: "https://baudelaire.com",
        likes: 50,
      });

      cy.contains("LOGOUT").click();

      cy.visit("http://localhost:3000/");
    });

    // HOMEPAGE TABLE - BLOG LIKE
    it("HomePage Table - Blog can be liked", function() {
      // Click Second Blog's Like Button - First on the list
      cy.get(".chakra-button").click();

      cy.get("table").find("tr").as("TableRows");
      cy.get("@TableRows").eq(1).as("BlogRow");
      cy.get("@BlogRow").find("td").eq(2).as("LastCellBlogRow");
      cy.get("@LastCellBlogRow").should("contain", "51");
    });
  });
});
