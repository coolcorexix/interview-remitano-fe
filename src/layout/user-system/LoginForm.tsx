import { Button, CssBaseline, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
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
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://remitano.com/about/join-our-team.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login/Register
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            error={!!emailError}
            helperText={emailError}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            error={!!passwordError}
            helperText={passwordError}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={submitLogin}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            color="primary"
            sx={{ mb: 2 }}
            onClick={submitRegister}
            fullWidth
          >
            Register
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
