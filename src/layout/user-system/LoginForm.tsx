import { Button, TextField } from "@mui/material";
import { useState } from "react";

const LoginForm = ({
  handleRegister,
  handleLogin,
}: {
  handleRegister: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  handleLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const submitLogin = () => {
    validateEmail();
    validatePassword();

    // Perform login logic if the form is valid
    if (!emailError && !passwordError) {
      handleLogin({ email, password });
    }
  };

  const submitRegister = () => {
    validateEmail();
    validatePassword();

    // Perform registration logic if the form is valid
    if (!emailError && !passwordError) {
      handleRegister({ email, password });
    }
  };

  return (
    <form>
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validateEmail}
        fullWidth
        margin="normal"
        error={!!emailError}
        helperText={emailError}
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={validatePassword}
        fullWidth
        margin="normal"
        error={!!passwordError}
        helperText={passwordError}
      />

      <Button variant="contained" color="primary" onClick={submitLogin} fullWidth>
        Login
      </Button>

      <Button variant="outlined" color="primary" onClick={submitRegister} fullWidth>
        Register
      </Button>
    </form>)
};

export default LoginForm;
