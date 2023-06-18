import { useNotificationContext } from "../context/NotificationStackProvider.tsx";
import React, { useEffect, useState } from "react";
import { Badge, Fade, IconButton, Menu, MenuItem } from "@mui/material";
import MailIcon from "@mui/icons-material/Notifications";

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
  const [unReadCount, setUnReadCount] = useState<number>(messages.length);

  useEffect(() => {
    if (messages.length > 0) {
      setUnReadCount((prevState) => prevState + 1);
    }
  }, [messages.length]);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setUnReadCount(0);
  };

  function renderItem(message: string) {
    return (
      <MenuItem key={message} onClick={handleClose}>
        {message}
      </MenuItem>
    );
  }
  return (
    <>
      <IconButton
        sx={{ mr: 2 }}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        aria-label={notificationsLabel(unReadCount)}
      >
        <Badge badgeContent={unReadCount} color="secondary">
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
        {messages && messages.length > 0 ? (
          messages.map(renderItem)
        ) : (
          <MenuItem onClick={handleClose}>No notifications</MenuItem>
        )}
      </Menu>
    </>
  );
};
