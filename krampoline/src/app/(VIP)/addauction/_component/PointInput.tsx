"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function PointInput() {
  return (
    // <Box
    //   component="form"
    //   sx={{
    //     "& > :not(style)": { m: 1, width: "25ch" },
    //     "& .MuiInputBase-input[type='number']": {
    //       WebkitAppearance: "textfield",
    //       MozAppearance: "textfield",
    //       "&::-webkit-inner-spin-button": { display: "none" },
    //       "&::-webkit-outer-spin-button": { display: "none" },
    //     },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    <TextField
      id="standard-basic"
      label="최소 입찰 금액을 지정해주세요"
      variant="standard"
      type="number"
    />
    // </Box>
  );
}
