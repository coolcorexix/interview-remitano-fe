import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
const handleRegisterMock = jest.fn();
const handleLoginMock = jest.fn();
describe("LoginForm", () => {
  test("should update email and password fields when typed", () => {
    render(
      <LoginForm
        handleLogin={handleRegisterMock}
        handleRegister={handleLoginMock}
      />
    );

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("should call handleLogin when Login button is clicked", () => {
    render(
      <LoginForm
        handleLogin={handleLoginMock}
        handleRegister={handleRegisterMock}
      />
    );
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    expect(handleLoginMock).toHaveBeenCalled();
  });

  test("should call handleRegister when Register button is clicked", () => {
    render(
      <LoginForm
        handleLogin={handleLoginMock}
        handleRegister={handleRegisterMock}
      />
    );

    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);

    expect(handleRegisterMock).toHaveBeenCalled();
  });
});
