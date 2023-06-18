import { useNotificationContext } from "../context/NotificationStackProvider.tsx";
import React from "react";
import { Badge, Fade, IconButton, Menu, MenuItem } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

function notificationsLabel(count: number) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}
export const MailInboxContainer: React.FC = () => {
  const { messages } = useNotificationContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderItem(message: string) {
    return <MenuItem onClick={handleClose}>{message}</MenuItem>;
  }
  return (
    <>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        aria-label={notificationsLabel(100)}
      >
        <Badge
          badgeContent={(messages && messages.length) || 0}
          color="secondary"
        >
          <MailIcon />
        </Badge>
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {messages.map(renderItem)}
      </Menu>
    </>
  );
};
