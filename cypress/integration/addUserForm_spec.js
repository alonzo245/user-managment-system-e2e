const getRandom = () => Math.ceil(Math.random(1) * 100);

describe("Add users form", () => {
  let firstName = `john${getRandom()}`,
    lastName = `Doe${getRandom()}`,
    email = `john.doe${getRandom()}@email${getRandom()}.com`,
    description = `${getRandom()}describe`;

  it("Should enter data into form, submit it and add data into users table", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".add-user-form")
      .within(($form) => {
        cy.get('input[name="firstName"]').type(firstName);
        cy.get('input[name="lastName"]').type(lastName);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type("password");
        cy.get('input[name="description"]').type(description);
        cy.root().submit();
      })
      .then(() => {
        cy.get(".usersTable tr:last-child td:nth-child(1)")
        .should("have.text", firstName);

        cy.get(".usersTable tr:last-child td:nth-child(2)")
        .should("have.text", lastName);
        
        cy.get(".usersTable tr:last-child td:nth-child(3)")
        .should("have.text", email);

        cy.get(".usersTable tr:last-child td:nth-child(4)")
         .should("have.text", description);
      });
  });

  it("Checks submission response status 201", () => {
      cy.request({
          method: 'post',
          url: 'http://localhost:3001/api/v1/users/',
          headers: {
            accept: "application/json",          
           },
           body:{
            firstName: `${firstName}_`,
            lastName: `${lastName}_`,
            email: `1${email}`,
            description: `${description}_`,
            password: "password"
            
           }
      }).then((response) => {
          expect(response.status).to.eq(201);   
      })
  })
});
