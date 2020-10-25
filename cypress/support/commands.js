Cypress.Commands.add("login", ({ username, password }) => {
  // User Login - Will not be used to test Login
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    // Cypress commands run asynchronously, so Then is used
    // Save Token to localStorage
    localStorage.setItem("loggedBlogslistappUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

// User is already logged in and User's details already in localStorage
Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedBlogslistappUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:3000");
});
