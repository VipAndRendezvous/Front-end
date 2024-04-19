"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

export default function PositionedPopper() {
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
                최종 낙찰금액의 70% → 유명인의 소득 + 식사비 서비스 제공
                <br />
                수수료 25%
                <br />
                기부금 모금 → 5%
                <br />
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Grid item>
        <Button onClick={handleClick("bottom-start")}>
          최소 입찰 금액을 지정해 주세요.
        </Button>
      </Grid>
    </Box>
  );
}
