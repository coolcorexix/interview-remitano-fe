import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import { useAuth } from "src/features/auth/AuthProvider";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;
  const { jwt, signout } = useAuth();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        {jwt ? (
          <>
            <Button
              onClick={() => {
                navigate("/user-system");
              }}
              variant="outlined"
              size="small"
            >
              Share video
            </Button>
            <Button
              onClick={() => {
                signout();
                navigate("/");
              }}
              variant="outlined"
              size="small"
            >
              Sign out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              navigate("/user-system");
            }}
            variant="outlined"
            size="small"
          >
            Register / Sign up
          </Button>
        )}
      </Toolbar>
    </React.Fragment>
  );
}
