import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import { useAuth } from "src/features/auth/AuthProvider";
import { MailInboxContainer } from "src/features/notifications/components/MailInboxContainer.tsx";
import ShareVideoContainer from "src/features/share-video/components/ShareVideoContainer.tsx";

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
        <Typography
          sx={{ mr: "auto" }}
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
        >
          {title}
        </Typography>
        <MailInboxContainer />
        {jwt ? (
          <>
            <ShareVideoContainer />
            <Button
              sx={{ ml: 2 }}
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
            variant={"contained"}
            size="small"
          >
            Register / Sign up
          </Button>
        )}
      </Toolbar>
    </React.Fragment>
  );
}
