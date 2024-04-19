"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

export default function DatePopper() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <Box sx={{ width: 350 }}>
      <Popper
        sx={{ zIndex: 2 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>
                귀책 사유로 최소 만남 시간을 채우지 못할 경우 <br />
                낙찰금은 사용자에게 전액 환불됩니다.
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Grid item>
        <Button onClick={handleClick("bottom-start")}>
          식사 날짜와 시간을 지정해 주세요
        </Button>
      </Grid>
    </Box>
  );
}
