import { Avatar, Divider, SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getRandomColor } from "src/utils";
import { useMemo } from "react";
import { UserModel } from "../models/UserModel.tsx";

type UserInfoProps = {
  data: UserModel;
  sx?: SxProps;
};

export default function UserInfo({ data, sx, ...boxProps }: UserInfoProps) {
  const { avatar, name } = data || {};
  const avatarColor = useMemo(() => getRandomColor(), [avatar]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "flex-start", ...sx }}
      {...boxProps}
    >
      <Avatar
        alt={name}
        sx={{ width: 18, height: 18, bgcolor: avatarColor }}
        src={avatar}
      />
      <Divider orientation={"vertical"} light={true} />
      <Typography
        variant="body2"
        color="text.secondary"
        component="div"
        sx={{ ml: 1 }}
      >
        {name}
      </Typography>
    </Box>
  );
}
