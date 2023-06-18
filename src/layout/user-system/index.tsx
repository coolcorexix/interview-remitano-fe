import { useAuth } from "src/features/auth/AuthProvider";
import LoginForm from "./LoginForm";
import { login } from "./services/login";
import { register } from "./services/register";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";

function UserSystem() {
  const { enqueueSnackbar } = useSnackbar();
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const lgInRs: any = await login({ email, password });
      if (!lgInRs.data) {
        return;
      }
      setAuthToken(lgInRs.data.token);
      navigate("/");
    } catch {
      enqueueSnackbar(
        "Something went wrong, please check again your username and password!",
        { variant: "error" }
      );
    }
  };
  const handleRegister = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const rs = await register({ email, password });
      console.log("🚀 ~ file: index.tsx:16 ~ UserSystem ~ rs:", rs);
      if (!rs.data) {
        return;
      }
      handleLogin({ email, password });
    } catch {
      enqueueSnackbar(
        "Something went wrong, please make sure your email address is based on a real domain",
        { variant: "error" }
      );
    }
  };

  return (
    <div
      style={{
        padding: 64,
      }}
    >
      <LoginForm handleRegister={handleRegister} handleLogin={handleLogin} />
    </div>
  );
}

export default UserSystem;
