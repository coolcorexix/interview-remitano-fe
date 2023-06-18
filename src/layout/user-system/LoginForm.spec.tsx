import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('should display an error message for invalid email format', () => {
    render(<LoginForm handleLogin={() => {}} handleRegister={() => {}} />);
  
    const emailInput = screen.getByLabelText('Email');
    const loginButton = screen.getByText('Login');
  
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(loginButton);
  
    const emailError = screen.getByText('Invalid email address');
    expect(emailError).toBeInTheDocument();
  });
  
  test('should display an error message for empty email field', () => {
    render(<LoginForm handleLogin={() => {}} handleRegister={() => {}} />);
  
    const emailInput = screen.getByLabelText('Email');
    const loginButton = screen.getByText('Login');
  
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(loginButton);
  
    const emailError = screen.getByText('Email is required');
    expect(emailError).toBeInTheDocument();
  });
  
  test('should display an error message for empty password field', () => {
    render(<LoginForm handleLogin={() => {}} handleRegister={() => {}} />);
  
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');
  
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);
  
    const passwordError = screen.getByText('Password is required');
    expect(passwordError).toBeInTheDocument();
  });
  
  test('should call handleLogin when Login button is clicked with valid email and password', () => {
    const handleLogin = jest.fn();

    render(<LoginForm handleLogin={handleLogin} handleRegister={() => {}} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(handleLogin).toHaveBeenCalledTimes(1);
    expect(handleLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  test('should call handleRegister when Register button is clicked with valid email and password', () => {
    const handleRegister = jest.fn();

    render(<LoginForm handleLogin={() => {}} handleRegister={handleRegister} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const registerButton = screen.getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    expect(handleRegister).toHaveBeenCalledTimes(1);
    expect(handleRegister).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  // Add more test cases for validation, error messages, etc.
});
