const { findAllByText } = require("@testing-library/react");

const baseUrl = "http://localhost:3000";
describe("visits the URL", () => {
  it("when validation fails", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get("#email").type("pawan.kumar5@gmail.com");
    cy.get(".PrimaryButton_primaryButton__0QHfk").click(); //login button
    cy.findAllByText("Please provide your email Id").should("exist");
  });

  it("when validation passes ", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get("#email").type("pawan.kumar5@publicissapient.com");
    cy.get(".PrimaryButton_primaryButton__0QHfk").click(); //login button
    cy.get("#enterOtp").type("1234");
    cy.get(".PrimaryButton_primaryButton__0QHfk").click(); //otp button
    cy.url().should("include", "");
    // cy.get(".justify-content-end > :nth-child(2) > div > .form-control").should(
    //   "exist"
    // );
    cy.get(':nth-child(1) > [data-testid="secondary"]').should("exist");
  });

  it("visits participants page", () => {
    cy.findAllByText("Add Participant").should("exist");
    // cy.get('.col-sm-3 > [data-testid="secondary"]').click();
    // cy.get(':nth-child(1) > [data-testid="secondary"]').click();
    cy.get(':nth-child(1) > [data-testid="secondary"]').click();
    cy.findAllByText("Add New Participant").should("exist");
    cy.findAllByText("2.Participant Information").should("exist");
    cy.findAllByText("1.Training Information").should("exist");
    cy.findAllByText("Add New Participant").should("exist");
    cy.findAllByText(/Oracle ID */i).should("exist");
    cy.findAllByText(/First Name */i).should("exist");
    cy.findAllByText(/Last Name */i).should("exist");
    cy.get(
      '[open=""] > .Modal_nonMovable__doaH4 > .Modal_closeModal__hkdzc > svg'
    ).click();
    cy.get(
      '[open=""] > .Modal_nonMovable__doaH4 > .Modal_closeModal__hkdzc > svg'
    ).should("not.exist");
  });

  it("should visit all trainings page", () => {
    cy.visit(`${baseUrl}/allTrainings`);
    // cy.get(".justify-content-end > :nth-child(2) > div > .form-control").should(
    //   "exist"
    // );
    cy.get(':nth-child(1) > [data-testid="secondary"]').should("exist");

    // cy.get('.col-sm-3 > [data-testid="secondary"]').click();
    cy.get(':nth-child(1) > [data-testid="secondary"]').click();
    cy.findAllByText("1.Training Information").should("exist");
    cy.findAllByText("2.POC Information (Primary)").should("exist");
    cy.findAllByText("3.POC Information (Secondary)").should("exist");
    cy.findAllByText("Add New Training").should("exist");
    cy.get(
      '[open=""] > .Modal_nonMovable__doaH4 > .Modal_closeModal__hkdzc > svg'
    ).click();
    cy.get(
      '[open=""] > .Modal_nonMovable__doaH4 > .Modal_closeModal__hkdzc > svg'
    ).should("not.exist");

    //update button

    cy.get(
      ":nth-child(1) > :nth-child(1) > .d-flex > :nth-child(1) > svg"
    ).click();
    cy.findAllByText("Update Existing Training").should("exist");

    cy.get('input[name="trainingCode"]')
      .invoke("val")
      .then((sometext) => cy.log(sometext));
    cy.get(
      '[open=""] > .Modal_nonMovable__doaH4 > .Modal_closeModal__hkdzc > svg'
    ).click();
    cy.get(
      '[open=""] > .Modal_nonMovable__doaH4 > .Modal_closeModal__hkdzc > svg'
    ).should("not.exist");
  });
});
