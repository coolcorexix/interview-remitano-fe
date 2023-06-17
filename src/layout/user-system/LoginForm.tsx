import { Button, TextField } from "@mui/material";
import { useState } from "react";

const LoginForm = ({
  handleRegister,
  handleLogin,
}: {
  handleRegister: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  handleLogin: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleLogin({ username: username, password });
        }}
        fullWidth
      >
        Login
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          handleRegister({ username: username, password });
        }}
        fullWidth
      >
        Register
      </Button>
    </form>
  );
};

export default LoginForm;
