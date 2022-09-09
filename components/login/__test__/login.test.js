import { fireEvent, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../../pages/login";
import OTP from "../OtpForm";
import { renderWithProvider } from "../../../utils/test-utils";

describe("Test the login component", () => {
  afterEach(() => cleanup());
  test("testing", () => {
    // const { getByLabelText} =  render(<Provider store={store}><Login /></Provider>)
    const { getByRole, getByLabelText } = renderWithProvider(<Login />);
    expect(getByRole("button", { name: "Send OTP" })).toBeInTheDocument();
    screen.debug();
  });

  test("Test login Email Input", () => {
    const { getByRole, getByLabelText } = renderWithProvider(<Login />);
    const emailText = getByRole("textbox");
    // userEvent.type(emailText, "abc");
    fireEvent.change(emailText, { target: { value: "abc" } });
    // expect(emailText.value).not.toEqual("abc@publicissapient.com")
    expect(emailText.value).not.toMatch("abc@publicissapient.com");
  });

  test("Test login Blank Email Input", () => {
    const { getByRole, getByTestId, getByLabelText } = renderWithProvider(
      <Login />
    );
    // const emailBtn = getByTestId("loginEmail");
    const emailText = getByRole("textbox");
    fireEvent.click(emailText, { target: { value: "" } });
    expect(emailText.value).not.toEqual("Please enter valid otp");
  });

  test("should show otp input", () => {
    const { getByRole, getByTestId, getByLabelText } = renderWithProvider(
      <OTP />
    );
    const otpBtn = getByTestId("primary");
    const otpNumber = getByRole("textbox");
    userEvent.click(otpBtn, "123");
    expect(otpNumber.value).not.toBeNull();
    // fireEvent.click(otpBTN, {target: {value: ""}})
    // expect(otpNumber.value).not.toEqual("1234")
  });

  test("Test submit OTP Input", () => {
    const {
      getByRole,
      getByTestId,
      getByText,
      getByPlaceholderText,
      getByLabelText,
    } = renderWithProvider(<OTP />);
    const otpBtn = getByTestId("primary");
    const otpNumber = getByRole("textbox");
    // userEvent.type(otpBtnn);
    fireEvent.change(otpNumber, { target: { value: "1234" } });
    userEvent.click(otpBtn);
    expect(otpNumber).toHaveValue("1234");
  });
  test("renders login", () => {
    const { container } = renderWithProvider(<Login />);
    expect(container).toMatchSnapshot();
  });
});
