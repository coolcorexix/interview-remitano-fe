import { Avatar, Divider, SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getRandomColor } from "src/utils";
import { useMemo } from "react";
import { UserModels } from "../models/UserModels.tsx";

type UserInfoProps = {
  data: UserModels;
  hideAvatar: boolean;
  sx?: SxProps;
};

export default function UserInfo({
  data,
  sx,
  hideAvatar,
  ...boxProps
}: UserInfoProps) {
  const { display_name } = data || {};
  const avatarColor = useMemo(() => getRandomColor(), [display_name]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "flex-start", ...sx }}
      {...boxProps}
    >
      {!hideAvatar && (
        <Avatar
          alt={display_name}
          sx={{ width: 18, height: 18, bgcolor: avatarColor }}
          src={display_name}
        />
      )}
      <Divider orientation={"vertical"} light={true} />
      <Typography
        variant="body2"
        color="text.secondary"
        component="div"
        sx={{ ml: 1 }}
      >
        {display_name}
      </Typography>
    </Box>
  );
}
